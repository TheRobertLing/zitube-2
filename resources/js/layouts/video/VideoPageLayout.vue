<script setup lang="ts">
import DefaultFooter from '@/components/DefaultFooter.vue';
import DefaultNavBar from '@/components/DefaultNavBar.vue';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable';
import type { BreadcrumbItemType } from '@/types';

interface Props {
    breadcrumbs?: BreadcrumbItemType[];
}

withDefaults(defineProps<Props>(), {
    breadcrumbs: () => [],
});
</script>

<template>
    <DefaultNavBar :breadcrumbs="breadcrumbs" />
    <main class="h-[calc(100vh-8rem)]">
        <slot>
            <ResizablePanelGroup
                id="demo-group-1"
                direction="horizontal"
                class="max-h-[calc(100vh-8rem)] min-h-[calc(100vh-8rem)] w-full"
            >
                <ResizablePanel id="demo-panel-1" :default-size="50"> </ResizablePanel>

                <ResizableHandle id="demo-handle-1" with-handle />

                <ResizablePanel id="demo-panel-2" :default-size="50"> </ResizablePanel>
            </ResizablePanelGroup>
        </slot>
    </main>
    <DefaultFooter />
</template>

<!--
    Page layout for videos. Follows the

    header
    main
    footer

    structure
-->
