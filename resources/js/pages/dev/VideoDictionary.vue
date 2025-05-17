<script setup lang="ts">
import Button from '@/components/ui/button/Button.vue';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import Separator from '@/components/ui/separator/Separator.vue';
import { DictionaryEntry, VideoTabDetails } from '@/types';
import { numberToDiacritic } from 'pinyin-tools';
import { ref } from 'vue';

defineProps<{
    videoTabDetails: VideoTabDetails;
}>();

const searchQuery = ref<string>('');
const searchResults = ref<DictionaryEntry[]>([]);
const state = ref<'initial' | 'loading' | 'results'>('initial');
const error = ref<string | null>(null);

const search = async () => {
    const query = searchQuery.value?.trim();

    if (!query) return;

    state.value = 'loading';

    error.value = null;

    try {
        const params = new URLSearchParams({ query });
        const response = await fetch(`/api/v1/dictionary?${params}`);

        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }

        const json: DictionaryEntry[] = await response.json();
        console.log(json);
        searchResults.value = json;
    } catch (err) {
        console.error(err);
        error.value = 'Failed to fetch dictionary results.';
        searchResults.value = [];
    } finally {
        state.value = 'results';
    }
};
</script>

<template>
    <Card>
        <CardHeader>
            <CardTitle>{{ videoTabDetails.cardTitle }}</CardTitle>
            <CardDescription>{{ videoTabDetails.cardDescription }}</CardDescription>
            <Separator />
        </CardHeader>

        <CardContent class="space-y-6">
            <!-- Search Bar -->
            <div class="flex items-center gap-2">
                <Input
                    id="search"
                    type="search"
                    placeholder="Search for a word or phrase…"
                    v-model="searchQuery"
                    @keydown.enter="search"
                />
                <Button type="submit" class="cursor-pointer" @click="search"> Search </Button>
            </div>

            <div class="text-muted-foreground text-xs">
                <strong class="tracking-wide uppercase">Search Tips:</strong> By default, your query matches
                <em>simplified Chinese</em> characters. Use the following prefixes to narrow your search:
                <ul class="mt-1 ml-5 list-disc space-y-1">
                    <li>
                        <code>p:</code> — search by <strong>pinyin</strong> (use tone numbers and <code>u:</code> for ü,
                        e.g. <code>p:nu:3</code>)
                    </li>
                    <li><code>s:</code> — search by <strong>simplified</strong> Chinese (e.g. <code>s:爱</code>)</li>
                    <li><code>t:</code> — search by <strong>traditional</strong> Chinese (e.g. <code>t:愛</code>)</li>
                </ul>
            </div>

            <!-- Initial state -->
            <div v-if="state === 'initial'" class="text-muted-foreground text-sm">
                Try searching for a Chinese word or phrase.
            </div>

            <div v-if="state === 'loading'" class="text-muted-foreground text-sm">Loading…</div>

            <div v-if="state === 'results'" class="space-y-4">
                <!-- No results -->
                <div v-if="searchResults.length === 0" class="text-muted-foreground text-sm italic">
                    No results found.
                </div>

                <!-- Results list -->
                <div
                    v-for="(entry, index) in searchResults"
                    :key="index"
                    class="bg-background rounded-xl border p-4 shadow-sm"
                >
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
                    <div class="text-muted-foreground mt-3 border-t pt-2 text-xs">Source: CC-EDICT</div>
                </div>
            </div>
        </CardContent>
    </Card>
</template>
