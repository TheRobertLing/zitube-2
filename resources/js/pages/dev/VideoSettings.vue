<script setup lang="ts">
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Label from '@/components/ui/label/Label.vue';
import Separator from '@/components/ui/separator/Separator.vue';
import Switch from '@/components/ui/switch/Switch.vue';
import { useAutoScroller } from '@/composables/useAutoScroller';
import { useTraditional } from '@/composables/useTraditional';
import { VideoTabDetails } from '@/types';

defineProps<{
    videoTabDetails: VideoTabDetails;
}>();

const { showTraditional } = useTraditional();
const { autoscrollerEnabled } = useAutoScroller();
</script>

<template>
    <Card class="flex h-full flex-1 flex-col">
        <CardHeader>
            <CardTitle>{{ videoTabDetails.cardTitle }}</CardTitle>
            <CardDescription>{{ videoTabDetails.cardDescription }}</CardDescription>
            <Separator />
        </CardHeader>

        <CardContent class="flex flex-1 flex-col space-y-4 overflow-y-auto scroll-smooth">
            <div class="flex items-center space-x-4">
                <Switch v-model="showTraditional" class="cursor-pointer" />
                <Label>Display traditional chinese</Label>
            </div>
            <div class="flex items-center space-x-4">
                <Switch v-model="autoscrollerEnabled" class="cursor-pointer" />
                <Label>Toggle transcript autoscroller</Label>
            </div>
        </CardContent>
    </Card>
</template>

<style scoped></style>
