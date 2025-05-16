<script setup lang="ts">
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { TranscriptSegment, VideoMetaData, VideoTabItem } from '@/types';

defineProps<{
    videoTabItems: VideoTabItem[];
    videoMetaData: VideoMetaData; // For the info tab
    videoTranscriptData: TranscriptSegment[]; // For the transcript tab
}>();
</script>

<template>
    <div class="gutter flex h-full items-center justify-center overflow-y-auto p-4">
        <Tabs default-value="Transcript" class="h-full w-full">
            <TabsList class="grid grid-flow-col auto-cols-fr w-full">
                <template v-for="(item, index) in videoTabItems" :key="index">
                    <TabsTrigger :value="item.tabName" class="cursor-pointer"> {{ item.tabName }} </TabsTrigger>
                </template>
            </TabsList>

            <template v-for="(item, index) in videoTabItems" :key="index">
                <TabsContent :value="item.tabName">
                    <component
                        :is="item.component"
                        :video-tab-details="{
                            cardTitle: item.cardTitle,
                            cardDescription: item.cardDescription,
                        }"
                        :video-meta-data="videoMetaData"
                        :video-transcript-data="videoTranscriptData"
                    />
                </TabsContent>
            </template>
        </Tabs>
    </div>
</template>

<style scoped>
.gutter {
    scrollbar-gutter: stable;
}
</style>

<!--
    Basically houses the info, transcript, settings tabs etc. Refactored
    to keep components less bloated
-->
