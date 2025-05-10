<script setup lang="ts">
import NavFooter from '@/components/NavFooter.vue';
import NavMain from '@/components/NavMain.vue';
import NavUser from '@/components/NavUser.vue';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Link } from '@inertiajs/vue3';
import { Bookmark, ChevronLeft, History, Info, LayoutGrid, Mail, Route } from 'lucide-vue-next';

const mainNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: '/account/dashboard',
        icon: LayoutGrid,
    },
    {
        title: 'History',
        href: '/account/history',
        icon: History,
    },
    {
        title: 'Saved Words',
        href: '/account/saved-words',
        icon: Bookmark,
    },
];

const footerNavItems: NavItem[] = [
    {
        title: 'About ZiTube',
        href: '/about',
        icon: Info,
    },
    {
        title: 'Contact',
        href: '/contact',
        icon: Mail,
    },
    {
        title: 'Road Map',
        href: '/roadmap',
        icon: Route,
    },
];
</script>

<template>
    <Sidebar collapsible="icon" variant="inset">
        <SidebarHeader>
            <SidebarMenu>
                <SidebarMenuItem>
                    <SidebarMenuButton size="lg" as-child>
                        <Link :href="route('home')">
                            <!-- Don't change this setup, the 2 divs are needed to work for some -->
                            <div
                                class="text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-md"
                            >
                                <ChevronLeft class="size-5 text-black dark:text-white"/>
                            </div>
                            <div class="ml-1 grid flex-1 text-left text-sm">
                                <span class="truncate leading-none font-semibold">Return To ZiTube</span>
                            </div>
                        </Link>
                    </SidebarMenuButton>
                </SidebarMenuItem>
            </SidebarMenu>
        </SidebarHeader>

        <SidebarContent>
            <NavMain :items="mainNavItems" />
        </SidebarContent>

        <SidebarFooter>
            <NavFooter :items="footerNavItems" />
            <NavUser />
        </SidebarFooter>
    </Sidebar>
    <slot />
</template>
