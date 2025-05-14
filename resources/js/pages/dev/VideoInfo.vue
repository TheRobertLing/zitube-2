<script setup lang="ts">
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { VideoMetaData, VideoTabDetails } from '@/types';

defineProps<{
    videoTabDetails: VideoTabDetails;
    videoMetaData: VideoMetaData;
}>();
</script>

<template>
    <Card>
        <CardHeader>
            <CardTitle>{{ videoTabDetails.cardTitle }}</CardTitle>
            <CardDescription>{{ videoTabDetails.cardDescription }}</CardDescription>
        </CardHeader>

        <CardContent class="space-y-2">
            <!-- Title -->
            <div>
                <Label class="text-muted-foreground">Title</Label>
                <p class="text-base font-medium">{{ videoMetaData.title }}</p>
            </div>

            <!-- Channel -->
            <div>
                <Label class="text-muted-foreground">Channel</Label>
                <p class="text-base">{{ videoMetaData.channel.title }}</p>
            </div>

            <!-- Published Date -->
            <div>
                <Label class="text-muted-foreground">Published</Label>
                <p class="text-base">
                    {{ new Date(videoMetaData.publishedAt).toLocaleDateString() }}
                </p>
            </div>

            <!-- Views / Likes / Comments -->
            <div class="text-muted-foreground flex gap-4 text-sm">
                <div>
                    <span class="font-medium">{{ videoMetaData.stats.views.toLocaleString() }}</span>
                    views
                </div>
                <div>
                    <span class="font-medium">{{ videoMetaData.stats.likes.toLocaleString() }}</span>
                    likes
                </div>
                <div>
                    <span class="font-medium">{{ videoMetaData.stats.comments.toLocaleString() }}</span>
                    comments
                </div>
            </div>

            <!-- Category -->
            <div>
                <Label class="text-muted-foreground">Category ID</Label>
                <p class="text-base">{{ videoMetaData.categoryId }}</p>
            </div>

            <!-- Original YouTube Link -->
            <div>
                <Label class="text-muted-foreground">Source</Label>
                <a
                    :href="`https://www.youtube.com/watch?v=${videoMetaData.id}`"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="hover:underline"
                >
                    View on YouTube
                </a>
            </div>
        </CardContent>
    </Card>
</template>

<style scoped></style>

<!--
    Information for video metadata
-->
