<script setup lang="ts">
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useDictionarySearch } from '@/composables/useDictionarySearch';
import { TranscriptSegment, VideoMetaData, VideoTabItem } from '@/types';
import { useElementSize } from '@vueuse/core';
import { BookA, Captions, Info, Settings2 } from 'lucide-vue-next';
import { onMounted, ref, useTemplateRef } from 'vue';
import VideoDictionary from './sidebarcomponents/dictionary/VideoDictionary.vue';
import VideoInfo from './sidebarcomponents/info/VideoInfo.vue';
import VideoSettings from './sidebarcomponents/settings/VideoSettings.vue';
import VideoTranscript from './sidebarcomponents/transcript/VideoTranscript.vue';

defineProps<{
    videoMetaData: VideoMetaData;
    videoTranscriptData: TranscriptSegment[];
}>();

const isReady = ref<boolean>(false);
const activeTab = ref<string>('Transcript');
const { registerSearchCallback } = useDictionarySearch();
registerSearchCallback(() => {
    activeTab.value = 'Dictionary';
});

const videoTabItems: VideoTabItem[] = [
    {
        tabName: 'Info',
        cardTitle: 'Video Info',
        cardDescription: 'Overview, title, description, and upload details',
        icon: Info,
        component: VideoInfo,
    },
    {
        tabName: 'Transcript',
        cardTitle: 'Transcript',
        cardDescription: 'View and interact with the transcript of the video here.',
        icon: Captions,
        component: VideoTranscript,
    },
    {
        tabName: 'Dictionary',
        cardTitle: 'Dictionary',
        cardDescription: 'Look up definitions of words and phrases. Powered by CC-EDICT.',
        icon: BookA,
        component: VideoDictionary,
    },
    {
        tabName: 'Settings',
        cardTitle: 'Settings',
        cardDescription: 'Adjust your preferences here.',
        icon: Settings2,
        component: VideoSettings,
    },
];

const tabsEl = useTemplateRef('tabs');
const { width, height } = useElementSize(tabsEl);

onMounted(() => {
    if (width.value) {
        isReady.value = true;
    }
});
</script>

<template>
    <!-- Outer div is for the width watcher. Style MUST be kept for scrolling to work -->
    <div ref="tabs" class="h-full w-full">
        <Tabs class="h-full p-2" :unmount-on-hide="false" v-model:model-value="activeTab">
            <TabsList class="grid w-full auto-cols-fr grid-flow-col">
                <template v-for="(item, index) in videoTabItems" :key="index">
                    <TabsTrigger :value="item.tabName" class="cursor-pointer overflow-hidden">
                        <component :is="item.icon" class="h-4 w-4" />

                        <!-- Only show text if width is wide enough -->
                        <span v-if="width > 500" class="truncate">
                            {{ item.tabName }}
                        </span>
                    </TabsTrigger>
                </template>
            </TabsList>

            <template v-for="(item, index) in videoTabItems" :key="index">
                <!-- KEEP THIS OVERFLOW-Y-AUTO HERE IT BREAKS OTHERWISE -->
                <TabsContent class="overflow-y-auto" :value="item.tabName">
                    <component
                        :is="item.component"
                        :video-tab-details="{
                            cardTitle: item.cardTitle,
                            cardDescription: item.cardDescription,
                        }"
                        :video-meta-data="videoMetaData"
                        :video-transcript-data="videoTranscriptData"
                        :width="width"
                        :height="height"
                    />
                </TabsContent>
            </template>
        </Tabs>
    </div>
</template>

<style>
.gutter {
    scrollbar-gutter: stable;
}
</style>

<!--
    Production side bar
-->
