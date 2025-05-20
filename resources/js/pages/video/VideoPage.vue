<script setup lang="ts">
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable';
import VideoPageLayout from '@/layouts/video/VideoPageLayout.vue';
import { BreadcrumbItemType, TranscriptSegment, VideoMetaData } from '@/types';
import { Head, usePage } from '@inertiajs/vue3';
import { useMediaQuery } from '@vueuse/core';
import { computed, ref } from 'vue';
import VideoPlayer from './components/videobox/VideoPlayer.vue';
import VideoSideBar from './components/videosidebar/VideoSideBar.vue';

defineProps<{
    videoData: VideoMetaData;
    videoTranscript: TranscriptSegment[];
}>();

const breadcrumbs: BreadcrumbItemType[] = [
    { title: 'Home', href: '/' },
    { title: 'Video', href: '/dev/video' },
];

const page = usePage();
const isMobile = useMediaQuery('(max-width: 1024px)');
const panelOneDefaultSize = ref<number>(60);
const panelOneMinSize = ref<number>(0);
const panelTwoDefaultSize = ref<number>(40);
const panelTwoMinSize = ref<number>(30);
const panelTwoVerticalMinSize = ref<number>(40);

// To make the resizer responsive
const direction = computed(() => (isMobile.value ? 'vertical' : 'horizontal'));
</script>

<template>
    <Head>
        <title>{{ videoData.title }} | ZiTube</title>
        <meta
            name="description"
            :content="`Watch ${videoData.title} with interactive Chinese subtitles and learn in context on ZiTube.`"
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
                <VideoPlayer :video-id="videoData.id" />
            </ResizablePanel>

            <ResizableHandle id="demo-handle-1" with-handle />

            <ResizablePanel
                id="demo-panel-2"
                :default-size="panelTwoDefaultSize"
                :min-size="direction === 'horizontal' ? panelTwoMinSize : panelTwoVerticalMinSize"
            >
                <VideoSideBar :video-meta-data="videoData" :video-transcript-data="videoTranscript" />
            </ResizablePanel>
        </ResizablePanelGroup>
    </VideoPageLayout>
</template>

<!--
  Production view for the video page
-->
