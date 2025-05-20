<script setup lang="ts">
import InputError from '@/components/InputError.vue';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Toaster } from '@/components/ui/sonner';
import { Textarea } from '@/components/ui/textarea';
import TextPageLayout from '@/layouts/public/TextPageLayout.vue';
import { BreadcrumbItemType } from '@/types';
import { useForm } from '@inertiajs/vue3';
import { LoaderCircle } from 'lucide-vue-next';
import { toast } from 'vue-sonner';

const breadcrumbs: BreadcrumbItemType[] = [
    {
        title: 'Home',
        href: '/',
    },
    {
        title: 'Contact',
        href: '/contact',
    },
];

const form = useForm({
    name: '',
    email: '',
    message: '',
});

const submit = () => {
    form.post(route('contact.send'), {
        onSuccess: async () => {
            await submitForm();
            form.reset();
        },
        onError: () => {
            toast.error('Please fix the errors in the form.');
        },
    });
};

const submitForm = async () => {
    const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
        },
        body: JSON.stringify({
            access_key: import.meta.env.VITE_WEB3FORMS_ACCESS_KEY,
            name: form.name,
            email: form.email,
            message: form.message,
        }),
    });

    const result = await response.json();
    if (result.success) {
        toast('Message successfully sent');
    } else {
        toast('Message failed to send. Try again later.');
    }
};
</script>

<template>
    <TextPageLayout :breadcrumbs="breadcrumbs">
        <Toaster position="bottom-right" richColors />
        <div class="bg-background flex flex-col items-center px-6 py-10 md:py-16">
            <!-- Page Title & Description -->
            <div class="mb-10 max-w-2xl text-center">
                <h1 class="text-3xl font-semibold tracking-tight">Contact Us</h1>
                <p class="text-muted-foreground mt-2 text-base">
                    If you have any questions, suggestions, or feedback, feel free to send a message over.
                </p>
            </div>

            <!-- Form Container -->
            <div class="w-full max-w-xl">
                <form @submit.prevent="submit" class="flex flex-col gap-6">
                    <div class="grid gap-6">
                        <!-- Name -->
                        <div class="grid gap-2">
                            <Label for="name">Name</Label>
                            <Input
                                id="name"
                                type="text"
                                required
                                autofocus
                                :tabindex="1"
                                autocomplete="name"
                                v-model="form.name"
                                placeholder="Your full name"
                            />
                            <InputError :message="form.errors.name" />
                        </div>

                        <!-- Email -->
                        <div class="grid gap-2">
                            <Label for="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                required
                                :tabindex="2"
                                autocomplete="email"
                                v-model="form.email"
                                placeholder="you@example.com"
                            />
                            <InputError :message="form.errors.email" />
                        </div>

                        <!-- Message -->
                        <div class="grid gap-2">
                            <Label for="message">Message</Label>
                            <Textarea
                                id="message"
                                required
                                :tabindex="3"
                                autocomplete="off"
                                v-model="form.message"
                                placeholder="Tell us what's on your mind..."
                            />
                            <InputError :message="form.errors.message" />
                        </div>

                        <!-- Submit -->
                        <Button
                            type="submit"
                            class="mt-2 w-full cursor-pointer"
                            tabindex="5"
                            :disabled="form.processing"
                        >
                            <LoaderCircle v-if="form.processing" class="h-4 w-4 animate-spin" />
                            Send Message
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    </TextPageLayout>
</template>

<!--
    View for the contact page with a contact form to ask question and stuff
-->
