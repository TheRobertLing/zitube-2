import type { PageProps } from '@inertiajs/core';
import type { LucideIcon } from 'lucide-vue-next';
import { Component } from 'vue';
import type { Config } from 'ziggy-js';

export interface Auth {
    user: User;
}

export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface NavItem {
    title: string;
    href: string;
    icon?: LucideIcon;
    isActive?: boolean;
}

export interface SharedData extends PageProps {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    ziggy: Config & { location: string };
    sidebarOpen: boolean;
    flash?: { error: string };
}

export interface User {
    id: number;
    name: string;
    email: string;
    avatar?: string;
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
    role: 'admin' | 'user';
}

export type BreadcrumbItemType = BreadcrumbItem;

export interface VideoTabDetails {
    cardTitle: string;
    cardDescription: string;
}

export interface VideoTabItem extends VideoTabDetails {
    tabName: string;
    component: Component;
}

export interface VideoMetaData {
    id: string;
    title: string;
    description: string;
    publishedAt: string; // ISO string
    channel: {
        id: string;
        title: string;
    };
    duration: string; // ISO 8601 duration
    categoryId: string;
    stats: {
        views: number;
        likes: number;
        comments: number;
    };
};

export interface TranscriptSegment {
    startTime: number;
    endTime: number;
    tokenizedChinese: ChineseToken[];
    english: string;
};

export interface ChineseToken {
    hanzi: string[];
    pinyin: string[];
};


