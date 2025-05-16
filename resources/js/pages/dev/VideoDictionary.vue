<script setup lang="ts">
import Button from '@/components/ui/button/Button.vue';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import Separator from '@/components/ui/separator/Separator.vue';
import { VideoTabDetails } from '@/types';

defineProps<{
    videoTabDetails: VideoTabDetails;
}>();

const mockResults = [
    {
        traditional: '還',
        simplified: '还',
        pinyin: 'Huan2',
        definitions: ['surname Huan'],
    },
    {
        traditional: '還',
        simplified: '还',
        pinyin: 'hai2',
        definitions: [
            'still',
            'still in progress',
            'still more',
            'yet',
            'even more',
            'in addition',
            'fairly',
            'passably (good)',
            'as early as',
            'even',
            'also',
            'else',
        ],
    },
    {
        traditional: '還',
        simplified: '还',
        pinyin: 'huan2',
        definitions: ['to pay back', 'to return'],
    },
];
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
            <div class="flex items-center gap-3">
                <Input placeholder="Search for a word or phrase…" class="flex-1" />
                <Button>Search</Button>
            </div>

            <!-- Mocked Search Result -->
            <div v-for="(entry, index) in mockResults" :key="index" class="space-y-3 rounded-xl border p-4">
                <!-- Characters & Pinyin -->
                <div>
                    <div class="text-md font-semibold">
                        <span class="text-muted-foreground mr-2 font-normal">Traditional</span>{{ entry.traditional }}
                    </div>
                    <div class="text-md font-semibold">
                        <span class="text-muted-foreground mr-2 font-normal">Simplified</span>{{ entry.simplified }}
                    </div>
                    <div class="text-md font-semibold">
                        <span class="text-muted-foreground mr-2 font-normal">Pinyin</span>{{ entry.pinyin }}
                    </div>
                </div>

                <!-- Definitions -->
                <ul class="ml-4 list-disc text-sm leading-relaxed">
                    <li v-for="(def, defIndex) in entry.definitions" :key="defIndex">
                        {{ def }}
                    </li>
                </ul>

                <!-- Source -->
                <!-- <div class="text-muted-foreground pt-2 text-xs">Source: CC-CEDICT</div> -->
            </div>

            <!-- Empty State (hidden for now since we're mocking a result) -->
            <!--
            <div class="text-muted-foreground text-sm italic">
                No results yet. Try searching for a Chinese word.
            </div>
            -->
        </CardContent>
    </Card>
</template>
