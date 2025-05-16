<script setup lang="ts">
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Separator from '@/components/ui/separator/Separator.vue';
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
            <Separator />
        </CardHeader>

        <CardContent class="space-y-6 text-sm">
            <!-- Original Video -->
            <div>
                <h4 class="text-muted-foreground text-xs tracking-wide uppercase">Watch Original Video</h4>
                <a
                    :href="`https://www.youtube.com/watch?v=${videoMetaData.id}`"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="mt-1 inline-flex items-center gap-1 text-sm hover:underline"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        role="img"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        class="h-4 w-4"
                    >
                        <title>YouTube</title>
                        <path
                            d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"
                        />
                    </svg>
                    YouTube Link
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
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        class="h-4 w-4"
                    >
                        <path
                            d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0"
                        />
                        <circle cx="12" cy="12" r="3" />
                    </svg>
                    <span class="font-medium">{{ videoMetaData.stats.views.toLocaleString() }}</span> views
                </div>

                <!-- Likes -->
                <div class="inline-flex items-center gap-1.5">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        class="h-4 w-4"
                    >
                        <path d="M7 10v12" />
                        <path
                            d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2a3.13 3.13 0 0 1 3 3.88Z"
                        />
                    </svg>
                    <span class="font-medium">{{ videoMetaData.stats.likes.toLocaleString() }}</span> likes
                </div>

                <!-- Comments -->
                <div class="inline-flex items-center gap-1.5">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        class="h-4 w-4"
                    >
                        <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
                    </svg>
                    <span class="font-medium">{{ videoMetaData.stats.comments.toLocaleString() }}</span> comments
                </div>
            </div>

            <!-- Description -->
            <div>
                <h4 class="text-muted-foreground mb-1 text-xs tracking-wide uppercase">Description</h4>
                <p class="leading-relaxed whitespace-pre-wrap">{{ videoMetaData.description || 'No description.'}}</p>
            </div>
        </CardContent>
    </Card>
</template>
