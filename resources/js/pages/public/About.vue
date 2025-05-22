<script setup lang="ts">
import { Button } from '@/components/ui/button';
import TextPageLayout from '@/layouts/public/TextPageLayout.vue';
import { Head } from '@inertiajs/vue3';

const breadcrumbs = [
    { title: 'Home', href: '/' },
    { title: 'About', href: '/about' },
];
</script>

<template>
    <Head>
        <title>About</title>
        <meta
            name="description"
            content="ZiTube is a curated video platform designed to complement Chinese language study with integrated learning features."
        />
        <meta property="og:title" content="About ZiTube" />
        <meta
            property="og:description"
            content="ZiTube is a curated video platform designed to complement Chinese language study with integrated learning features."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://zitube.com/about" />
    </Head>

    <TextPageLayout :breadcrumbs="breadcrumbs">
        <div class="space-y-32 bg-neutral-950 pb-32 font-sans">
            <!-- 1. VIDEO HERO SECTION -->
            <section
                class="mx-auto flex max-w-screen-xl flex-col items-center justify-between gap-16 px-6 pt-20 lg:flex-row"
            >
                <div class="w-full lg:w-1/2">
                    <iframe
                        class="aspect-video w-full rounded-xl shadow-lg"
                        src="https://www.youtube.com/embed/vBpQ1SlfVtU"
                        title="Lamborghini Vs World&#39;s Largest Shredder"
                        frameborder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        referrerpolicy="strict-origin-when-cross-origin"
                        allowfullscreen
                    ></iframe>
                </div>

                <div class="w-full space-y-6 lg:w-1/2">
                    <h1 class="text-4xl leading-tight font-bold tracking-wide">Watch. Learn. Understand.</h1>
                    <p class="text-base leading-relaxed">
                        ZiTube is a small project designed to support Chinese learners by leveraging YouTube's vast
                        library of authentic content. It offers curated videos enhanced with accurate translations and
                        other language learning tools to make real-world Chinese more accessible and engaging.
                    </p>
                    <div class="flex gap-4">
                        <Button variant="outline" size="lg">Explore ZiTube</Button>
                    </div>
                </div>
            </section>

            <!-- 2. HUMAN + TECH SECTION -->
            <section class="mx-auto max-w-screen-xl space-y-16 px-6">
                <header class="mb-8">
                    <h2 class="text-3xl font-semibold tracking-wide">Learn While You Watch</h2>
                </header>

                <!-- Feature 1 -->
                <div class="flex flex-col-reverse gap-10 text-base lg:flex-row">
                    <!-- COMPARISON BOX -->
                    <div class="flex w-full flex-col justify-center rounded-lg bg-neutral-800 p-6 lg:w-1/2">
                        <div class="mb-1 font-semibold text-neutral-400">Sentence:</div>
                        <div class="mb-6 text-base text-white italic">“明明明明明白白白喜欢他, 可她就是不说”</div>

                        <!-- MACHINE SEGMENTATION -->
                        <div class="mb-2 text-xs font-semibold text-pink-400">Machine Segmentation (Jieba):</div>
                        <div class="mb-6 space-y-2 space-x-1 rounded bg-neutral-900 p-3 text-pink-300">
                            <span class="inline-block rounded bg-neutral-800 px-2 py-1">明</span>
                            <span class="inline-block rounded bg-neutral-800 px-2 py-1">明明</span>
                            <span class="inline-block rounded bg-neutral-800 px-2 py-1">明明白白</span>
                            <span class="inline-block rounded bg-neutral-800 px-2 py-1">白</span>
                            <span class="inline-block rounded bg-neutral-800 px-2 py-1">喜欢</span>
                            <span class="inline-block rounded bg-neutral-800 px-2 py-1">他</span>
                            <span class="inline-block rounded bg-neutral-800 px-2 py-1">,</span>
                            <span class="inline-block rounded bg-neutral-800 px-2 py-1">可</span>
                            <span class="inline-block rounded bg-neutral-800 px-2 py-1">她</span>
                            <span class="inline-block rounded bg-neutral-800 px-2 py-1">就是</span>
                            <span class="inline-block rounded bg-neutral-800 px-2 py-1">不说</span>
                        </div>

                        <!-- HUMAN SEGMENTATION -->
                        <div class="mb-2 text-xs font-semibold text-emerald-400">Correct Segmentation:</div>
                        <div class="space-y-2 space-x-1 rounded bg-neutral-900 p-3 text-emerald-300">
                            <span class="inline-block rounded bg-neutral-800 px-2 py-1"
                                >明明 <span class="text-xs text-neutral-400">(name)</span></span
                            >
                            <span class="inline-block rounded bg-neutral-800 px-2 py-1"
                                >明明 <span class="text-xs text-neutral-400">(definitely)</span></span
                            >
                            <span class="inline-block rounded bg-neutral-800 px-2 py-1"
                                >明白 <span class="text-xs text-neutral-400">(knows)</span></span
                            >
                            <span class="inline-block rounded bg-neutral-800 px-2 py-1"
                                >白白 <span class="text-xs text-neutral-400">(name)</span></span
                            >
                            <span class="inline-block rounded bg-neutral-800 px-2 py-1">喜欢</span>
                            <span class="inline-block rounded bg-neutral-800 px-2 py-1">他</span>
                            <span class="inline-block rounded bg-neutral-800 px-2 py-1">,</span>
                            <span class="inline-block rounded bg-neutral-800 px-2 py-1">可</span>
                            <span class="inline-block rounded bg-neutral-800 px-2 py-1">她</span>
                            <span class="inline-block rounded bg-neutral-800 px-2 py-1">就是</span>
                            <span class="inline-block rounded bg-neutral-800 px-2 py-1">不说</span>
                        </div>
                    </div>

                    <!-- EXPLANATION TEXT -->
                    <article class="w-full space-y-4 lg:w-1/2">
                        <h3 class="text-xl font-semibold tracking-wide">Personally Crafted Translations</h3>
                        <p>
                            With the rise of natural language processing and machine learning, translation tools have
                            become faster and more widespread than ever. These systems can process vast amounts of text
                            in seconds — but they often stumble on the subtleties of real language: ambiguous tones,
                            shifting meanings, or context-dependent expressions.
                        </p>

                        <p>
                            Every video on ZiTube is manually reviewed and refined to go beyond surface-level accuracy.
                            By combining the speed of modern NLP tools with careful human oversight, we aim to craft
                            translations that reflect not just the words, but the tone, intent, and cultural behind
                            them.
                        </p>
                    </article>
                </div>

                <!-- Feature 2 -->
                <div class="flex flex-col gap-10 text-base lg:flex-row">
                    <article class="w-full space-y-4 lg:w-1/2">
                        <h3 class="text-xl font-semibold tracking-wide">Interactive Transcript</h3>
                        <p>
                            Follow along with a synced transcript as the video plays. Click on lines to jump, re-read,
                            or pause exactly where you need. The transcript auto-scrolls in real-time, keeping you
                            focused and in sync without constantly reaching for the rewind button.
                        </p>
                    </article>
                    <div
                        class="flex aspect-video w-full items-center justify-center rounded-lg bg-neutral-800 text-sm text-neutral-500 lg:w-1/2"
                    >
                        Transcript GIF demonstration
                    </div>
                </div>

                <!-- Feature 3 -->
                <div class="flex flex-col-reverse gap-10 text-base lg:flex-row">
                    <div
                        class="flex aspect-video w-full items-center justify-center rounded-lg bg-neutral-800 text-sm text-neutral-500 lg:w-1/2"
                    >
                        Dictionary GIF demonstration
                    </div>
                    <article class="w-full space-y-4 lg:w-1/2">
                        <h3 class="text-xl font-semibold tracking-wide">Built-In Dictionary</h3>
                        <p>
                            Tap on any word in the transcript to look it up instantly. The built-in dictionary is
                            designed to provide quick, seamless access to definitions, pinyin, and usage — helping you
                            stay focused while exploring new or unfamiliar words.
                        </p>
                    </article>
                </div>
            </section>

            <!-- 3. EVOLVING FEATURES SECTION -->
            <section class="mx-auto max-w-screen-xl px-6">
                <header class="mb-8">
                    <h2 class="text-3xl font-semibold tracking-wide">Help Grow ZiTube</h2>
                </header>
                <div class="flex flex-col gap-6 text-base">
                    <article class="w-full space-y-4">
                        <p>
                            ZiTube is still actively being developed, with new features and improvements added over
                            time. From smarter learning tools to smoother user experiences, there's a lot more on the
                            way.
                        </p>
                        <p>
                            You can check out the <a href="/roadmap" class="underline">Roadmap</a> to see what's planned
                            and where things are headed. If you have an idea for a feature to add to ZiTube, feel free
                            to <a href="/contact" class="underline">get in touch</a>.
                        </p>
                    </article>
                    <div class="overflow-hidden rounded-lg">
                        <img src="/images/加油.webp" alt="加油 graphic" class="mx-auto object-cover" />
                    </div>
                </div>
            </section>
        </div>
    </TextPageLayout>
</template>
