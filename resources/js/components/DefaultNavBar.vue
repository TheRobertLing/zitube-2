<script setup lang="ts">
import AppLogo from '@/components/AppLogo.vue';
import AppLogoIcon from '@/components/AppLogoIcon.vue';
import Breadcrumbs from '@/components/Breadcrumbs.vue';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import UserMenuContent from '@/components/UserMenuContent.vue';
import { getInitials } from '@/composables/useInitials';
import type { Auth, BreadcrumbItem, NavItem, SharedData } from '@/types';
import { Link, usePage } from '@inertiajs/vue3';
import { Flame, House, LayoutGrid, Menu } from 'lucide-vue-next';
import { computed } from 'vue';

interface Props {
    breadcrumbs?: BreadcrumbItem[];
}

const props = withDefaults(defineProps<Props>(), {
    breadcrumbs: () => [],
});

const page = usePage<SharedData>();
const auth = computed(() => page.props.auth as Auth);

const mainNavItems: NavItem[] = [
    {
        title: 'Home',
        href: '/',
        icon: House,
    },
    {
        title: 'Latest',
        href: '/',
        icon: Flame,
    },
    {
        title: 'Categories',
        href: '/',
        icon: LayoutGrid,
    },
];
</script>

<template>
    <div>
        <div class="border-sidebar-border/80 border-b">
            <div class="mx-auto flex h-16 items-center justify-between px-4 md:justify-start">
                <!-- Logo -->
                <Link :href="route('home')" class="flex items-center gap-x-2">
                    <AppLogo />
                </Link>

                <!-- Desktop Menu -->
                <div class="hidden h-full md:flex md:flex-1">
                    <NavigationMenu class="ml-5 flex h-full items-stretch lg:ml-10">
                        <NavigationMenuList class="flex h-full items-stretch space-x-2">
                            <NavigationMenuItem
                                v-for="(item, index) in mainNavItems"
                                :key="index"
                                class="relative flex h-full items-center"
                            >
                                <Link :href="item.href">
                                    <NavigationMenuLink
                                        :class="[navigationMenuTriggerStyle(), 'h-9 cursor-pointer px-3']"
                                    >
                                        <component v-if="item.icon" :is="item.icon" class="mr-2 h-4 w-4" />
                                        {{ item.title }}
                                    </NavigationMenuLink>
                                </Link>
                            </NavigationMenuItem>
                        </NavigationMenuList>
                    </NavigationMenu>
                </div>

                <!-- Desktop Login / Search / Register / Profile Section -->
                <div class="hidden items-center space-x-2 md:flex">
                    <!-- Dont need search button for now -->
                    <!-- <div class="relative flex items-center space-x-1">
                        <Button variant="ghost" size="icon" class="group h-9 w-9 cursor-pointer">
                            <Search class="size-5 opacity-80 group-hover:opacity-100" />
                        </Button>
                    </div> -->

                    <DropdownMenu v-if="auth.user">
                        <DropdownMenuTrigger :as-child="true">
                            <Button
                                variant="ghost"
                                size="icon"
                                class="focus-within:ring-primary relative size-10 w-auto rounded-full p-1 focus-within:ring-2"
                            >
                                <Avatar class="size-8 overflow-hidden rounded-full">
                                    <AvatarImage
                                        v-if="auth.user.avatar"
                                        :src="auth.user.avatar"
                                        :alt="auth.user.name"
                                    />
                                    <AvatarFallback
                                        class="rounded-lg bg-neutral-200 font-semibold text-black dark:bg-neutral-700 dark:text-white"
                                    >
                                        {{ getInitials(auth.user?.name) }}
                                    </AvatarFallback>
                                </Avatar>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" class="w-56">
                            <UserMenuContent :user="auth.user" />
                        </DropdownMenuContent>
                    </DropdownMenu>

                    <template v-else>
                        <Link
                            :href="route('login')"
                            class="inline-block rounded-sm border border-transparent px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#19140035] dark:text-[#EDEDEC] dark:hover:border-[#3E3E3A]"
                        >
                            Log in
                        </Link>
                        <Link
                            :href="route('register')"
                            class="inline-block rounded-sm border border-[#19140035] px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#1915014a] dark:border-[#3E3E3A] dark:text-[#EDEDEC] dark:hover:border-[#62605b]"
                        >
                            Register
                        </Link>
                    </template>
                </div>

                <!-- Mobile Menu -->
                <div class="md:hidden">
                    <Sheet>
                        <SheetTrigger :as-child="true">
                            <Button variant="ghost" size="icon" class="ml-2 h-9 w-9">
                                <Menu class="h-5 w-5" />
                            </Button>
                        </SheetTrigger>

                        <SheetContent side="right" class="w-[300px] p-6">
                            <SheetTitle class="sr-only">Navigation Menu</SheetTitle>

                            <!-- Logo -->
                            <SheetHeader class="flex justify-start text-left">
                                <AppLogoIcon class="size-6 fill-current text-black dark:text-white" />
                            </SheetHeader>

                            <!-- Main nav links -->
                            <div class="flex h-full flex-1 flex-col justify-between space-y-6">
                                <nav class="-mx-3 space-y-1">
                                    <Link
                                        v-for="item in mainNavItems"
                                        :key="item.title"
                                        :href="item.href"
                                        class="hover:bg-accent flex items-center gap-x-3 rounded-lg px-3 py-2 text-sm font-medium"
                                    >
                                        <component v-if="item.icon" :is="item.icon" class="h-5 w-5" />
                                        {{ item.title }}
                                    </Link>
                                </nav>

                                <!-- Mobile auth + search actions -->
                                <div class="flex flex-col gap-2">
                                    <!-- Search Button DONT NEED THIS FOR NOW-->
                                    <!-- <Button variant="ghost" class="justify-start">
                                        <Search class="mr-2 h-4 w-4" />
                                        Search
                                    </Button> -->

                                    <!-- If user logged in -->
                                    <DropdownMenu v-if="auth.user">
                                        <DropdownMenuTrigger :as-child="true">
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                class="focus-within:ring-primary relative mx-auto size-10 rounded-full p-1 focus-within:ring-2"
                                            >
                                                <Avatar class="size-8 overflow-hidden rounded-full">
                                                    <AvatarImage
                                                        v-if="auth.user.avatar"
                                                        :src="auth.user.avatar"
                                                        :alt="auth.user.name"
                                                    />
                                                    <AvatarFallback
                                                        class="rounded-lg bg-neutral-200 font-semibold text-black dark:bg-neutral-700 dark:text-white"
                                                    >
                                                        {{ getInitials(auth.user?.name) }}
                                                    </AvatarFallback>
                                                </Avatar>
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="center" class="w-56">
                                            <UserMenuContent :user="auth.user" />
                                        </DropdownMenuContent>
                                    </DropdownMenu>

                                    <template v-else>
                                        <Link
                                            :href="route('login')"
                                            class="inline-block rounded-sm border border-transparent px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#19140035] dark:text-[#EDEDEC] dark:hover:border-[#3E3E3A]"
                                        >
                                            Log in
                                        </Link>
                                        <Link
                                            :href="route('register')"
                                            class="inline-block rounded-sm border border-[#19140035] px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#1915014a] dark:border-[#3E3E3A] dark:text-[#EDEDEC] dark:hover:border-[#62605b]"
                                        >
                                            Register
                                        </Link>
                                    </template>
                                </div>
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
        </div>

        <!-- Breadcrumbs -->
        <div v-if="props.breadcrumbs.length > 1" class="border-sidebar-border/70 flex w-full border-b">
            <div class="mx-auto flex h-12 w-full items-center justify-start px-4 text-neutral-500">
                <Breadcrumbs :breadcrumbs="breadcrumbs" />
            </div>
        </div>
    </div>
</template>

<!--
    Modified AppHeader.vue for non user profile/dashboard related public pages.
-->
