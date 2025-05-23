import { MaybeElementRef, Player, usePlayer } from '@vue-youtube/core';
import { useBreakpoints } from '@vueuse/core';
import { ref, watchEffect } from 'vue';

const breakpoints = useBreakpoints({
    md: 768,
    lg: 1024,
});

// Shared singleton state
const isReady = ref(false);
const playerInstance = ref<Player>();
const currentTime = ref(-1);
const youtubeIframe = ref<HTMLIFrameElement | null>(null);

let syncInterval: number | null = null;

// Starts syncing currentTime every 100ms
function startSync() {
    if (!syncInterval) {
        syncInterval = setInterval(() => {
            const time = playerInstance.value?.getCurrentTime() ?? -1;
            if (time !== currentTime.value) {
                currentTime.value = time;
            }
        }, 100);
    }
}

// Stops syncing
function stopSync() {
    if (syncInterval) {
        clearInterval(syncInterval);
        syncInterval = null;
    }
}

// Seeks to a specific time, restarts sync after brief pause
function goToTime(timestamp: number): void {
    if (playerInstance.value && isReady.value) {
        // stop sync hack to try and stop transcript jittering
        stopSync();
        playerInstance.value.seekTo(timestamp, true);
        currentTime.value = timestamp;

        // Wait briefly for seek to "settle" before resyncing
        setTimeout(() => {
            startSync();
        }, 100);
    }
}

// Initializes the player and sets up event listeners
export function initVueYoutube(videoId: string, videoFrameRef: MaybeElementRef) {
    const { onReady, onStateChange, instance } = usePlayer(videoId, videoFrameRef);

    onReady((event) => {
        const iframe = event.target.getIframe();
        youtubeIframe.value = iframe;

        iframe.removeAttribute('width');
        iframe.removeAttribute('height');
        iframe.classList.add('aspect-video');

        watchEffect(() => {
            const isMidScreen = breakpoints.between('md', 'lg').value;

            if (!iframe) return;

            iframe.classList.remove('w-full', 'h-full');

            if (isMidScreen) {
                iframe.classList.add('h-full');
            } else {
                iframe.classList.add('w-full');
            }
        });
        playerInstance.value = instance.value;
        isReady.value = true;
    });

    onStateChange((event) => {
        const state = event.data;

        if (state === 1) {
            // Playing
            startSync();
        } else if (state === 0) {
            // Ended or paused
            stopSync();
            if (state === 0) {
                currentTime.value = -1;
            }
        }
    });
}

// Consumer API — used in transcript or other places
export function useVueYoutube() {
    return {
        isReady,
        currentTime,
        playerInstance,
        youtubeIframe,
        goToTime,
    };
}
