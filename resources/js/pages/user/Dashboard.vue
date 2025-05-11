<script setup lang="ts">
import AppLayout from '@/layouts/AppLayout.vue';
import { SharedData, type BreadcrumbItem } from '@/types';
import { Head, usePage } from '@inertiajs/vue3';
import { nextTick, onMounted } from 'vue';
import { toast, Toaster } from 'vue-sonner';
import PlaceholderPattern from '../../components/PlaceholderPattern.vue';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/account/dashboard',
    },
];

const page = usePage<SharedData>();

onMounted(async () => {
    await nextTick();

    const flash = page.props.flash;
    if (flash?.error) {
        toast.error(flash.error);
    }
});
</script>

<template>
    <Head title="Dashboard" />

    <Toaster
        richColors
        position="top-center"
    />
    <AppLayout :breadcrumbs="breadcrumbs">
        <div class="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
            <div class="grid auto-rows-min gap-4 md:grid-cols-3">
                <div
                    class="border-sidebar-border/70 dark:border-sidebar-border relative aspect-video overflow-hidden rounded-xl border"
                >
                    <PlaceholderPattern />
                </div>
                <div
                    class="border-sidebar-border/70 dark:border-sidebar-border relative aspect-video overflow-hidden rounded-xl border"
                >
                    <PlaceholderPattern />
                </div>
                <div
                    class="border-sidebar-border/70 dark:border-sidebar-border relative aspect-video overflow-hidden rounded-xl border"
                >
                    <PlaceholderPattern />
                </div>
            </div>
            <div
                class="border-sidebar-border/70 dark:border-sidebar-border relative min-h-[100vh] flex-1 rounded-xl border md:min-h-min"
            >
                <PlaceholderPattern />
            </div>
        </div>
    </AppLayout>
</template>
