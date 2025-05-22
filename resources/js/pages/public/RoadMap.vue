<script setup lang="ts">
import TextPageLayout from '@/layouts/public/TextPageLayout.vue';
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

const steps = [
    {
        step: 1,
        title: 'Short-term Goals',
        description: [
            'Polish the user experience and UI',
            'Expand and organize the video library',
            'Build out the built-in Chinese dictionary with contextual lookups',
        ],
    },
    {
        step: 2,
        title: 'Medium-term Goals',
        description: [
            'Add a login system for personalized features',
            'Support saved words and viewing history',
            'Introduce basic learning tools like review tracking and tagging',
        ],
    },
    {
        step: 3,
        title: 'Long-term Goals',
        description: [
            'Develop native mobile apps for iOS and Android',
            'Explore social or community-driven features',
            'Add deeper learning tools such as custom playlists or study plans',
        ],
    },
];
</script>

<template>
    <TextPageLayout :breadcrumbs="breadcrumbs">
        <div class="bg-background flex flex-col items-center px-6 py-10 md:py-16">
            <!-- Section Title -->
            <div class="mb-10 max-w-2xl text-center">
                <h1 class="text-3xl font-semibold tracking-tight">Roadmap</h1>
                <p class="text-muted-foreground mt-2 text-base">
                    Here's what's planned for ZiTube over the coming months and beyond.
                </p>
            </div>

            <!-- Roadmap Items -->
            <div class="w-full max-w-xl space-y-10">
                <div v-for="step in steps" :key="step.step" class="space-y-3">
                    <h2 class="text-primary text-xl font-semibold">
                        {{ step.title }}
                    </h2>
                    <ul class="text-muted-foreground list-inside list-disc space-y-1 text-sm leading-relaxed">
                        <li v-for="(item, index) in step.description" :key="index">
                            {{ item }}
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </TextPageLayout>
</template>

<!--

-->
