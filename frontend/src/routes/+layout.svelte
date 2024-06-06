<script>
    import '../app.css'
    import "../global.scss";
    import Toasts from "$lib/components/Toasts/Toasts.svelte";
</script>

<style>

</style>

<Toasts />
<slot />

<button class="bg-dark p-4 rounded-full fixed bottom-5 right-5 cursor-pointer z-10" on:click={() => { window.scrollTo({top: 0, behavior: 'smooth'}) }}>
    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18" />
</button>