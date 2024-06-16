<script>
    import '../app.css'
    import "../global.scss";
    import Toasts from "$lib/components/Toasts/Toasts.svelte";
    import Dialog from '$lib/components/Fae/Dialog.svelte';
</script>

<style>
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css');
</style>

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" class="absolute z-0"><path
    fill="#E0AFA0"
    fill-opacity="1"
    d="M0,192L26.7,181.3C53.3,171,107,149,160,122.7C213.3,96,267,64,320,53.3C373.3,43,427,53,480,58.7C533.3,64,587,64,640,80C693.3,96,747,128,800,165.3C853.3,203,907,245,960,234.7C1013.3,224,1067,160,1120,138.7C1173.3,117,1227,139,1280,149.3C1333.3,160,1387,160,1413,160L1440,160L1440,0L1413.3,0C1386.7,0,1333,0,1280,0C1226.7,0,1173,0,1120,0C1066.7,0,1013,0,960,0C906.7,0,853,0,800,0C746.7,0,693,0,640,0C586.7,0,533,0,480,0C426.7,0,373,0,320,0C266.7,0,213,0,160,0C106.7,0,53,0,27,0L0,0Z"
  ></path></svg
>

<Dialog />
<Toasts />
<slot />