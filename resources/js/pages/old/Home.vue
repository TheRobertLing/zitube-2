<script setup lang=ts>
import DefaultPageLayout from '@/layouts/DefaultPageLayout.vue';
import { BreadcrumbItemType } from '@/types';

const breadcrumbs: BreadcrumbItemType[] = [
    {
        title: 'Home',
        href: '/'
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
    View for the homepage where the site is introduced
-->
