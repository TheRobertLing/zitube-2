<script setup lang="ts">
import { useVueYoutube } from '@/composables/useVueYoutube';
import { usePlayer } from '@vue-youtube/core';
import { useMediaQuery } from '@vueuse/core';
import { ref, useTemplateRef, watch } from 'vue';

const videoFrameRef = useTemplateRef('videoContainer'); // YouTube container div
const youtubeIframe = ref<HTMLIFrameElement | null>(null);
const isMobile = useMediaQuery('(max-width: 1024px)');
const { isReady, playerInstance, currentTime } = useVueYoutube();
const { onReady, onStateChange, instance } = usePlayer('MbEXK7sKqCk', videoFrameRef);
let syncInterval: number | null = null;

onReady((event) => {
    const iframe = event.target.getIframe();
    youtubeIframe.value = iframe;

    iframe.removeAttribute('width');
    iframe.removeAttribute('height');
    iframe.classList.add('aspect-video');
    iframe.classList.add(isMobile.value ? 'h-full' : 'w-full');

    isReady.value = true;
    playerInstance.value = instance.value;
});

onStateChange((event) => {
    const state = event.data;

    if (state === 1 && !syncInterval) {
        // Playing: start sync interval
        syncInterval = setInterval(() => {
            currentTime.value = instance.value?.getCurrentTime() ?? -1;
        }, 100);
    } else if ([0, 2, 3].includes(state) && syncInterval) {
        // Ended / paused / buffering: stop interval
        clearInterval(syncInterval);
        syncInterval = null;
    }
});

watch(isMobile, (mobile) => {
    if (!youtubeIframe.value) {
        return;
    }
    youtubeIframe.value.classList.remove('w-full', 'h-full');
    youtubeIframe.value.classList.add(mobile ? 'h-full' : 'w-full');
});
</script>

<template>
    <div class="flex h-full items-center justify-center p-4">
        <div ref="videoContainer">
            <div v-if="!isReady">
                <span class="loader"></span>
            </div>
        </div>
    </div>
</template>

<style scoped>
.loader {
    width: 48px;
    height: 48px;
    border: 5px solid #fff;
    border-bottom-color: transparent;
    border-radius: 50%;
    display: inline-block;
    box-sizing: border-box;
    animation: rotation 1s linear infinite;
}
</style>

<!--
    Video Player component
-->
