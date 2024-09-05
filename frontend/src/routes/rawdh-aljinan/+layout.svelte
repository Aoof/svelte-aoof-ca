<script>
    import { isLoggedIn, user, loggedIn } from '$lib/../stores/auth';
    import Login from '$lib/components/RaJ/Login.svelte';
    import Loader from '$lib/components/Fae/Loader.svelte';

    import favicon from '$lib/media/fae_favicon.png'

    import { onMount } from 'svelte';

    onMount(async () => {
        user.set({ username: localStorage.getItem('username') || '', token: localStorage.getItem('token') || '' });
        loggedIn.set(await isLoggedIn(true) ? 1 : 0);
    });
</script>

<style lang="scss">
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
    <title>Rawdh Al-Jinan</title>
</svelte:head>


{#if $loggedIn === -1}
    <div class="wrapper">
        <Loader />
    </div>
{:else if $loggedIn}
    <slot />
{:else}
    <Login isRaJ={true} />
{/if}