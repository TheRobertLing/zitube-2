<script setup lang="ts">
import DefaultFooter from '@/components/DefaultFooter.vue';
import DefaultNavBar from '@/components/DefaultNavBar.vue';
import { useAttrs } from 'vue';

const attrs = useAttrs();
</script>

<template>
    <DefaultNavBar />
    <main v-bind="attrs" class="h-[calc(100vh-3.5em)]">
        <slot></slot>
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
