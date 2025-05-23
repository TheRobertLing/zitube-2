<script setup lang="ts">
import Separator from '@/components/ui/separator/Separator.vue';
import VideoPageLayout from '@/layouts/video/VideoPageLayout.vue';
import { BreadcrumbItemType, TranscriptSegment, VideoMetaData } from '@/types';
import { Head, usePage } from '@inertiajs/vue3';
import { useMediaQuery } from '@vueuse/core';
import { videoData as d, transcript as t } from '../dev/testtranscript';
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

    <VideoPageLayout :breadcrumbs="breadcrumbs">
        <div class="flex h-full w-full flex-col lg:flex-row">
            <!-- Video player container -->
            <div
                class="relative flex aspect-video w-full items-center justify-center overflow-hidden md:flex-1/2 lg:flex-3/5"
            >
                <VideoPlayer :video-id="d.id || 'MbEXK7sKqCk'" />
            </div>

            <!-- Separator based on screen size -->
            <Separator :orientation="isMobile ? 'horizontal' : 'vertical'" />

            <!-- Sidebar container -->
            <div class="flex-1 overflow-y-auto md:flex-1/2 lg:flex-2/5">
                <VideoSideBar :video-meta-data="d" :video-transcript-data="t" />
            </div>
        </div>
    </VideoPageLayout>
</template>
