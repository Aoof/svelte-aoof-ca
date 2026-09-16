<script lang="ts">
    import { onMount } from 'svelte';
    import { initializeLocale } from '$lib/i18n';
    import Navbar from '$lib/components/Navbar.svelte';
    import type { LayoutData } from './$types';
    import '../app.css'
    import "../global.scss";

    export let data: LayoutData;

    onMount(() => {
        initializeLocale();
    });
</script>

<style>
/* @import url('https://kit.fontawesome.com/b41f14ba9b.js'); */
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css');
@import url('https://fonts.googleapis.com/css2?family=Victor+Mono:ital,wght@0,100..700;1,100..700&display=swap');
</style>

    <Navbar settings={data.content.settings} />
    <slot />