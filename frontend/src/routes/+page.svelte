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

<style lang="scss">
  main {
    height: stretch;
    width: stretch;

    .content-container {
      position: absolute;
      top: 0; bottom: 0;

      margin: auto 1rem auto 20rem;
      height: 70%;

      width: stretch;

      @media (max-width: 980px) {
          font-size: 0.8em;
      }

      @media (max-width: 768px) {
        top: 1rem; bottom: auto;
        margin: auto 1rem;
        left: 0;
        height: 90%;
      }
    }
  }
</style>

<main>
  <Navbar />
  <div class="content-container">
    {#if $page === 'home'}
      <Home />
    {:else if $page === 'contact'}
      <Contact />
    {:else if $page === 'about'}
      <About />
    {:else if $page === 'projects'}
      <Projects />
    {/if}
  </div>
</main>