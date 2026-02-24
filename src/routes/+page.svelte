<script lang="ts">
  import { onMount } from 'svelte';
  import { page, device } from '$lib/../stores/index';

  import Navbar from '$lib/components/Navbar.svelte';
  import Home from '$lib/components/Home.svelte';
  import Contact from '$lib/components/Contact.svelte';
  import About from '$lib/components/About.svelte';
  import Projects from '$lib/components/Projects.svelte';

  onMount(() => {
    $device = window.innerWidth < 768 ? 'mobile' : 'desktop';
    window.addEventListener('resize', () => {
      $device = window.innerWidth < 768 ? 'mobile' : 'desktop';
    });
  });
</script>

<svelte:head>
    <script 
      data-name="BMC-Widget" 
      data-cfasync="false" 
      src="https://cdnjs.buymeacoffee.com/1.0.0/widget.prod.min.js" 
      data-id="aoof" 
      data-description="Support me on Buy me a coffee!" 
      data-message="" 
      data-color="#FF813F" 
      data-position="Right" 
      data-x_margin="18" 
      data-y_margin="18"></script>
</svelte:head>

<main>
  <Navbar />
  <div class="lg:w-1/2 md:w-2/3 sm:max-w-full m-auto">
    <Home />
    <About />
    <Projects />
    <Contact />
  </div>
  <button class="fixed bottom-4 left-4 bg-dark text-white p-2 rounded-full shadow-lg btn-scroll-up hidden" on:click={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
    <i class="fas fa-arrow-up"></i>
  </button>
</main>