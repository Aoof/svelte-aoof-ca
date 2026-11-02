<script lang="ts">
  import SEO from '$lib/components/SEO.svelte';
  import Pieces from '$lib/components/Pieces.svelte';
  import Ticker from '$lib/components/Ticker.svelte';
  import Icon from '$lib/components/Icon.svelte';
  import ProjectRow from '$lib/components/ProjectRow.svelte';
  import { href } from '$lib/i18n';
  import type { Project } from '$lib/content/types';

  let { data } = $props();

  const lang = $derived(data.lang);
  const home = $derived(data.content.home);
  const settings = $derived(data.content.settings);
  const ui = $derived(settings.ui);
  const featured = $derived(
    home.featured
      .map((slug) => data.content.projects.find((project) => project.slug === slug))
      .filter((project): project is Project => !!project)
  );
  const interests = $derived(Object.entries(ui.interests) as [string, string][]);
  const trackIcons: Record<string, string> = { web: 'coffee', game: 'hat', qa: 'cat', software: 'code' };

  const person = $derived({
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Abdulrahman Mousa',
    alternateName: 'Aoof',
    url: 'https://aoof.ca',
    email: settings.contact.email,
    address: { '@type': 'PostalAddress', addressLocality: 'Montreal', addressRegion: 'QC', addressCountry: 'CA' },
    sameAs: [settings.social.linkedin, settings.social.github]
  });
</script>

<SEO description={ui.seo.home} {lang} path="/" jsonLd={person} />

<section class="intro wrap">
  <div class="text">
    <Pieces track="home" />
    <h1>{home.title}</h1>
    <p class="aka">
      <a href="https://namedrop.io/abdulrahmanmousa" target="_blank" rel="noopener noreferrer">
        {home.subtitle} <span>{home.subtitle_highlight}</span>
      </a>
    </p>
    <p class="meta">{home.location}</p>
    <div class="copy">
      <div class="prose lede">{@html home.description}</div>
      <div class="prose">{@html home.passion}</div>
      <div class="prose status block-card">{@html home.looking_for}</div>
    </div>
  </div>

  <div class="hand">
    <h2>{ui.home.handTitle}</h2>
    <ul class="tiles">
      {#each data.content.tracks as track (track.slug)}
        <li data-track={track.slug}>
          <a href={href(lang, `/hire/${track.slug}`)}>
            <span class="badge"><Icon name={trackIcons[track.slug]} size={30} /></span>
            <span class="name">{track.title}</span>
          </a>
        </li>
      {/each}
    </ul>
  </div>
</section>

<Ticker items={interests} label={ui.home.interestsLabel} />

<section class="wrap featured">
  <h2>{ui.home.featuredTitle}</h2>
  <ul class="list">
    {#each featured as project (project.slug)}
      <ProjectRow {project} {lang} ui={ui.common} />
    {/each}
  </ul>
  <a class="btn" href={href(lang, '/work')}>{ui.home.seeAll}</a>
</section>

<style>
  .intro {
    position: relative;
    display: grid;
    grid-template-columns: minmax(0, 1fr);
    gap: 3.5rem;
    padding-top: clamp(2.5rem, 6vw, 5rem);
    isolation: isolate;
  }

  .text,
  .hand {
    position: relative;
    z-index: 1;
  }

  h1 {
    font-size: clamp(2rem, 0.5rem + 3.6vw, 3.5rem);
    font-weight: 900;
    line-height: 0.98;
    overflow-wrap: break-word;
  }

  .aka {
    margin-top: 1rem;
    font-stretch: 112%;
    font-weight: 700;
  }

  .aka a {
    text-decoration: none;
  }

  .aka a:hover {
    text-decoration: underline;
    text-decoration-thickness: 3px;
  }

  .aka span {
    padding: 0.05em 0.35em;
    border: 2px solid #111;
    border-radius: 6px;
    background: var(--key);
  }

  .text .meta {
    margin-top: 0.5rem;
  }

  .copy {
    display: grid;
    gap: 1.25rem;
    margin-top: 2rem;
  }

  .lede {
    font-size: var(--t-lead);
    line-height: 1.5;
  }

  .status {
    padding: 1rem 1.25rem;
    background: #ffc933;
    rotate: -0.6deg;
  }

  .hand h2 {
    margin-bottom: 1.25rem;
    font-size: 1.5rem;
  }

  .tiles {
    display: grid;
    gap: 1rem;
    margin: 0;
    padding: 0;
    list-style: none;
  }

  .tiles li {
    rotate: var(--lean, 0deg);
    transition: rotate 150ms var(--ease);
  }

  .tiles li:nth-child(1) {
    --lean: -1.5deg;
  }

  .tiles li:nth-child(2) {
    --lean: 1.2deg;
    margin-left: 1rem;
  }

  .tiles li:nth-child(3) {
    --lean: -0.6deg;
  }

  .tiles li:nth-child(4) {
    --lean: 1.8deg;
    margin-left: 1.5rem;
  }

  .tiles a {
    display: flex;
    align-items: center;
    gap: 1rem;
    min-height: 5.5rem;
    padding: 0.9rem 1.1rem;
    border: var(--border);
    border-radius: 10px;
    background: var(--accent);
    box-shadow: var(--hard);
    color: #111;
    font-stretch: 125%;
    font-weight: 900;
    font-size: 1.4rem;
    line-height: 1.1;
    text-decoration: none;
    transition:
      translate 120ms var(--ease),
      box-shadow 120ms var(--ease);
  }

  .badge {
    display: grid;
    place-items: center;
    flex: none;
    width: 3.25rem;
    height: 3.25rem;
    border: 3px solid #111;
    border-radius: 50%;
    background: #fff;
  }

  @media (hover: hover) {
    .tiles li:hover {
      rotate: 0deg;
    }

    .tiles a:hover {
      translate: -3px -3px;
      box-shadow: 8px 8px 0 #111;
    }
  }

  .featured {
    display: grid;
    gap: 2rem;
    justify-items: start;
  }

  .list {
    display: grid;
    gap: 1.25rem;
    width: 100%;
    margin: 0;
    padding: 0;
    list-style: none;
  }

  @media (min-width: 1024px) {
    .intro {
      grid-template-columns: minmax(0, 7fr) minmax(0, 5fr);
      align-items: center;
      gap: 4rem;
    }
  }
</style>
