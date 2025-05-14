<script setup lang="ts">
import Button from '@/components/ui/button/Button.vue';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { VideoTabDetails } from '@/types';

defineProps<{
    dictionaryTabDetails: VideoTabDetails;
}>();
</script>

<template>
    <Card>
        <CardHeader>
            <CardTitle>{{ dictionaryTabDetails.cardTitle }}</CardTitle>
            <CardDescription> {{ dictionaryTabDetails.cardDescription }}</CardDescription>
        </CardHeader>
        <CardContent class="space-y-4">
            <div class="flex gap-2">
                <Input placeholder="Enter a word or phrase" class="flex-1" />
                <Button>Search</Button>
            </div>
            <div v-if="false" class="space-y-2">hello i am under the water</div>
            <div v-else class="text-muted-foreground text-sm italic">No results yet.</div>
        </CardContent>
    </Card>
</template>

<style scoped></style>

<!--

-->
