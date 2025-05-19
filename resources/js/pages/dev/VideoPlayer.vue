<script setup lang="ts">
import { initVueYoutube } from '@/composables/useVueYoutube';
import { useTemplateRef } from 'vue';

const props = defineProps<{
    videoId: string;
}>();

const videoFrameRef = useTemplateRef('videoContainer'); // YouTube container div
initVueYoutube(props.videoId, videoFrameRef);
</script>

<template>
    <div class="flex h-full items-center justify-center p-2">
        <div ref="videoContainer"></div>
    </div>
</template>

<style scoped></style>

<!--
    Video Player component
-->
