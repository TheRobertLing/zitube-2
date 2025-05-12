<script setup lang="ts">
import NavFooter from '@/components/NavFooter.vue';
import NavMain from '@/components/NavMain.vue';
import NavUser from '@/components/NavUser.vue';
import { Separator } from '@/components/ui/separator';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { SharedData, type NavItem } from '@/types';
import { Link, usePage } from '@inertiajs/vue3';
import {
    Bookmark,
    ChevronLeft,
    FileVideo,
    History,
    Info,
    LayoutDashboard,
    Mail,
    Route,
    SquarePen,
    User,
} from 'lucide-vue-next';
import NavAdmin from './NavAdmin.vue';

const mainNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: '/account/dashboard',
        icon: LayoutDashboard,
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

const adminNavItems: NavItem[] = [
    {
        title: 'New Video',
        href: '/admin/new',
        icon: FileVideo,
    },
    {
        title: 'Edit Video',
        href: '/admin/edit',
        icon: SquarePen,
    },
    {
        title: 'Manage Users',
        href: '/admin/users',
        icon: User,
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

const page = usePage<SharedData>();

console.log(page);
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
                                <ChevronLeft class="size-5 text-black dark:text-white" />
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
            <NavAdmin v-if="page.props.auth.user.role === 'admin'" :items="adminNavItems" />
        </SidebarContent>

        <SidebarFooter>
            <NavFooter :items="footerNavItems" />
            <Separator label="Or" />
            <NavUser />
        </SidebarFooter>
    </Sidebar>
    <slot />
</template>
