<script setup lang="ts">
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useDictionarySearch } from '@/composables/useDictionarySearch';
import { TranscriptSegment, VideoMetaData, VideoTabItem } from '@/types';
import { onMounted, ref } from 'vue';

defineProps<{
    videoTabItems: VideoTabItem[];
    videoMetaData: VideoMetaData; // For the info tab
    videoTranscriptData: TranscriptSegment[]; // For the transcript tab
}>();

const activeTab = ref<string>('Transcript');

const { registerSearchCallback } = useDictionarySearch();

onMounted(() => {
    registerSearchCallback(() => {
        activeTab.value = 'Dictionary';
    });
});
</script>

<template>
    <Tabs
        class="gutter h-full p-4"
        :unmount-on-hide="false"
        v-model:model-value="activeTab"
    >
        <TabsList class="grid w-full auto-cols-fr grid-flow-col">
            <template v-for="(item, index) in videoTabItems" :key="index">
                <TabsTrigger :value="item.tabName" class="cursor-pointer">
                    {{ item.tabName }}
                </TabsTrigger>
            </template>
        </TabsList>

        <template v-for="(item, index) in videoTabItems" :key="index">
            <TabsContent :value="item.tabName" class="overflow-y-auto">
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
