<script setup lang="ts">
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from '@inertiajs/vue3';
import { ArrowLeft } from 'lucide-vue-next';

const back = () => window.history.back();
</script>

<template>
    <div class="flex min-h-screen flex-col items-center justify-center">
        <Card class="m-2 w-full max-w-md">
            <CardHeader>
                <CardTitle>Error 404</CardTitle>
                <CardDescription>Oops, this page doesn't exist or is under construction.</CardDescription>
            </CardHeader>
            <CardContent>
                <img src="/images/404PageImage.gif" alt="404 Image" class="w-full rounded-xl object-cover" />
            </CardContent>
            <CardFooter>
                <!-- Weird hack from https://laracasts.com/discuss/channels/inertia/laravel-inertia-how-to-create-back-link -->
                <Link @click="back" href="#" class="w-full">
                    <Button class="flex w-full cursor-pointer items-center justify-center">
                        <ArrowLeft class="mr-2 h-4 w-4" /> Go Back
                    </Button>
                </Link>
            </CardFooter>
        </Card>
    </div>
</template>

<!-- -
    Page Not Found View for when URL's are invalid

    Notes:
    - The following uses Ziggy's route helper rather than href="/home" directly.
    I don't know why. Just accept it for now.

        <Link :href="route('home')" class="w-full"></Link>

    - Ziggy doesnt seem to support creating a back link, so the weird hack is done above
-->
