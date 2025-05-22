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
            <div
                v-for="(line, index) in videoTranscriptData"
                :key="index"
                :ref="(el) => (transcriptRowRefs[index] = el as HTMLElement)"
                @click="goToTime(line.startTime)"
                class="group hover:bg-muted/50 flex w-full cursor-pointer rounded-xl transition-colors"
                :class="getLineHighlightClass(line)"
            >
                <!-- Time -->
                <div
                    class="text-muted-foreground flex min-w-18 items-center justify-center rounded-l-xl font-mono text-xs tracking-wide uppercase hover:text-green-500"
                >
                    {{ secondsToStandardTime(line.startTime) }}
                </div>

                <!-- Transcript content -->
                <div class="flex flex-1 flex-col justify-center py-1">
                    <!-- Chinese -->
                    <div class="leading-snug">
                        <template v-for="(char, idx) in line.tokenizedChinese" :key="idx">
                            <VideoTranscriptHanziRuby :hanzi="char.hanzi" :pinyin="char.pinyin" />
                        </template>
                    </div>
                    <!-- English -->
                    <div class="text-muted-foreground pl-1 text-sm">
                        <span class="break-all" @click.stop>{{ line.english }}</span>
                    </div>
                </div>

                <!-- Options -->
                <div class="flex shrink-0 items-center justify-center rounded-r-xl">
                    <VideoTranscriptLineContext :context="line.context" :width="width" />
                </div>

                <!-- Options -->
                <div class="flex shrink-0 items-center justify-center rounded-r-xl">
                    <VideoTranscriptLineMenu :line="line" />
                </div>
            </div>

            <br />
            <Separator label="End of Transcript" />
        </CardContent>
    </Card>
</template>
