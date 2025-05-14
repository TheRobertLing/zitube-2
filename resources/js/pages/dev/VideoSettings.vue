<script setup lang="ts">
import Button from '@/components/ui/button/Button.vue';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { VideoTabDetails } from '@/types';

defineProps<{
    videoTabDetails: VideoTabDetails;
}>();
</script>

<template>
    <Card>
        <CardHeader>
            <CardTitle>{{ videoTabDetails.cardTitle }}</CardTitle>
            <CardDescription>{{ videoTabDetails.cardDescription }}</CardDescription>
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
