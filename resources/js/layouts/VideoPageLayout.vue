<script setup lang="ts">
import DefaultNavBar from '@/components/DefaultNavBar.vue';
import PlaceholderPattern from '@/components/PlaceholderPattern.vue';
import VideoMain from '@/components/VideoMain.vue';
import type { BreadcrumbItemType } from '@/types';

interface Props {
    breadcrumbs?: BreadcrumbItemType[];
}

withDefaults(defineProps<Props>(), {
    breadcrumbs: () => [],
});
</script>

<template>
    <div class="relative">
        <DefaultNavBar :breadcrumbs="breadcrumbs" />
        <VideoMain>
            <slot>
                <div class="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                    <div class="grid auto-rows-min gap-4 md:grid-cols-3">
                        <div
                            class="border-sidebar-border/70 dark:border-sidebar-border relative aspect-video overflow-hidden rounded-xl border"
                        >
                            <PlaceholderPattern />
                        </div>
                        <div
                            class="border-sidebar-border/70 dark:border-sidebar-border relative aspect-video overflow-hidden rounded-xl border"
                        >
                            <PlaceholderPattern />
                        </div>
                        <div
                            class="border-sidebar-border/70 dark:border-sidebar-border relative aspect-video overflow-hidden rounded-xl border"
                        >
                            <PlaceholderPattern />
                        </div>
                    </div>
                    <div
                        class="border-sidebar-border/70 dark:border-sidebar-border relative min-h-[100vh] flex-1 rounded-xl border md:min-h-min"
                    >
                        <PlaceholderPattern />
                    </div>
                </div>
            </slot>
        </VideoMain>
    </div>
</template>

<style scoped></style>

<!--
    Basically default page layout but the main slot is replaced
-->
