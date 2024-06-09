<script>
    import '../app.css'
    import "../global.scss";
    import Toasts from "$lib/components/Toasts/Toasts.svelte";
</script>

<style>
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css');
</style>

<Toasts />
<slot />

<button class="bg-dark p-4 rounded-full fixed bottom-5 right-5 cursor-pointer z-10" on:click={() => { window.scrollTo({top: 0, behavior: 'smooth'}) }}>
    <i class="fas fa-arrow-up text-white"></i>
</button>