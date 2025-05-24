<script setup lang="ts">
import VideoPageLayout from '@/layouts/video/VideoPageLayout.vue';
import { TranscriptSegment, VideoMetaData } from '@/types';
import { Head, usePage } from '@inertiajs/vue3';
import { useWindowSize } from '@vueuse/core';
import { computed, useTemplateRef } from 'vue';
import { videoData as d, transcript as t } from '../dev/testtranscript';
import VideoPlayer from './components/videobox/VideoPlayer.vue';
import VideoSideBar from './components/videosidebar/VideoSideBar.vue';

defineProps<{
    videoData: VideoMetaData;
    videoTranscript: TranscriptSegment[];
}>();

const page = usePage();
const videoBoxRef = useTemplateRef('videoBox');
const { width, height } = useWindowSize();
const isLandscape = computed(() => width.value > height.value);
const layoutClass = computed(() => (isLandscape.value ? 'flex-row' : 'flex-col'));
const videoBoxLayout = computed(() => (isLandscape.value ? 'flex-3/5' : ''));
const sidebarLayout = computed(() => (isLandscape.value ? 'flex-2/5' : 'flex-1'));
</script>

<template>
    <Head>
        <title>ZiTube - {{ d.title }}</title>
        <meta
            name="description"
            :content="`Watch ${d.title} with interactive Chinese subtitles and learn in context on ZiTube.`"
        />
        <meta property="og:title" :content="d.title" />
        <meta
            property="og:description"
            :content="d.description || 'Learn Chinese through native content with interactive tools.'"
        />
        <meta property="og:type" content="video.other" />
        <meta property="og:url" :content="`https://zitube.com${page.url}`" />
    </Head>

    <VideoPageLayout class="flex w-full" :class="layoutClass">
        <!-- Video player container -->
        <div
            ref="videoBox"
            class="relative flex aspect-video w-full items-center justify-center overflow-hidden border"
            :class="videoBoxLayout"
        >
            <VideoPlayer :video-id="d.id || 'MbEXK7sKqCk'" :video-box="videoBoxRef" />
        </div>

        <!-- Sidebar container -->
        <div class="flex-1 overflow-y-auto border" :class="sidebarLayout">
            <VideoSideBar :video-meta-data="d" :video-transcript-data="t" />
        </div>
    </VideoPageLayout>
</template>
