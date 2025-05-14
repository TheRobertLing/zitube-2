<script setup lang="ts">
import Button from '@/components/ui/button/Button.vue';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import CardFooter from '@/components/ui/card/CardFooter.vue';
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
        <CardContent class="space-y-2">
            <div class="space-y-1">
                <Label for="theme">Theme</Label>
                <Input id="theme" placeholder="e.g., Light or Dark" />
            </div>
            <div class="space-y-1">
                <Label for="language">Language</Label>
                <Input id="language" placeholder="e.g., English, 中文" />
            </div>
        </CardContent>
        <CardFooter>
            <Button>Save settings</Button>
        </CardFooter>
    </Card>
</template>

<style scoped></style>

<!--

-->
