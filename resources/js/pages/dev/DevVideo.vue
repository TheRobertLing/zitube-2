<script setup lang="ts">
import Button from '@/components/ui/button/Button.vue';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import DefaultPageLayout from '@/layouts/DefaultPageLayout.vue';
import { BreadcrumbItemType } from '@/types';
import { usePlayer } from '@vue-youtube/core';
import { useMediaQuery } from '@vueuse/core';
import { computed, ref, watch } from 'vue';
import { transcript } from './testtranscript';

const breadcrumbs: BreadcrumbItemType[] = [
    { title: 'Home', href: '/' },
    { title: 'Video', href: '/dev/video' },
];

const youtube = ref();
const num = ref(0);
const isMobile = useMediaQuery('(max-width: 1024px)');
const youtubeIframe = ref<HTMLIFrameElement | null>(null);

const panelOneSize = ref<number>(65);
const panelTwoSize = ref<number>(35);

const { onReady, instance } = usePlayer('MbEXK7sKqCk', youtube);

// onReady and watch both used to ensure video frame is resizeable
onReady((event) => {
    const iframe = event.target.getIframe();
    youtubeIframe.value = iframe;

    iframe.removeAttribute('width');
    iframe.removeAttribute('height');
    iframe.classList.add('aspect-video');
    iframe.classList.add(isMobile.value ? 'h-full' : 'w-full');
});

watch(isMobile, (mobile) => {
    if (!youtubeIframe.value) {
        return;
    }
    youtubeIframe.value.classList.remove('w-full', 'h-full');
    youtubeIframe.value.classList.add(mobile ? 'h-full' : 'w-full');
});

// To make the resizer responsive
const direction = computed(() => (isMobile.value ? 'vertical' : 'horizontal'));

// Testing
</script>

<template>
    <DefaultPageLayout :breadcrumbs="breadcrumbs">
        <ResizablePanelGroup
            id="demo-group-1"
            :direction="direction"
            class="min-h-[calc(100vh-7em)] w-full rounded-lg border"
        >
            <ResizablePanel id="demo-panel-1" :default-size="panelOneSize">
                <div class="flex h-full items-center justify-center p-4">
                    <div ref="youtube"></div>
                </div>
            </ResizablePanel>

            <ResizableHandle id="demo-handle-1" with-handle />

            <ResizablePanel id="demo-panel-2" :default-size="panelTwoSize">
                <ResizablePanelGroup id="demo-group-2" direction="vertical">
                    <ResizablePanel id="demo-panel-3" :default-size="75">
                        <div class="gutter flex h-full items-center justify-center overflow-y-auto p-4">
                            <Tabs default-value="transcript" class="h-full w-full">
                                <TabsList class="grid w-full grid-cols-2">
                                    <TabsTrigger value="transcript" class="cursor-pointer"> Transcript </TabsTrigger>
                                    <TabsTrigger value="settings" class="cursor-pointer"> Settings </TabsTrigger>
                                </TabsList>

                                <TabsContent value="transcript">
                                    <Card>
                                        <CardHeader>
                                            <CardTitle>Transcript</CardTitle>
                                            <CardDescription>
                                                View and interact with the transcript of the video here.
                                            </CardDescription>
                                        </CardHeader>
                                        <CardContent class="space-y-2">
                                            <!-- Placeholder transcript content -->
                                            <table class="w-full table-fixed text-left text-base">
                                                <tbody>
                                                    <template v-for="(line, index) in transcript" :key="index">
                                                        <tr>
                                                            <!-- Timestamp column -->
                                                            <td
                                                                rowspan="2"
                                                                colspan="2"
                                                                class="text-muted-foreground pr-4 break-all"
                                                            >
                                                                {{ line.startTime }}
                                                            </td>

                                                            <!-- Chinese with ruby -->
                                                            <td colspan="8">
                                                                <span
                                                                    v-for="(token, idx) in line.tokenizedChinese"
                                                                    :key="idx"
                                                                    class="group inline-block cursor-pointer rounded px-1 transition hover:text-green-300"
                                                                >
                                                                    <ruby>
                                                                        <!-- <template
                                                                            v-for="(char, i) in token.hanzi"
                                                                            :key="i"
                                                                        >
                                                                            <rb>{{ char }}</rb>
                                                                            <rt>{{ token.pinyin[i] || '' }}</rt>
                                                                        </template> -->
                                                                        <rb>{{
                                                                            token.hanzi.join('') || 'this failed'
                                                                        }}</rb>
                                                                        <rt>{{
                                                                            token.pinyin.join('') || 'this failed'
                                                                        }}</rt>
                                                                    </ruby>
                                                                </span>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <!-- English translation -->
                                                            <td colspan="8" class="text-muted-foreground text-sm">
                                                                {{ line.english }}
                                                            </td>
                                                        </tr>
                                                        <br />
                                                    </template>
                                                </tbody>
                                            </table>
                                        </CardContent>
                                    </Card>
                                </TabsContent>

                                <TabsContent value="settings">
                                    <Card>
                                        <CardHeader>
                                            <CardTitle>Settings</CardTitle>
                                            <CardDescription> Adjust your preferences here. </CardDescription>
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
                                </TabsContent>
                            </Tabs>
                        </div>
                    </ResizablePanel>
                    <ResizableHandle id="demo-handle-2" with-handle />
                    <ResizablePanel id="demo-panel-4" :default-size="25">
                        <div class="flex h-full items-center justify-center p-6">
                            <span class="font-semibold">Three</span>
                        </div>
                    </ResizablePanel>
                </ResizablePanelGroup>
            </ResizablePanel>
        </ResizablePanelGroup>

        <!-- Testing stuff -->
        <Button @click="num = instance?.getCurrentTime() as number">Hi</Button>
        <Button @click="instance?.seekTo(3.47, true)">Another button 3.47</Button>
        <Button @click="instance?.seekTo(3, true)">Another button 3s</Button>
        <div>{{ num }}</div>
    </DefaultPageLayout>
</template>

<style scoped>
.gutter {
    scrollbar-gutter: stable;
}
</style>

<!--
  Hardcoded Dev view for the video page
-->
