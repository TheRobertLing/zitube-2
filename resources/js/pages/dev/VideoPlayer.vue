<script setup lang="ts">
import { useVueYoutube } from '@/composables/useVueYoutube';
import { usePlayer } from '@vue-youtube/core';
import { useMediaQuery } from '@vueuse/core';
import { ref, useTemplateRef, watch } from 'vue';

const isMobile = useMediaQuery('(max-width: 1024px)');
const videoFrameRef = useTemplateRef('videoContainer');

const youtubeIframe = ref<HTMLIFrameElement | null>(null);
const { isReady, playerInstance, currentTime } = useVueYoutube();

const { onReady, onStateChange, instance } = usePlayer('MbEXK7sKqCk', videoFrameRef);

onReady((event) => {
    const iframe = event.target.getIframe();
    youtubeIframe.value = iframe;

    // Make height and width resizable
    iframe.removeAttribute('width');
    iframe.removeAttribute('height');
    iframe.classList.add('aspect-video');
    iframe.classList.add(isMobile.value ? 'h-full' : 'w-full');

    isReady.value = true;
    playerInstance.value = instance.value;
});

let syncInterval: null | number = null;

onStateChange((event) => {
    const state = event.data;

    if (state === 1) {
        // playing
        if (!syncInterval) {
            syncInterval = setInterval(() => {
                currentTime.value = instance.value?.getCurrentTime() as number;
            }, 100);
        }
    } else if ([0, 2, 3].includes(state)) {
        // ended, paused, buffering
        if (syncInterval) {
            clearInterval(syncInterval);
            syncInterval = null;
        }
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
        <div ref="videoContainer"></div>
    </div>
</template>

<style scoped></style>

<!--
    Video Player component
-->
