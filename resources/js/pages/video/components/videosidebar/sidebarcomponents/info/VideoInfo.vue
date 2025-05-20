<script setup lang="ts">
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Separator from '@/components/ui/separator/Separator.vue';
import { VideoMetaData, VideoTabDetails } from '@/types';
import { Eye, MessageCircle, ThumbsUp } from 'lucide-vue-next';

defineProps<{
    videoTabDetails: VideoTabDetails;
    videoMetaData: VideoMetaData;
}>();
</script>

<template>
    <Card class="flex h-full flex-1 flex-col">
        <CardHeader>
            <CardTitle>{{ videoTabDetails.cardTitle }}</CardTitle>
            <CardDescription>{{ videoTabDetails.cardDescription }}</CardDescription>
            <Separator />
        </CardHeader>

        <CardContent class="flex flex-1 flex-col space-y-4 overflow-y-auto scroll-smooth text-sm">
            <!-- Original Video -->
            <div>
                <h4 class="text-muted-foreground text-xs tracking-wide uppercase">Watch Original Video</h4>
                <a
                    class="mt-1 inline-flex items-center gap-1 text-sm"
                    target="_blank"
                    rel="noopener noreferrer"
                    :href="`https://www.youtube.com/watch?v=${videoMetaData.id}`"
                >
                    <svg
                        class="h-4 w-4"
                        xmlns="http://www.w3.org/2000/svg"
                        role="img"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                    >
                        <title>YouTube</title>
                        <path
                            d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"
                        />
                    </svg>
                    <span class="text-sm hover:text-green-500 hover:underline"> YouTube Link </span>
                </a>
            </div>

            <!-- Title -->
            <div>
                <h4 class="text-muted-foreground text-xs tracking-wide uppercase">Video Title</h4>
                <p class="text-md leading-snug font-semibold">
                    {{ videoMetaData.title }}
                </p>
            </div>

            <!-- Channel -->
            <div>
                <h4 class="text-muted-foreground text-xs tracking-wide uppercase">Channel</h4>
                <p class="font-medium">{{ videoMetaData.channel.title }}</p>
            </div>

            <!-- Published At -->
            <div>
                <h4 class="text-muted-foreground text-xs tracking-wide uppercase">Publish Date</h4>
                <p>{{ new Date(videoMetaData.publishedAt).toLocaleDateString() }}</p>
            </div>

            <!-- Category -->
            <div>
                <h4 class="text-muted-foreground text-xs tracking-wide uppercase">Category ID</h4>
                <p>{{ videoMetaData.categoryId }}</p>
            </div>

            <!-- Stats -->
            <div class="text-muted-foreground flex flex-wrap gap-4">
                <!-- Views -->
                <div class="inline-flex items-center gap-1.5">
                    <Eye class="h-4 w-4" />
                    <span class="font-medium">{{ videoMetaData.stats.views.toLocaleString() }}</span> views
                </div>

                <!-- Likes -->
                <div class="inline-flex items-center gap-1.5">
                    <ThumbsUp class="h-4 w-4" />
                    <span class="font-medium">{{ videoMetaData.stats.likes.toLocaleString() }}</span> likes
                </div>

                <!-- Comments -->
                <div class="inline-flex items-center gap-1.5">
                    <MessageCircle class="h-4 w-4" />
                    <span class="font-medium">{{ videoMetaData.stats.comments.toLocaleString() }}</span> comments
                </div>
            </div>

            <!-- Description -->
            <div>
                <h4 class="text-muted-foreground mb-1 text-xs tracking-wide uppercase">Description</h4>
                <p class="leading-relaxed whitespace-pre-wrap">{{ videoMetaData.description || 'No description.' }}</p>
            </div>
        </CardContent>
    </Card>
</template>
