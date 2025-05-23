<script setup lang="ts">
import { initVueYoutube, useVueYoutube } from '@/composables/useVueYoutube';
import { useTemplateRef } from 'vue';

const props = defineProps<{
    videoId: string;
}>();

const videoFrameRef = useTemplateRef('videoContainer'); // YouTube container div
initVueYoutube(props.videoId, videoFrameRef);
const { isReady } = useVueYoutube();
</script>

<template>
    <div ref="videoContainer" class="p-4"></div>
    <div v-if="!isReady" class="bg-opacity-80 absolute inset-0 z-10 flex items-center justify-center p-4">
        <div class="h-12 w-12 animate-spin rounded-full border-4 border-white border-t-transparent"></div>
    </div>
</template>

<style scoped>
@keyframes loading-bar {
    0% {
        transform: translateX(-100%);
    }
    100% {
        transform: translateX(100%);
    }
}

.animate-loading-bar {
    animation: loading-bar 1.2s infinite linear;
}
</style>

<!--
    Video Player component
-->
