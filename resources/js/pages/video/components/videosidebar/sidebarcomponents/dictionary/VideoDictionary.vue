<script setup lang="ts">
import Button from '@/components/ui/button/Button.vue';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { useDictionarySearch } from '@/composables/useDictionarySearch';
import { VideoTabDetails } from '@/types';
import { defineProps } from 'vue';
import VideoDictionaryEntry from './VideoDictionaryEntry.vue';

defineProps<{
    videoTabDetails: VideoTabDetails;
}>();

const { searchQuery, searchResults, state, search } = useDictionarySearch();
</script>

<template>
    <Card class="flex h-full flex-1 flex-col gap-1">
        <CardHeader>
            <CardTitle>{{ videoTabDetails.cardTitle }}</CardTitle>
            <CardDescription>{{ videoTabDetails.cardDescription }}</CardDescription>
            <Separator />
            <div class="text-muted-foreground flex items-center gap-3 text-[10px]">
                <Dialog>
                    <DialogTrigger as-child>
                        <span class="cursor-pointer transition hover:text-green-500 hover:underline">
                            Usage Instructions
                        </span>
                    </DialogTrigger>
                    <DialogContent class="sm:max-w-md">
                        <DialogHeader>
                            <DialogTitle>Dictionary Search Guide</DialogTitle>
                            <DialogDescription>
                                Learn how to use the built-in Chinese dictionary effectively.
                            </DialogDescription>
                            <Separator />
                        </DialogHeader>

                        <div class="text-muted-foreground space-y-4 text-sm">
                            <p>
                                You can look up words by typing either <strong>Simplified</strong> or
                                <strong>Traditional</strong> Chinese characters.
                            </p>

                            <ul class="list-disc space-y-2 pl-5">
                                <li>The search matches exact word entries — partial matches may not return results.</li>
                                <li>
                                    Pinyin search is currently <strong>not supported</strong>. This will be added in a
                                    future update.
                                </li>
                                <li>
                                    Try common or complete words first (e.g., <code>人</code>, <code>喜欢</code>,
                                    <code>愛</code>) rather than fragments.
                                </li>
                            </ul>

                            <p class="text-muted-foreground text-xs">
                                Example: Searching for <code>爱</code> will return definitions related to "love",
                                including compound words and expressions where it's used.
                            </p>
                        </div>
                    </DialogContent>
                </Dialog>
            </div>
        </CardHeader>

        <CardContent class="flex flex-1 flex-col space-y-4 overflow-y-auto scroll-smooth">
            <div class="flex items-center gap-2">
                <Input
                    class=""
                    id="search"
                    type="search"
                    placeholder="Search for a word or phrase…"
                    v-model="searchQuery"
                    @keydown.enter="search"
                />
                <Button class="cursor-pointer" type="submit" @click="search"> Search </Button>
            </div>

            <div v-if="state === 'initial'" class="text-muted-foreground text-sm">
                Try searching for a Chinese word or phrase.
            </div>

            <div v-if="state === 'loading'" class="text-muted-foreground text-sm">Loading…</div>

            <div v-if="state === 'results'" class="space-y-4">
                <div v-if="searchResults.length === 0" class="text-muted-foreground text-sm italic">
                    No results found.
                </div>

                <template v-for="(entry, index) in searchResults" :key="index">
                    <VideoDictionaryEntry :entry="entry" />
                </template>
            </div>
        </CardContent>
    </Card>
</template>
