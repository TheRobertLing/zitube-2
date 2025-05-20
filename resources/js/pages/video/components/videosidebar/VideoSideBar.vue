<script setup lang="ts">
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useDictionarySearch } from '@/composables/useDictionarySearch';
import { TranscriptSegment, VideoMetaData, VideoTabItem } from '@/types';
import { onMounted, ref } from 'vue';
import VideoDictionary from './sidebarcomponents/dictionary/VideoDictionary.vue';
import VideoInfo from './sidebarcomponents/info/VideoInfo.vue';
import VideoSettings from './sidebarcomponents/settings/VideoSettings.vue';
import VideoTranscript from './sidebarcomponents/transcript/VideoTranscript.vue';

defineProps<{
    videoMetaData: VideoMetaData;
    videoTranscriptData: TranscriptSegment[];
}>();

const activeTab = ref<string>('Transcript');

const { registerSearchCallback } = useDictionarySearch();

onMounted(() => {
    registerSearchCallback(() => {
        activeTab.value = 'Dictionary';
    });
});

const videoTabItems: VideoTabItem[] = [
    {
        tabName: 'Info',
        cardTitle: 'Video Info',
        cardDescription: 'Overview, title, description, and upload details',
        component: VideoInfo,
    },
    {
        tabName: 'Transcript',
        cardTitle: 'Transcript',
        cardDescription: 'View and interact with the transcript of the video here.',
        component: VideoTranscript,
    },
    {
        tabName: 'Dictionary',
        cardTitle: 'Dictionary',
        cardDescription: 'Look up definitions of words and phrases. Powered by CC-EDICT.',
        component: VideoDictionary,
    },
    {
        tabName: 'Settings',
        cardTitle: 'Settings',
        cardDescription: 'Adjust your preferences here.',
        component: VideoSettings,
    },
];
</script>

<template>
    <Tabs class="gutter h-full p-4" :unmount-on-hide="false" v-model:model-value="activeTab">
        <TabsList class="grid w-full auto-cols-fr grid-flow-col">
            <template v-for="(item, index) in videoTabItems" :key="index">
                <TabsTrigger :value="item.tabName" class="cursor-pointer">
                    {{ item.tabName }}
                </TabsTrigger>
            </template>
        </TabsList>

        <template v-for="(item, index) in videoTabItems" :key="index">
            <TabsContent class="overflow-y-auto" :value="item.tabName">
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
    Production side bar
-->
