<script lang="ts">
    import { onMount } from 'svelte';
    import { initializeLocale } from '$lib/i18n';
    import '../app.css'
    import "../global.scss";

    onMount(() => {
        initializeLocale();
    });
</script>

<style>
/* @import url('https://kit.fontawesome.com/b41f14ba9b.js'); */
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css');
@import url('https://fonts.googleapis.com/css2?family=Victor+Mono:ital,wght@0,100..700;1,100..700&display=swap');
</style>

<slot />