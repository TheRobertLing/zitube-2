<script setup lang="ts">
import ContactForm from '@/components/ContactForm.vue';
import InputError from '@/components/InputError.vue';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import DefaultPageLayout from '@/layouts/DefaultPageLayout.vue';
import TextPageLayout from '@/layouts/TextPageLayout.vue';
import { BreadcrumbItemType } from '@/types';
import { useForm } from '@inertiajs/vue3';
import { LoaderCircle } from 'lucide-vue-next';
import { toast, Toaster } from 'vue-sonner';

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
    <DefaultPageLayout :breadcrumbs="breadcrumbs">
        <TextPageLayout>
            <Toaster position="bottom-right" richColors />
            <ContactForm
                title="Get in Touch"
                description="Have a question, suggestion, or just want to say hi? I'd love to hear from you."
            >
                <form @submit.prevent="submit" class="flex flex-col gap-6">
                    <div class="grid gap-6">
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
                                placeholder="Full name"
                            />
                            <InputError :message="form.errors.name" />
                        </div>

                        <div class="grid gap-2">
                            <Label for="email">Email address</Label>
                            <Input
                                id="email"
                                type="email"
                                required
                                :tabindex="2"
                                autocomplete="email"
                                v-model="form.email"
                                placeholder="email@example.com"
                            />
                            <InputError :message="form.errors.email" />
                        </div>

                        <div class="grid gap-2">
                            <Label for="message">Message</Label>
                            <Textarea
                                id="message"
                                required
                                :tabindex="3"
                                autocomplete="off"
                                v-model="form.message"
                                placeholder="Your message"
                                rows="5"
                            ></Textarea>
                            <InputError :message="form.errors.message" />
                        </div>

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
            </ContactForm>
        </TextPageLayout>
    </DefaultPageLayout>
</template>

<!--
    View for the contact page with a contact form to ask question and stuff
-->
