<script setup lang="ts">
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useVueYoutube } from '@/composables/useVueYoutube';
import { secondsToStandardTime } from '@/lib/utils';
import { TranscriptSegment, VideoTabDetails } from '@/types';

defineProps<{
    videoTabDetails: VideoTabDetails;
    videoTranscriptData: TranscriptSegment[];
}>();

const { currentTime, playerInstance, isReady } = useVueYoutube();

// Click to jump to a certain timestamp
const handleClick = (timestamp: number): void => {
    if (playerInstance.value && isReady.value) {
        playerInstance.value.seekTo(timestamp, true);
        currentTime.value = timestamp;
    }
};
</script>

<template>
    <Card>
        <CardHeader>
            <CardTitle>{{ videoTabDetails.cardTitle }}</CardTitle>
            <CardDescription>{{ videoTabDetails.cardDescription }}</CardDescription>
            <Separator />
        </CardHeader>

        <CardContent class="space-y-2">
            <table class="w-full table-fixed border-collapse text-left text-base">
                <thead class="text-muted-foreground text-sm">
                    <tr>
                        <th class="w-24 text-center">Time</th>
                        <th>Transcript</th>
                    </tr>
                </thead>
                <tbody class="[tr+tr]:pt-2 [&>tr]:align-top">
                    <template v-for="(line, index) in videoTranscriptData" :key="index">
                        <!-- First row: time + Chinese -->
                        <tr
                            :class="{ 'bg-muted/80': currentTime >= line.startTime && currentTime < line.endTime }"
                            class="group"
                        >
                            <td
                                rowspan="2"
                                class="text-muted-foreground cursor-pointer rounded-l-xl text-center align-middle font-mono text-sm hover:text-green-500"
                                @click="handleClick(line.startTime)"
                            >
                                {{ secondsToStandardTime(line.startTime) }}
                            </td>
                            <td class="rounded-tr-xl pt-1 leading-snug">
                                <template v-for="(char, idx) in line.tokenizedChinese" :key="idx">
                                    <span class="inline-block cursor-pointer px-1 transition hover:text-green-400">
                                        <ruby>
                                            <template
                                                v-for="([hanziChar, pinyinChar], i) in char.hanzi.map((c, i) => [
                                                    c,
                                                    char.pinyin[i] || '',
                                                ])"
                                                :key="i"
                                            >
                                                <rb>{{ hanziChar }}</rb>
                                                <rt class="text-muted-foreground text-xs">{{ pinyinChar }}</rt>
                                            </template>
                                        </ruby>
                                    </span>
                                </template>
                            </td>
                        </tr>

                        <!-- Second row: English -->
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

<style scoped></style>

<!--
    Video transcript
-->
