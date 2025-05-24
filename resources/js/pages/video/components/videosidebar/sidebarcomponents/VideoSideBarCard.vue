<script setup lang="ts">
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { VideoTabDetails } from '@/types';
import { defineProps, useAttrs, defineOptions } from 'vue';

defineOptions({ inheritAttrs: false });

const props = defineProps<{
  videoTabDetails: VideoTabDetails;
  height: number;
}>();

const attrs = useAttrs();
</script>

<template>
  <Card class="flex h-full flex-1 flex-col gap-2">
    <CardHeader class="gutter" v-if="props.height > 350">
      <CardTitle>{{ props.videoTabDetails.cardTitle }}</CardTitle>
      <CardDescription>{{ props.videoTabDetails.cardDescription }}</CardDescription>
      <Separator />
    </CardHeader>

    <CardContent
      v-bind="attrs"
      class="gutter flex flex-1 flex-col overflow-y-auto scroll-smooth"
    >
      <slot />
    </CardContent>
  </Card>
</template>
