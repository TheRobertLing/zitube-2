<script setup lang="ts">
import Label from '@/components/ui/label/Label.vue';
import Switch from '@/components/ui/switch/Switch.vue';
import { useAutoScroller } from '@/composables/useAutoScroller';
import { useTraditional } from '@/composables/useTraditional';
import { VideoTabDetails } from '@/types';
import VideoSideBarCard from '../VideoSideBarCard.vue';

defineProps<{
    videoTabDetails: VideoTabDetails;
    height: number;
}>();

const { showTraditional } = useTraditional();
const { autoscrollerEnabled } = useAutoScroller();
</script>

<template>
    <VideoSideBarCard :video-tab-details="videoTabDetails" :height="height" class="space-y-4">
        <div class="flex items-center space-x-4">
            <Switch class="cursor-pointer" v-model="showTraditional" />
            <Label>Display traditional chinese</Label>
        </div>
        <div class="flex items-center space-x-4">
            <Switch class="cursor-pointer" v-model="autoscrollerEnabled" />
            <Label>Toggle transcript autoscroller</Label>
        </div>
    </VideoSideBarCard>
</template>
