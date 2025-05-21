<script setup lang="ts">
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Lightbulb } from 'lucide-vue-next';
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
        <TooltipProvider>
            <Tooltip>
                <Popover>
                    <TooltipTrigger as-child>
                        <PopoverTrigger as-child>
                            <Button
                                class="text-muted-foreground flex h-8 w-8 cursor-pointer items-center justify-center rounded-full transition hover:text-white"
                                variant="ghost"
                                @click.stop
                            >
                                <Lightbulb class="h-4 w-4" />
                            </Button>
                        </PopoverTrigger>
                    </TooltipTrigger>

                    <TooltipContent side="left">
                        <p>See Explanation</p>
                    </TooltipContent>

                    <PopoverContent side="bottom" align="end" :alignOffset="-32" :style="{ width: popoverWidth }">
                        <div v-html="context" class="text-xs tracking-wide"></div>
                    </PopoverContent>
                </Popover>
            </Tooltip>
        </TooltipProvider>
    </template>

    <template v-else>
        <!-- Layout placeholder to preserve spacing -->

        <Button
            class="text-muted-foreground flex h-8 w-8 cursor-pointer items-center justify-center rounded-full transition hover:text-white"
            variant="ghost"
            disabled
        >
            <Lightbulb class="h-4 w-4" />
        </Button>
    </template>
</template>

<style scoped></style>

<!--
    Note: click.stop stops the click even from reaching the line and changing the line
-->
