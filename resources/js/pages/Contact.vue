<script setup lang=ts>
import DefaultPageLayout from '@/layouts/DefaultPageLayout.vue';
import { BreadcrumbItemType } from '@/types';

const breadcrumbs: BreadcrumbItemType[] = [
    {
        title: 'Home',
        href: '/'
    },
    {
        title: 'Contact',
        href: '/contact'
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
    View for the contact page with a contact form to ask question and stuff
-->
