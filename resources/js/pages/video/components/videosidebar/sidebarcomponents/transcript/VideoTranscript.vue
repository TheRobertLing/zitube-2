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
import VideoTranscriptLineMenu from './VideoTranscriptLineMenu.vue';

const props = defineProps<{
    videoTabDetails: VideoTabDetails;
    videoTranscriptData: TranscriptSegment[];
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
        <CardHeader>
            <CardTitle>{{ videoTabDetails.cardTitle }}</CardTitle>
            <CardDescription>{{ videoTabDetails.cardDescription }}</CardDescription>
            <Separator />

            <div
                class="text-muted-foreground flex items-center justify-end gap-3 text-[10px]"
                v-show="!autoscrollerEnabled"
            >
                <span
                    class="cursor-pointer transition hover:text-green-500 hover:underline"
                    @click="scrollToLine(currentLineIndex)"
                >
                    Go to Current Line
                </span>
            </div>
        </CardHeader>

        <CardContent id="scroll-container" class="flex flex-1 flex-col space-y-4 overflow-y-auto scroll-smooth">
            <table class="w-full table-fixed border-collapse text-left">
                <thead class="text-muted-foreground text-xs tracking-wide uppercase">
                    <tr>
                        <th class="w-24 text-center">Time</th>
                        <th>Transcript</th>
                        <th class="w-12 text-center"></th>
                    </tr>
                </thead>
                <tbody class="[tr+tr]:pt-2 [&>tr]:align-top">
                    <template v-for="(line, index) in videoTranscriptData" :key="index">
                        <tr
                            :class="['group transcript-row cursor-pointer', getLineHighlightClass(line)]"
                            :ref="(el) => (transcriptRowRefs[index] = el as HTMLElement)"
                            @click="goToTime(line.startTime)"
                        >
                            <td
                                class="text-muted-foreground rounded-l-xl text-center align-middle font-mono text-xs tracking-wide uppercase hover:text-green-500"
                                rowspan="2"
                            >
                                {{ secondsToStandardTime(line.startTime) }}
                            </td>
                            <td class="pt-1 leading-snug">
                                <template v-for="(char, idx) in line.tokenizedChinese" :key="idx">
                                    <VideoTranscriptHanziRuby :hanzi="char.hanzi" :pinyin="char.pinyin" />
                                </template>
                            </td>
                            <td class="w-12 rounded-r-xl text-center align-middle" rowspan="2">
                                <VideoTranscriptLineMenu :line="line" />
                            </td>
                        </tr>

                        <tr
                            :class="['transcript-row cursor-pointer', getLineHighlightClass(line)]"
                            @click="goToTime(line.startTime)"
                        >
                            <td class="text-muted-foreground pl-1 text-sm">
                                <span @click.stop>{{ line.english }}</span>
                            </td>
                        </tr>
                    </template>
                </tbody>
            </table>

            <Separator label="End of Transcript" />
        </CardContent>
    </Card>
</template>

<style scoped>
.transcript-row:hover td {
    border: 1px solid hsl(var(--muted));
    background-color: hsl(var(--muted) / 0.15);
    transition: all 0.15s ease;
}
.transcript-row:hover td:first-child {
    border-top-left-radius: 0.5rem;
    border-bottom-left-radius: 0.5rem;
}
.transcript-row:hover td:last-child {
    border-top-right-radius: 0.5rem;
    border-bottom-right-radius: 0.5rem;
}
</style>
