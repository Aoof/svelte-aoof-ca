<script lang="ts">
  import SEO from '$lib/components/SEO.svelte';
  import Icon from '$lib/components/Icon.svelte';

  let { data } = $props();

  const lang = $derived(data.lang);
  const ui = $derived(data.content.settings.ui);
  const drawn = ['coffee', 'tea', 'milk', 'cat', 'movies', 'anime', 'music', 'flower', 'leaf', 'volleyball', 'football', 'hat', 'pot', 'code', 'teach', 'hike', 'bug'];
</script>

<SEO title={ui.footnotes.title} description={ui.seo.footnotes} {lang} path="/footnotes" />

<section class="wrap">
  <h1>{ui.footnotes.title}</h1>
  <p class="intro">{ui.footnotes.intro}</p>

  <ul class="list">
    <li class="block-card">
      <h2>{ui.footnotes.drawnTitle}</h2>
      <p>{ui.footnotes.drawn}</p>
      <ul class="icons">
        {#each drawn as name (name)}
          <li><Icon {name} size={36} /></li>
        {/each}
      </ul>
    </li>
    <li class="block-card">
      <h2>{ui.footnotes.brandsTitle}</h2>
      <p>
        {ui.footnotes.brands}
        <a href="https://simpleicons.org" target="_blank" rel="noopener noreferrer">Simple Icons</a>
        (CC0).
      </p>
      <p class="small">{ui.footnotes.trademarks}</p>
    </li>
    <li class="block-card">
      <h2>{ui.footnotes.typeTitle}</h2>
      <p>
        {ui.footnotes.type}
        <a href="https://github.com/Omnibus-Type/Archivo" target="_blank" rel="noopener noreferrer">Archivo</a>
        (SIL Open Font License), {ui.footnotes.typeVia}
        <a href="https://fontsource.org" target="_blank" rel="noopener noreferrer">Fontsource</a>.
      </p>
    </li>
    <li class="block-card">
      <h2>{ui.footnotes.qrTitle}</h2>
      <p>
        {ui.footnotes.qr}
        <a href="https://github.com/soldair/node-qrcode" target="_blank" rel="noopener noreferrer">node-qrcode</a>
        (MIT).
      </p>
    </li>
  </ul>
</section>

<style>
  section {
    padding-top: clamp(2rem, 5vw, 4rem);
  }

  h1 {
    font-size: var(--t-title);
  }

  .intro {
    max-width: var(--measure);
    margin-top: 1.25rem;
    font-size: var(--t-lead);
  }

  .list {
    display: grid;
    gap: 1.5rem;
    margin: 2.5rem 0 0;
    padding: 0;
    list-style: none;
  }

  .list > li {
    display: grid;
    gap: 0.75rem;
    justify-items: start;
    padding: 1.25rem;
    max-width: 44rem;
  }

  .list > li:nth-child(odd) {
    rotate: -0.4deg;
  }

  .list > li:nth-child(even) {
    rotate: 0.5deg;
    background: var(--key-soft);
  }

  h2 {
    font-size: 1.5rem;
  }

  .small {
    font-size: var(--t-small);
  }

  .icons {
    display: flex;
    flex-wrap: wrap;
    gap: 0.75rem;
    margin: 0;
    padding: 0;
    list-style: none;
  }

  .icons li {
    display: grid;
    place-items: center;
    width: 3.5rem;
    height: 3.5rem;
    border: 3px solid #111;
    border-radius: 10px;
    background: #fff;
  }
</style>
