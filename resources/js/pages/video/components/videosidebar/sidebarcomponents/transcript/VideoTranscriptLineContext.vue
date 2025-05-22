<script setup lang="ts">
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { BookOpen } from 'lucide-vue-next';
import { ref, watch } from 'vue';

const props = defineProps<{
    context: string | undefined;
    width: number;
}>();

const popoverWidth = ref<string>('');

watch(
    () => props.width,
    () => {
        popoverWidth.value = `${Math.floor(props.width - 80 - window.innerWidth + document.documentElement.clientWidth)}px`;
    },
);
</script>

<template>
    <template v-if="context">
        <Popover>
            <PopoverTrigger as-child>
                <Button
                    class="text-muted-foreground flex h-8 w-8 cursor-pointer items-center justify-center rounded-full transition hover:text-white"
                    variant="ghost"
                    @click.stop
                >
                    <BookOpen class="h-4 w-4" />
                </Button>
            </PopoverTrigger>

            <PopoverContent side="bottom" align="end" :alignOffset="-32" :style="{ width: popoverWidth }">
                <div v-html="context" class="text-xs tracking-wide"></div>
            </PopoverContent>
        </Popover>
    </template>

    <template v-else>
        <!-- Layout placeholder to preserve spacing -->

        <Button
            class="text-muted-foreground flex h-8 w-8 cursor-pointer items-center justify-center rounded-full transition hover:text-white"
            variant="ghost"
            disabled
        >
            <BookOpen class="h-4 w-4" />
        </Button>
    </template>
</template>

<style scoped></style>

<!--
    Note: click.stop stops the click even from reaching the line and changing the line
-->
