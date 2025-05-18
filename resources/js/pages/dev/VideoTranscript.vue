<script setup lang="ts">
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useDictionarySearch } from '@/composables/useDictionarySearch';
import { useTraditional } from '@/composables/useTraditional';
import { useVueYoutube } from '@/composables/useVueYoutube';
import { currentIndexBinarySearch } from '@/lib/binarysearch';
import { secondsToStandardTime } from '@/lib/utils';
import type { TranscriptSegment, VideoTabDetails } from '@/types';
import { tify } from 'chinese-conv';
import { computed, ref, watch } from 'vue';

const props = defineProps<{
    videoTabDetails: VideoTabDetails;
    videoTranscriptData: TranscriptSegment[];
}>();

const { triggerDictionarySearch } = useDictionarySearch();
const { currentTime, playerInstance, isReady } = useVueYoutube();
const { showTraditional } = useTraditional();

const transcriptRowRefs = ref<HTMLElement[]>([]);

const handleClick = (timestamp: number): void => {
    if (playerInstance.value && isReady.value) {
        playerInstance.value.seekTo(timestamp, true);
        currentTime.value = timestamp;
    }
};

const currentLineIndex = computed(() => {
    return currentIndexBinarySearch(currentTime.value, props.videoTranscriptData);
});

watch(currentLineIndex, (newIndex) => {
    if (newIndex === -1) {
        return;
    }

    const el = transcriptRowRefs.value[newIndex];
    if (!el) {
        return;
    }

    const container = document.querySelector('.inner-scroll') as HTMLElement;
    if (!container) {
        return;
    }

    const containerRect = container.getBoundingClientRect();
    const elRect = el.getBoundingClientRect();
    const offset = elRect.top - containerRect.top;

    container.scrollTop += offset - container.clientHeight / 2 + el.clientHeight / 2;
});
</script>

<template>
    <Card class="flex h-full flex-1 flex-col">
        <CardHeader>
            <CardTitle>{{ videoTabDetails.cardTitle }}</CardTitle>
            <CardDescription>{{ videoTabDetails.cardDescription }}</CardDescription>
            <Separator />
        </CardHeader>

        <CardContent
            class="inner-scroll flex flex-1 flex-col space-y-2 overflow-y-auto"
            @wheel="console.log('hi this was scrolled')"
        >
            <table class="w-full table-fixed border-collapse text-left">
                <thead class="text-muted-foreground text-xs tracking-wide uppercase">
                    <tr>
                        <th class="w-24 text-center">Time</th>
                        <th>Transcript</th>
                    </tr>
                </thead>
                <tbody class="[tr+tr]:pt-2 [&>tr]:align-top">
                    <template v-for="(line, index) in videoTranscriptData" :key="index">
                        <tr
                            :class="{ 'bg-muted/80': currentTime >= line.startTime && currentTime < line.endTime }"
                            class="group"
                            :ref="(el) => (transcriptRowRefs[index] = el as HTMLElement)"
                        >
                            <td
                                rowspan="2"
                                class="text-muted-foreground cursor-pointer rounded-l-xl text-center align-middle font-mono text-xs tracking-wide uppercase hover:text-green-500"
                                @click="handleClick(line.startTime)"
                            >
                                {{ secondsToStandardTime(line.startTime) }}
                            </td>
                            <td class="rounded-tr-xl pt-1 leading-snug">
                                <template v-for="(char, idx) in line.tokenizedChinese" :key="idx">
                                    <span
                                        class="inline-block cursor-pointer px-1 transition hover:text-green-400"
                                        @click="triggerDictionarySearch(char.hanzi.join(''))"
                                    >
                                        <ruby>
                                            <template
                                                v-for="([hanziChar, pinyinChar], i) in char.hanzi.map((c, i) => [
                                                    c,
                                                    char.pinyin[i] || '',
                                                ])"
                                                :key="i"
                                            >
                                                <rb class="tracking-wider">{{
                                                    showTraditional ? tify(hanziChar) : hanziChar
                                                }}</rb>
                                                <rt class="text-muted-foreground text-[10px]">{{ pinyinChar }}</rt>
                                            </template>
                                        </ruby>
                                    </span>
                                </template>
                            </td>
                        </tr>

                        <tr :class="{ 'bg-muted/80': currentTime >= line.startTime && currentTime < line.endTime }">
                            <td class="text-muted-foreground rounded-br-xl pl-1 text-sm">
                                {{ line.english }}
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
.inner-scroll {
    scroll-behavior: smooth;
}
</style>

<!--
    Video transcript
-->
