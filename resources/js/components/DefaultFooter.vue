<template>
    <footer class="border-sidebar-border/80 flex flex-col items-center space-y-4 border-t py-8 text-center">
        <nav class="flex flex-wrap justify-center gap-6">
            <a class="cursor-pointer text-sm hover:underline" href="/about">About ZiTube</a>
            <a class="cursor-pointer text-sm hover:underline" href="/contact">Contact</a>
            <a class="cursor-pointer text-sm hover:underline" href="/roadmap">Road Map</a>
        </nav>

        <aside class="text-xs text-gray-500">
            <p>Copyright © {{ new Date().getFullYear() }} - ZiTube</p>
        </aside>
    </footer>
</template>

<!--
Default Footer Component for most pages

Used the DaisyUI component for this one
-->
