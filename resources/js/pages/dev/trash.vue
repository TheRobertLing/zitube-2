<script setup lang=ts>
</script>

<template>
<div class="gutter flex h-full items-center justify-center overflow-y-auto p-4">
                            <Tabs default-value="Transcript" class="h-full w-full">
                                <TabsList class="grid w-full grid-cols-3">
                                    <TabsTrigger value="Info" class="cursor-pointer"> Info </TabsTrigger>
                                    <TabsTrigger value="Transcript" class="cursor-pointer"> Transcript </TabsTrigger>
                                    <TabsTrigger value="Settings" class="cursor-pointer"> Settings </TabsTrigger>
                                </TabsList>

                                <TabsContent value="Info">
                                    <Card>
                                        <CardHeader>
                                            <CardTitle>Video Info</CardTitle>
                                            <CardDescription>Basic metadata for this video.</CardDescription>
                                        </CardHeader>

                                        <CardContent class="space-y-4">
                                            <!-- Title -->
                                            <div>
                                                <Label class="text-muted-foreground">Title</Label>
                                                <p class="text-base font-medium">{{ videoData.title }}</p>
                                            </div>

                                            <!-- Channel -->
                                            <div>
                                                <Label class="text-muted-foreground">Channel</Label>
                                                <p class="text-base">{{ videoData.channel.title }}</p>
                                            </div>

                                            <!-- Published Date -->
                                            <div>
                                                <Label class="text-muted-foreground">Published</Label>
                                                <p class="text-base">
                                                    {{ new Date(videoData.publishedAt).toLocaleDateString() }}
                                                </p>
                                            </div>

                                            <!-- Views / Likes / Comments -->
                                            <div class="text-muted-foreground flex gap-4 text-sm">
                                                <div>
                                                    <span class="font-medium">{{
                                                        videoData.stats.views.toLocaleString()
                                                    }}</span>
                                                    views
                                                </div>
                                                <div>
                                                    <span class="font-medium">{{
                                                        videoData.stats.likes.toLocaleString()
                                                    }}</span>
                                                    likes
                                                </div>
                                                <div>
                                                    <span class="font-medium">{{
                                                        videoData.stats.comments.toLocaleString()
                                                    }}</span>
                                                    comments
                                                </div>
                                            </div>

                                            <!-- Category -->
                                            <div>
                                                <Label class="text-muted-foreground">Category ID</Label>
                                                <p class="text-base">{{ videoData.categoryId }}</p>
                                            </div>

                                            <!-- Original YouTube Link -->
                                            <div>
                                                <Label class="text-muted-foreground">Source</Label>
                                                <a
                                                    :href="`https://www.youtube.com/watch?v=${videoData.id}`"
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    class="hover:underline"
                                                >
                                                    View on YouTube
                                                </a>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </TabsContent>

                                <TabsContent value="Transcript">
                                    <Card>
                                        <CardHeader>
                                            <CardTitle>Transcript</CardTitle>
                                            <CardDescription>
                                                View and interact with the transcript of the video here.
                                            </CardDescription>
                                        </CardHeader>
                                        <CardContent class="space-y-2">
                                            <!-- Placeholder transcript content -->
                                            <table class="w-full table-fixed border-collapse text-left text-base">
                                                <!-- Table Head -->
                                                <thead class="text-muted-foreground border-b text-sm">
                                                    <tr>
                                                        <th class="w-24 text-center">Time</th>
                                                        <th>Transcript</th>
                                                    </tr>
                                                </thead>

                                                <!-- Table Body -->
                                                <tbody class="[tr+tr]:pt-2 [&>tr]:align-top">
                                                    <template v-for="(line, index) in transcript" :key="index">
                                                        <tr
                                                            :class="[
                                                                currentTime >= line.startTime &&
                                                                currentTime < line.endTime
                                                                    ? 'bg-muted/80'
                                                                    : '',
                                                            ]"
                                                            class="group"
                                                        >
                                                            <!-- Timestamp -->
                                                            <td
                                                                rowspan="2"
                                                                class="text-muted-foreground cursor-pointer rounded-l-xl text-center align-middle font-mono text-sm hover:text-green-500"
                                                                @click="
                                                                    instance?.seekTo(line.startTime, true);
                                                                    currentTime = line.startTime;
                                                                "
                                                            >
                                                                {{ secondsToStandardTime(line.startTime) }}
                                                            </td>

                                                            <!-- Chinese + Ruby -->
                                                            <td class="rounded-tr-xl pt-1 leading-snug">
                                                                <template
                                                                    v-for="(char, idx) in line.tokenizedChinese"
                                                                    :key="idx"
                                                                >
                                                                    <span
                                                                        class="inline-block cursor-pointer px-1 transition hover:text-green-400"
                                                                    >
                                                                        <ruby>
                                                                            <template
                                                                                v-for="(
                                                                                    [hanziChar, pinyinChar], i
                                                                                ) in char.hanzi.map((c, i) => [
                                                                                    c,
                                                                                    char.pinyin[i] || '',
                                                                                ])"
                                                                                :key="i"
                                                                            >
                                                                                <rb>{{ hanziChar }}</rb>
                                                                                <rt
                                                                                    class="text-muted-foreground text-xs"
                                                                                    >{{ pinyinChar }}</rt
                                                                                >
                                                                            </template>
                                                                        </ruby>
                                                                    </span>
                                                                </template>
                                                            </td>
                                                        </tr>

                                                        <!-- English Line -->
                                                        <tr
                                                            :class="
                                                                currentTime >= line.startTime &&
                                                                currentTime < line.endTime
                                                                    ? 'bg-muted/80'
                                                                    : ''
                                                            "
                                                        >
                                                            <td
                                                                class="text-muted-foreground rounded-br-xl pl-1 text-sm"
                                                            >
                                                                {{ line.english }}
                                                            </td>
                                                        </tr>
                                                    </template>
                                                </tbody>
                                            </table>

                                            <Separator label="End of Transcript" />
                                        </CardContent>
                                    </Card>
                                </TabsContent>

                                <TabsContent value="Settings">
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



                        <div class="gutter flex h-full overflow-y-auto p-4">
                            <Tabs default-value="dictionary" class="h-full w-full">
                                <TabsList class="grid w-full grid-cols-2">
                                    <TabsTrigger value="dictionary" class="cursor-pointer">Dictionary</TabsTrigger>
                                    <TabsTrigger value="settings" class="cursor-pointer">Settings</TabsTrigger>
                                </TabsList>

                                <!-- Dictionary Tab -->
                                <TabsContent value="dictionary">
                                    <Card>
                                        <CardHeader>
                                            <CardTitle>Dictionary</CardTitle>
                                            <CardDescription>
                                                Look up definitions. Powered by CC-EDICT.</CardDescription
                                            >
                                        </CardHeader>
                                        <CardContent class="space-y-4">
                                            <div class="flex gap-2">
                                                <Input placeholder="Enter a word or phrase" class="flex-1" />
                                                <Button>Search</Button>
                                            </div>
                                            <div v-if="false" class="space-y-2">hello i am under the water</div>
                                            <div v-else class="text-muted-foreground text-sm italic">
                                                No results yet.
                                            </div>
                                        </CardContent>
                                    </Card>
                                </TabsContent>

                                <!-- Settings Tab -->
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
</template>




<style scoped>
</style>

<!--

-->
