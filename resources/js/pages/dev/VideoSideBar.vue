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
    <div class="gutter scrollable-content flex h-full items-center justify-center p-4">
        <Tabs default-value="Transcript" class="h-full w-full">
            <TabsList class="grid w-full auto-cols-fr grid-flow-col">
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

.scrollable-content {
    overflow-y: auto;
    scrollbar-width: thin;
    scrollbar-color: #888 transparent;
}

.scrollable-content::-webkit-scrollbar {
    width: 8px;
}

.scrollable-content::-webkit-scrollbar-track {
    background: transparent;
}

.scrollable-content::-webkit-scrollbar-thumb {
    background-color: #555;
    border-radius: 4px;
    border: 2px solid transparent;
    background-clip: content-box;
}

.scrollable-content::-webkit-scrollbar-thumb:hover {
    background-color: #777;
}
</style>

<!--
    Basically houses the info, transcript, settings tabs etc. Refactored
    to keep components less bloated
-->
