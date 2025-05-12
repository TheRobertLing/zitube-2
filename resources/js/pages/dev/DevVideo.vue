<script setup lang="ts">
import Button from '@/components/ui/button/Button.vue';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable';
import DefaultPageLayout from '@/layouts/DefaultPageLayout.vue';
import { BreadcrumbItemType } from '@/types';
import { usePlayer } from '@vue-youtube/core';
import { ref } from 'vue';

const breadcrumbs: BreadcrumbItemType[] = [
    {
        title: 'Home',
        href: '/',
    },
    {
        title: 'Video',
        href: '/dev/video',
    },
];

// Use a template ref to reference the target element
const youtube = ref();
const num = ref(0);

// Call the 'usePlayer' function with the desired video ID and target ref
const { instance } = usePlayer('JklLN8aG_F8', youtube);
</script>

<template>
    <DefaultPageLayout :breadcrumbs="breadcrumbs">
        <ResizablePanelGroup id="demo-group-1" direction="horizontal" class="w-full rounded-lg border min-h-screen">
            <ResizablePanel id="demo-panel-1" :default-size="50">
                <div class="flex items-center justify-center p-6">
                    <div ref="youtube"></div>
                </div>
            </ResizablePanel>
            <ResizableHandle id="demo-handle-1" />
            <ResizablePanel id="demo-panel-2" :default-size="50">
                <ResizablePanelGroup id="demo-group-2" direction="vertical">
                    <ResizablePanel id="demo-panel-3" :default-size="25">
                        <div class="flex h-full items-center justify-center p-6">
                            <span class="font-semibold">Two</span>
                        </div>
                    </ResizablePanel>
                    <ResizableHandle id="demo-handle-2" />
                    <ResizablePanel id="demo-panel-4" :default-size="75">
                        <div class="flex h-full items-center justify-center p-6">
                            <span class="font-semibold">Three</span>
                        </div>
                    </ResizablePanel>
                </ResizablePanelGroup>
            </ResizablePanel>
        </ResizablePanelGroup>


        <Button @click="num = instance?.getCurrentTime() as number"> Hi </Button>
        <div>
            {{ num }}
        </div>
    </DefaultPageLayout>
</template>

<style scoped></style>

<!--
    Hardcoded Dev view for the video page
-->
