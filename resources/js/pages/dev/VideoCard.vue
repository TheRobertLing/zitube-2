<script setup lang="ts">
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Card, CardContent } from '@/components/ui/card';
import { Eye, MessageCircle, ThumbsUp } from 'lucide-vue-next';
</script>

<template>
    <Card>
        <CardContent>
            <AspectRatio :ratio="16 / 9">
                <img
                    src="https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&dpr=2&q=80"
                    alt="Video thumbnail"
                    class="h-full w-full rounded object-cover"
                />
                <span
                    class="absolute right-1 bottom-1 rounded bg-black/70 px-1.5 py-0.5 text-xs tracking-wide text-white"
                >
                    3:45
                </span>
            </AspectRatio>

            <div class="space-y-2 pt-3">
                <h2 class="line-clamp-2 text-base leading-snug font-semibold">Learn Chinese with a Drama Clip</h2>

                <!-- Stats Row -->
                <div class="text-muted-foreground flex flex-wrap gap-4 text-sm tracking-wide">
                    <div class="inline-flex items-center gap-1.5">
                        <Eye class="h-4 w-4" />
                        <span>24.5k views</span>
                    </div>

                    <div class="inline-flex items-center gap-1.5">
                        <ThumbsUp class="h-4 w-4" />
                        <span>1.2k likes</span>
                    </div>

                    <div class="inline-flex items-center gap-1.5">
                        <MessageCircle class="h-4 w-4" />
                        <span>320 comments</span>
                    </div>
                </div>
            </div>
        </CardContent>
    </Card>
</template>

<style scoped></style>

<!--

-->
