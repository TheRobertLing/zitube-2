<script setup lang="ts">
import Separator from '@/components/ui/separator/Separator.vue';
import DefaultPageLayout from '@/layouts/DefaultPageLayout.vue';
import { BreadcrumbItemType } from '@/types';
import VideoCard from './VideoCard.vue';

const breadcrumbs: BreadcrumbItemType[] = [{ title: 'Home', href: '/' }];
</script>

<template>
    <DefaultPageLayout :breadcrumbs="breadcrumbs">
        <div class="p-4">
            <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                <template v-for="i in 7" :key="i">
                    <VideoCard></VideoCard>
                </template>
            </div>
            <br>
            <Separator :label="'End of Feed'" />
        </div>
    </DefaultPageLayout>
</template>
