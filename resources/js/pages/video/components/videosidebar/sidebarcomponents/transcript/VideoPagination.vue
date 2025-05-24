<script setup lang="ts">
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { TranscriptSegment } from '@/types';
import { ChevronLeft, ChevronRight } from 'lucide-vue-next';
import { ref } from 'vue';

defineProps<{
    videoTranscriptData: TranscriptSegment[];
}>();

const modelValue = ref<number[]>([0]); // 0-indexed // MAKE SURE TO DO MINUS ONE FROM THE VIDEO TRANSCRIPT DATA WHEN REFACOTIRNG CLICK FORWARD

const clickBack = (): void => {
    if (modelValue.value[0] > 0) {
        modelValue.value[0]--;
    }
};

// REPLACE 9 WITH videoTranscriptData.length / # of lines per page in a second. MAKE SURE TO DO A MINUS ONE SOMEWHERE BECAUSE OF 0 INDEXING
const clickForward = (): void => {
    if (modelValue.value[0] < 9) {
        modelValue.value[0]++;
    }
};
</script>

<template>
    <div class="flex flex-1 flex-col border border-green-500">
        <!-- Transcript area -->
        <div class="flex-1 overflow-y-scroll border border-red-500">
            {{ modelValue[0] }}
        </div>

        <!-- Controls -->
        <div class="flex items-center gap-2 border border-purple-500 p-2">
            <Button
                variant="outline"
                size="icon"
                class="cursor-pointer"
                @click="clickBack"
                :disabled="modelValue[0] === 0"
            >
                <ChevronLeft class="h-4 w-4" />
            </Button>

            <!-- Center: Page + Slider -->
            <div class="custom-slider flex-1">
                <Slider v-model="modelValue" :max="9" :step="1" />
            </div>

            <Button
                variant="outline"
                size="icon"
                class="cursor-pointer"
                @click="clickForward"
                :disabled="modelValue[0] === 9"
            >
                <ChevronRight class="h-4 w-4" />
            </Button>
        </div>
    </div>
</template>

<style scoped></style>

<!--
    Component that encapsulations pagination logic
-->
