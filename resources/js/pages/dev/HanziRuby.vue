<script setup lang="ts">
import { useDictionarySearch } from '@/composables/useDictionarySearch';
import { useTraditional } from '@/composables/useTraditional';
import { tify } from 'chinese-conv';

defineProps<{
    hanzi: string[];
    pinyin: string[];
}>();

const { showTraditional } = useTraditional();
const { triggerDictionarySearch } = useDictionarySearch();
</script>

<template>
    <span
        class="inline-block cursor-pointer px-1 transition hover:text-green-400"
        @click.stop="triggerDictionarySearch(showTraditional ? tify(hanzi.join('')) : hanzi.join(''))"
    >
        <ruby>
            <template v-for="(char, i) in hanzi.map((c, i) => [c, pinyin[i] || ''])" :key="i">
                <rb class="tracking-wider">{{ showTraditional ? tify(char[0]) : char[0] }}</rb>
                <rt class="text-muted-foreground text-[10px]">{{ char[1] }}</rt>
            </template>
        </ruby>
    </span>
</template>
