<script setup lang="ts">
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable';
import DefaultPageLayout from '@/layouts/DefaultPageLayout.vue';
import { BreadcrumbItemType, VideoTabItem } from '@/types';
import { useMediaQuery } from '@vueuse/core';
import { computed, ref } from 'vue';
import { transcript, videoData } from './testtranscript';
import VideoDictionary from './VideoDictionary.vue';
import VideoInfo from './VideoInfo.vue';
import VideoPlayer from './VideoPlayer.vue';
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
        tabName: 'Dictionary',
        cardTitle: 'Dictionary',
        cardDescription: 'Look up definitions. Powered by CC-EDICT.',
        component: VideoDictionary,
    },
    {
        tabName: 'Settings',
        cardTitle: 'Settings',
        cardDescription: 'Adjust your preferences here.',
        component: VideoSettings,
    },
];

const isMobile = useMediaQuery('(max-width: 1024px)');
const panelOneDefaultSize = ref<number>(60);
const panelOneMinSize = ref<number>(0);
const panelTwoDefaultSize = ref<number>(40);
const panelTwoMinSize = ref<number>(30);

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
            <ResizablePanel id="demo-panel-1" :default-size="panelOneDefaultSize" :min-size="panelOneMinSize">
                <VideoPlayer />
            </ResizablePanel>

            <ResizableHandle id="demo-handle-1" with-handle />

            <ResizablePanel id="demo-panel-2" :default-size="panelTwoDefaultSize" :min-size="panelTwoMinSize">
                <VideoSideBar
                    :video-tab-items="videoTabItems"
                    :video-meta-data="videoData"
                    :video-transcript-data="transcript"
                />
            </ResizablePanel>
        </ResizablePanelGroup>
    </DefaultPageLayout>
</template>

<!--
  Hardcoded Dev view for the video page
-->
