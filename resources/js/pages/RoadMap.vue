<script setup lang=ts>
import DefaultPageLayout from '@/layouts/DefaultPageLayout.vue';
import { BreadcrumbItemType } from '@/types';

const breadcrumbs: BreadcrumbItemType[] = [
    {
        title: 'Home',
        href: '/'
    },
    {
        title: 'Road Map',
        href: '/roadmap'
    },
]

</script>

<template>
    <DefaultPageLayout :breadcrumbs="breadcrumbs">

    </DefaultPageLayout>
</template>

<style scoped>
</style>

<!--
    View for the roadmap page that outlines the roadmap for the site
-->
