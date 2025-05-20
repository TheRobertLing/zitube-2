<script setup lang="ts">
import DefaultNavBar from '@/components/DefaultNavBar.vue';
import type { BreadcrumbItemType } from '@/types';

interface Props {
    breadcrumbs?: BreadcrumbItemType[];
}

withDefaults(defineProps<Props>(), {
    breadcrumbs: () => [],
});
</script>

<template>
    <div>
      <DefaultNavBar :breadcrumbs="breadcrumbs" />

      <main class="px-4 sm:px-6 lg:px-8 py-10">
        <slot />
      </main>
    </div>
  </template>


<!--
    Page layout for text based pages.
-->
