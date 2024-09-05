<script>
    import { isLoggedIn, user, loggedIn } from '$lib/../stores/auth';
    import Login from '$lib/components/Fae/Login.svelte';
    import Loader from '$lib/components/Fae/Loader.svelte';

    import favicon from '$lib/media/fae_favicon.png'

    import { onMount } from 'svelte';

    onMount(async () => {
        user.set({ username: localStorage.getItem('username') || '', token: localStorage.getItem('token') || '' });
        loggedIn.set(await isLoggedIn(false) ? 1 : 0);
    });
</script>

<style>
    main {
        position: relative;
        min-height: 100vh;
        display: flex;
        padding-bottom: 2rem;
    }

    .wrapper {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
    }
</style>

<svelte:head>
    <link rel="icon" href={favicon} />
    <title>Fae's Grimoire</title>
</svelte:head>

<main class="z-10">
    {#if $loggedIn === -1}
        <div class="wrapper">
            <Loader />
        </div>
    {:else if $loggedIn}
        <slot />
        <p class="bottom-0 left-0 right-0 absolute text-center select-none text-xs" style="z-index: -1;">
            Copyright 2023 © The content on this website, including text, images, and logos, is the property of this website and protected by copyright laws. Unauthorized use of any materials on this website may violate copyright laws.
        </p>
    {:else}
        <Login />
    {/if}
</main>