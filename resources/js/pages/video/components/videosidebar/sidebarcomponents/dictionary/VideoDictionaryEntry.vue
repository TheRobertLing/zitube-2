<script setup lang="ts">
import { Separator } from '@/components/ui/separator';
import { DictionaryEntry } from '@/types';
import { numberToDiacritic } from 'pinyin-tools';

defineProps<{
    entry: DictionaryEntry;
}>();
</script>

<template>
    <div class="bg-background rounded-xl border p-4 shadow-sm">
        <!-- Characters & Pronunciation -->
        <div class="grid gap-1 text-sm">
            <div class="flex gap-2">
                <span class="text-muted-foreground w-20 text-xs tracking-wide uppercase">Traditional:</span>
                <span class="ml-1.5 text-xs tracking-wide uppercase">{{ entry.traditional }}</span>
            </div>
            <div class="flex gap-2">
                <span class="text-muted-foreground w-20 text-xs tracking-wide uppercase">Simplified:</span>
                <span class="ml-1.5 text-xs tracking-wide uppercase">{{ entry.simplified }}</span>
            </div>
            <div class="flex gap-2">
                <span class="text-muted-foreground w-20 text-xs tracking-wide uppercase">Pinyin:</span>
                <span class="ml-1.5 text-xs tracking-wide uppercase"
                    >{{ entry.pinyin }} / {{ numberToDiacritic(entry.pinyin.split(' ')).join(' ') }}</span
                >
            </div>
        </div>

        <Separator class="my-2" />

        <!-- Definitions -->
        <div>
            <h4 class="text-muted-foreground mb-1 text-xs tracking-wide uppercase">Definitions</h4>
            <ol class="ml-5 list-disc space-y-1 text-sm leading-relaxed">
                <li v-for="(def, defIndex) in JSON.parse(entry.definitions)" :key="defIndex">
                    {{ def }}
                </li>
            </ol>
        </div>

        <!-- Source -->
        <div class="text-muted-foreground mt-3 border-t pt-2 text-xs">Source: {{ entry.source }}</div>
    </div>
</template>
