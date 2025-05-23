<script setup lang="ts">
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable';
import VideoPageLayout from '@/layouts/VideoPageLayout.vue';
import { BreadcrumbItemType, VideoTabItem } from '@/types';
import { Head, usePage } from '@inertiajs/vue3';
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

const page = usePage();

const videoTabItems: VideoTabItem[] = [
    {
        tabName: 'Info',
        cardTitle: 'Video Info',
        cardDescription: 'Overview, title, description, and upload details',
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
        cardDescription: 'Look up definitions of words and phrases. Powered by CC-EDICT.',
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
const panelTwoVerticalMinSize = ref<number>(40);

const url = 'MbEXK7sKqCk';

// To make the resizer responsive
const direction = computed(() => (isMobile.value ? 'vertical' : 'horizontal'));
</script>

<template>
    <Head>
        <title>{{ videoData.title }} | ZiTube</title>
        <meta
            name="description"
            :content="videoData.description || 'Watch Chinese videos with interactive transcripts on ZiTube.'"
        />
        <meta property="og:title" :content="videoData.title" />
        <meta
            property="og:description"
            :content="videoData.description || 'Learn Chinese through native content with interactive tools.'"
        />
        <meta property="og:type" content="video.other" />
        <meta property="og:url" :content="`https://zitube.com${page.url}`" />
    </Head>
    <VideoPageLayout :breadcrumbs="breadcrumbs">
        <ResizablePanelGroup
            id="demo-group-1"
            :direction="direction"
            class="max-h-[calc(100vh-8rem)] min-h-[calc(100vh-8rem)] w-full"
        >
            <ResizablePanel id="demo-panel-1" :default-size="panelOneDefaultSize" :min-size="panelOneMinSize">
                <VideoPlayer :video-id="url" />
            </ResizablePanel>

            <ResizableHandle id="demo-handle-1" with-handle />

            <ResizablePanel
                id="demo-panel-2"
                :default-size="panelTwoDefaultSize"
                :min-size="direction === 'horizontal' ? panelTwoMinSize : panelTwoVerticalMinSize"
            >
                <VideoSideBar
                    :video-tab-items="videoTabItems"
                    :video-meta-data="videoData"
                    :video-transcript-data="transcript"
                />
            </ResizablePanel>
        </ResizablePanelGroup>
    </VideoPageLayout>
</template>

<!--
  Hardcoded Dev view for the video page
-->
