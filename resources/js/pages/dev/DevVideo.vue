<script setup lang="ts">
import Button from '@/components/ui/button/Button.vue';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable';
import DefaultPageLayout from '@/layouts/DefaultPageLayout.vue';
import { BreadcrumbItemType, VideoTabItem } from '@/types';
import { usePlayer } from '@vue-youtube/core';
import { useMediaQuery } from '@vueuse/core';
import { computed, ref, watch } from 'vue';
import { transcript, videoData } from './testtranscript';
import VideoDictionary from './VideoDictionary.vue';
import VideoDictionarySettings from './VideoDictionarySettings.vue';
import VideoDictionarySideBar from './VideoDictionarySideBar.vue';
import VideoInfo from './VideoInfo.vue';
import VideoSettings from './VideoSettings.vue';
import VideoSideBar from './VideoSideBar.vue';
import VideoTranscript from './VideoTranscript.vue';

// Props related stuff
const breadcrumbs: BreadcrumbItemType[] = [
    { title: 'Home', href: '/' },
    { title: 'Video', href: '/dev/video' },
];

const videoTabItems: VideoTabItem[] = [
    {
        tabName: 'Info',
        cardTitle: 'Video Info',
        cardDescription: 'View and interact with the transcript of the video here.',
        component: VideoInfo,
    },
    {
        tabName: 'Transcript',
        cardTitle: 'Transcript',
        cardDescription: 'View and interact with the transcript of the video here.',
        component: VideoTranscript,
    },
    {
        tabName: 'Settings',
        cardTitle: 'Settings',
        cardDescription: 'Adjust your preferences here.',
        component: VideoSettings,
    },
];

const videoDictionaryTabItems: VideoTabItem[] = [
    {
        tabName: 'Dictionary',
        cardTitle: 'Dictionary',
        cardDescription: 'Look up definitions. Powered by CC-EDICT.',
        component: VideoDictionary,
    },
    {
        tabName: 'Settings',
        cardTitle: 'Settings',
        cardDescription: 'Adjust your preferences here.',
        component: VideoDictionarySettings,
    },
];

const youtube = ref();
const num = ref(0);
const isMobile = useMediaQuery('(max-width: 1024px)');

const youtubeIframe = ref<HTMLIFrameElement | null>(null);

const panelOneSize = ref<number>(60);
const panelTwoSize = ref<number>(40);

const { onReady, onStateChange, instance } = usePlayer('MbEXK7sKqCk', youtube);

// onReady and watch both used to ensure video frame is resizeable
onReady((event) => {
    const iframe = event.target.getIframe();
    youtubeIframe.value = iframe;

    iframe.removeAttribute('width');
    iframe.removeAttribute('height');
    iframe.classList.add('aspect-video');
    iframe.classList.add(isMobile.value ? 'h-full' : 'w-full');
});

let syncInterval: null | number = null;
const currentTime = ref(-1); // Negative 1 when user just loads in

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

console.log(youtube.value);

// To make the resizer responsive
const direction = computed(() => (isMobile.value ? 'vertical' : 'horizontal'));
</script>

<template>
    <DefaultPageLayout :breadcrumbs="breadcrumbs">
        <ResizablePanelGroup
            id="demo-group-1"
            :direction="direction"
            class="min-h-[calc(100vh-7em)] w-full rounded-lg border"
        >
            <ResizablePanel id="demo-panel-1" :default-size="panelOneSize">
                <div class="flex h-full items-center justify-center p-4">
                    <div ref="youtube"></div>
                </div>
            </ResizablePanel>

            <ResizableHandle id="demo-handle-1" with-handle />

            <ResizablePanel id="demo-panel-2" :default-size="panelTwoSize" :min-size="25">
                <ResizablePanelGroup id="demo-group-2" direction="vertical">
                    <ResizablePanel id="demo-panel-3" :default-size="50" :min-size="25">
                        <!-- Video Side Bar -->
                        <VideoSideBar
                            :video-tab-items="videoTabItems"
                            :video-meta-data="videoData"
                            :video-transcript-data="transcript"
                            :video-instance="instance"
                        />
                    </ResizablePanel>
                    <ResizableHandle id="demo-handle-2" with-handle />
                    <ResizablePanel id="demo-panel-4" :default-size="50" :min-size="25">
                        <!-- Dictionary Side Bar -->
                        <VideoDictionarySideBar :dictionary-tab-items="videoDictionaryTabItems" />
                    </ResizablePanel>
                </ResizablePanelGroup>
            </ResizablePanel>
        </ResizablePanelGroup>

        <!-- Testing stuff -->
        <Button @click="num = instance?.getCurrentTime() as number">Hi</Button>
        <div>{{ num }}</div>
    </DefaultPageLayout>
</template>

<style scoped>
.gutter {
    scrollbar-gutter: stable;
}
</style>

<!--
  Hardcoded Dev view for the video page
-->
