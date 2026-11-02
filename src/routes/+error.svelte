<script lang="ts">
  import { page } from '$app/state';
</script>

<svelte:head>
  <title>{page.status} | Abdulrahman Mousa</title>
  <meta name="robots" content="noindex" />
</svelte:head>

<section class="wrap">
  <h1>{page.status}</h1>
  <p>{page.status === 404 ? 'That page does not exist.' : 'Something broke on my end.'}</p>
  <p><a class="btn" href="/">aoof.ca</a></p>
</section>

<style>
  section {
    display: grid;
    gap: 1.25rem;
    justify-items: start;
    padding-block: clamp(4rem, 12vw, 8rem);
  }

  h1 {
    font-size: var(--t-title);
  }
</style>
