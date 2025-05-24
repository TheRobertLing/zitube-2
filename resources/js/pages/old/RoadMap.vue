<script setup lang="ts">
import DefaultPageLayout from '@/layouts/DefaultPageLayout.vue';
import TextPageLayout from '@/layouts/TextPageLayout.vue';

import { BreadcrumbItemType } from '@/types';

const breadcrumbs: BreadcrumbItemType[] = [
    {
        title: 'Home',
        href: '/',
    },
    {
        title: 'Road Map',
        href: '/roadmap',
    },
];
</script>

<template>
    <DefaultPageLayout :breadcrumbs="breadcrumbs">
        <TextPageLayout>
            <h1 class="mb-8 text-4xl font-bold">Road Map</h1>

            <p class="mb-6 text-lg leading-relaxed">
                Perhaps not really a roadmap in the truest sense, but here is a list of all the things I plan on adding
                to ZiTube once the MVP finishes:
            </p>

            <div class="space-y-10">
                <!-- Short-Term -->
                <div>
                    <h2 class="mb-2 text-2xl font-semibold">Short Term</h2>
                    <ul class="list-inside list-disc space-y-1 text-lg">
                        <li>Polish UI components and layout consistency</li>
                        <li>Basic search or filtering by video category</li>
                    </ul>
                </div>

                <!-- Medium-Term -->
                <div>
                    <h2 class="mb-2 text-2xl font-semibold">Medium Term</h2>
                    <ul class="list-inside list-disc space-y-1 text-lg">
                        <li>User accounts with saved progress or history</li>
                        <li>Like and save video functionality</li>
                        <li>Admin panel for managing videos and comments</li>
                    </ul>
                </div>

                <!-- Long-Term -->
                <div>
                    <h2 class="mb-2 text-2xl font-semibold">Long Term</h2>
                    <ul class="list-inside list-disc space-y-1 text-lg">
                        <li>Community features (comments, discussions)</li>
                        <li>Gamification (XP, streaks, badges)</li>
                        <li>Machine-generated or AI-enhanced subtitle translations</li>
                    </ul>
                </div>
            </div>
        </TextPageLayout>
    </DefaultPageLayout>
</template>

<style scoped></style>

<!--
    View for the roadmap page that outlines the roadmap for the site
-->
