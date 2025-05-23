<script setup lang="ts">
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useAutoScroller } from '@/composables/useAutoScroller';
import { useVueYoutube } from '@/composables/useVueYoutube';
import { currentIndexBinarySearch } from '@/lib/binarysearch';
import { secondsToStandardTime } from '@/lib/utils';
import type { TranscriptSegment, VideoTabDetails } from '@/types';
import { computed, onMounted, ref, watch } from 'vue';
import VideoTranscriptHanziRuby from './VideoTranscriptHanziRuby.vue';
import VideoTranscriptLineContext from './VideoTranscriptLineContext.vue';
import VideoTranscriptLineMenu from './VideoTranscriptLineMenu.vue';
import VideoPagination from './VideoPagination.vue';

const props = defineProps<{
    videoTabDetails: VideoTabDetails;
    videoTranscriptData: TranscriptSegment[];
    width: number;
}>();

const { currentTime, goToTime } = useVueYoutube();
const { autoscrollerEnabled } = useAutoScroller();
const scrollContainer = ref<HTMLElement | null>(null);
const transcriptRowRefs = ref<HTMLElement[]>([]);

const currentLineIndex = computed(() => {
    const result = currentIndexBinarySearch(currentTime.value, props.videoTranscriptData);
    return result;
});

const getLineHighlightClass = (line: TranscriptSegment) =>
    currentTime.value >= line.startTime && currentTime.value < line.endTime ? 'bg-muted/80' : '';

const scrollToLine = (newIndex: number) => {
    if (newIndex === -1) {
        return;
    }

    const el = transcriptRowRefs.value[newIndex];
    if (!el) {
        return;
    }

    if (!scrollContainer.value) {
        return;
    }

    const containerRect = scrollContainer.value.getBoundingClientRect();
    const elRect = el.getBoundingClientRect();
    const offset = elRect.top - containerRect.top;

    scrollContainer.value.scrollTop += offset - scrollContainer.value.clientHeight / 2 + el.clientHeight / 2;
};

watch(currentLineIndex, (newIndex) => {
    if (!autoscrollerEnabled.value) {
        return;
    }

    scrollToLine(newIndex);
});

onMounted(() => {
    scrollContainer.value = document.getElementById('scroll-container') as HTMLElement;
});
</script>

<template>
    <Card class="flex h-full flex-1 flex-col gap-1">
        <CardHeader class="gutter overflow-y-auto">
            <CardTitle>{{ videoTabDetails.cardTitle }}</CardTitle>
            <CardDescription>{{ videoTabDetails.cardDescription }}</CardDescription>
            <Separator />

            <div class="text-muted-foreground flex items-center gap-3 text-[10px]" v-show="!autoscrollerEnabled">
                <span
                    class="cursor-pointer transition hover:text-green-500 hover:underline"
                    @click="scrollToLine(currentLineIndex)"
                >
                    Go to Current Line
                </span>
            </div>
        </CardHeader>

        <CardContent
            id="scroll-container"
            class="gutter flex flex-1 flex-col overflow-y-auto scroll-smooth"
            @scroll="scrollContainer?.focus()"
        >
            <VideoPagination :video-transcript-data="videoTranscriptData" />

        </CardContent>
    </Card>
</template>


