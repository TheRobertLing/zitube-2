<script setup lang="ts">
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { VideoTabItem } from '@/types';

defineProps<{
    dictionaryTabItems: VideoTabItem[];
}>();
</script>

<template>
    <div class="gutter flex h-full overflow-y-auto p-4">
        <Tabs default-value="Dictionary" class="h-full w-full">
            <TabsList class="grid w-full" :class="`grid-cols-${dictionaryTabItems.length}`">
                <template v-for="(item, index) in dictionaryTabItems" :key="index">
                    <TabsTrigger :value="item.tabName" class="cursor-pointer"> {{ item.tabName }} </TabsTrigger>
                </template>
            </TabsList>

            <template v-for="(item, index) in dictionaryTabItems" :key="index">
                <TabsContent :value="item.tabName">
                    <component
                        :is="item.component"
                        :dictionary-tab-details="{
                            cardTitle: item.cardTitle,
                            cardDescription: item.cardDescription,
                        }"
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

-->
