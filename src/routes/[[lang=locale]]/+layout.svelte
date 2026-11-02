<script lang="ts">
  import Nav from '$lib/components/Nav.svelte';
  import Footer from '$lib/components/Footer.svelte';

  let { data, children } = $props();
  const settings = $derived(data.content.settings);
</script>

<a class="skip" href="#main">{settings.navigation.skip}</a>
<Nav lang={data.lang} {settings} tracks={data.content.tracks} />
<main id="main" tabindex="-1">
  {@render children()}
</main>
<Footer {settings} lang={data.lang} />

<style>
  .skip {
    position: absolute;
    left: 1rem;
    top: -4rem;
    z-index: 50;
    padding: 0.75rem 1rem;
    background: var(--pink);
    color: var(--ground);
    font-weight: 700;
    transition: top 150ms;
  }

  .skip:focus {
    top: 0.75rem;
  }

  main {
    min-height: 60vh;
  }

  main:focus {
    outline: none;
  }
</style>
