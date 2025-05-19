<script setup lang="ts">
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { TranscriptSegment } from '@/types';
import { Clipboard, EllipsisVertical } from 'lucide-vue-next';
import { toast, Toaster } from 'vue-sonner';

const props = defineProps<{
    line: TranscriptSegment;
}>();

const copyLine = () => {
    const content = props.line.tokenizedChinese.map((token) => token.hanzi.join('')).join('');
    navigator.clipboard.writeText(content);
    toast.success('Copied');
};
</script>

<template>
    <Toaster richColors />
    <DropdownMenu>
        <DropdownMenuTrigger as-child>
            <Button
                variant="ghost"
                class="text-muted-foreground flex h-8 w-8 cursor-pointer items-center justify-center rounded-full hover:text-white"
                @click.stop
            >
                <EllipsisVertical class="h-4 w-4" />
            </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent class="w-40 text-sm">
            <DropdownMenuItem @click="copyLine" class="cursor-pointer"> <Clipboard /> Copy Line </DropdownMenuItem>
        </DropdownMenuContent>
    </DropdownMenu>
</template>

<style scoped></style>

<!--
    vertical dots icon for transcript
-->
