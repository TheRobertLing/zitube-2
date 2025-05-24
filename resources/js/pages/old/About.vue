<script setup lang="ts">
import DefaultPageLayout from '@/layouts/DefaultPageLayout.vue';
import TextPageLayout from '@/layouts/TextPageLayout.vue';

import { BreadcrumbItemType } from '@/types';

const breadcrumbs: BreadcrumbItemType[] = [
    {
        title: 'Home',
        href: '/',
    },
    {
        title: 'About',
        href: '/about',
    },
];
</script>

<template>
    <DefaultPageLayout :breadcrumbs="breadcrumbs">
        <TextPageLayout>
            <h1 class="mb-8 text-4xl font-bold">About ZiTube</h1>

            <p class="text-lg leading-relaxed">
                ZiTube is a small project aimed to supplement any aspiring or current Chinese learners by offering a
                selection of curated videos that demonstrate real language use across a variety of contexts. All videos
                are equipped with vocabulary tools, subtitles, handwritten translations, and contextual tooltips
                designed to guide you as you pick up new words and expressions.
            </p>

            <section class="mt-16 space-y-6">
                <h2 class="text-2xl font-semibold">ZiTube's Story</h2>
                <p class="text-lg leading-relaxed">
                    While textbooks are definitely great for building a structured foundation, especially in grammar and
                    general vocabulary, I believe it's just as important to know how to actually express specific ideas
                    or even terms within certain topics. Take for example the words "acne" and "epilepsy." Even if you
                    aren't a doctor, as a native speaker you would still recognize these terms and be able to use them
                    appropriately in conversation. Furthermore, you'd naturally know the correct collocations, such as
                    saying someone was "diagnosed with epilepsy" rather than incorrectly saying "I caught epilepsy."
                    However, for a foreign learner, the closest expression they might know is simply "生病" ("to be
                    sick"), which clearly feels inadequate when trying to accurately describe more specific or serious
                    situations.
                </p>

                <p class="text-lg leading-relaxed">
                    In the same way, when learning Chinese, you might know a general word related to a topic, but not
                    the more specific or appropriate term needed to accurately express yourself. You might know how to
                    say "sick" (生病), but not how to describe "epilepsy" (癫痫) or "acne" (痤疮 or even just 痘痘)
                    properly.
                </p>

                <p class="text-lg leading-relaxed">
                    As a heritage speaker who grew up in an English-speaking community, this gap in vocabulary has made
                    communication with friends and family especially tough. I'd often know how to respond to questions
                    and keep up with conversations, but I'd get stuck because I just didn't have the right words — the
                    kind of words that go one level deeper than what textbooks usually teach.
                </p>

                <p class="text-lg leading-relaxed">
                    Ideally, the best way to learn Chinese would be to fully immerse yourself in a predominantly
                    Chinese-speaking environment. However for me, and I believe many other heritage speakers and
                    non-native speakers, this is not always possible. And so, ZiTube was created as a substitute way for
                    me to force myself to engage with the language more actively through the medium of online videos and
                    to help others supplement their own learning journeys too.
                </p>

                <img src="/images/加油.webp" alt="加油" class="m-auto">
            </section>
        </TextPageLayout>
    </DefaultPageLayout>
</template>

<style scoped></style>
