<script lang="ts">
  import SEO from '$lib/components/SEO.svelte';
  import Pieces from '$lib/components/Pieces.svelte';
  import BusinessCard from '$lib/components/BusinessCard.svelte';
  import ProjectRow from '$lib/components/ProjectRow.svelte';
  import TimelineRow from '$lib/components/TimelineRow.svelte';
  import ToolList from '$lib/components/ToolList.svelte';
  import { href } from '$lib/i18n';

  let { data } = $props();

  const lang = $derived(data.lang);
  const settings = $derived(data.content.settings);
  const ui = $derived(settings.ui);
  const track = $derived(data.track);
  const icons: Record<string, string> = { web: 'coffee', game: 'hat', qa: 'cat', software: 'code' };
</script>

<SEO title={track.hire} description={track.pitch} {lang} path={`/hire/${track.slug}`} />

<div data-track={track.slug}>
  <section class="wrap head">
    <div class="text">
      <Pieces track={track.slug} />
      <h1>{track.hire}</h1>
      <p class="pitch">{track.pitch}</p>
      <div class="actions">
        <a class="btn" href={track.resume} target="_blank" rel="noopener noreferrer">{ui.track.resume}</a>
        <a class="btn-quiet" href={href(lang, '/contact')}>{settings.navigation.contact}</a>
      </div>
    </div>

    <BusinessCard
      track={track.slug}
      icon={icons[track.slug] ?? 'coffee'}
      title={track.title}
      email={settings.contact.email}
      linkedin={settings.social.linkedin}
      github={settings.social.github}
      location={settings.contact.location}
      link={data.cardUrl}
      qr={data.qr}
      vcf={`/card/${track.slug}.vcf`}
      ui={ui.card}
    />
  </section>

  <section class="wrap block">
    <h2>{ui.track.featuredTitle}</h2>
    <ul class="list">
      {#each data.featured as project (project.slug)}
        <ProjectRow {project} {lang} ui={ui.common} />
      {/each}
    </ul>
  </section>

  {#if data.more.length}
    <section class="wrap block">
      <h2>{ui.track.moreTitle}</h2>
      <ul class="list">
        {#each data.more as project (project.slug)}
          <ProjectRow {project} {lang} ui={ui.common} />
        {/each}
      </ul>
    </section>
  {/if}

  {#if data.experience.length}
    <section class="wrap block">
      <h2>{ui.track.experienceTitle}</h2>
      <ul class="list">
        {#each data.experience as entry (entry.title + entry.location)}
          <TimelineRow {entry} {lang} ui={ui.common} />
        {/each}
      </ul>
    </section>
  {/if}

  <section class="wrap block">
    <h2>{ui.track.toolsTitle}</h2>
    <div class="tools"><ToolList tools={data.stack} /></div>
  </section>

  <section class="wrap block">
    <div class="cta block-card">
      <h2>{ui.track.ctaTitle}</h2>
      <p>{ui.track.ctaText}</p>
      <div class="actions">
        <a class="btn" href={`mailto:${settings.contact.email}`}>{ui.common.emailMe}</a>
        <a class="btn-quiet" href={href(lang, '/contact')}>{settings.navigation.contact}</a>
      </div>
    </div>
  </section>
</div>

<nav class="wrap others" aria-label={ui.track.otherRoles}>
  <p class="meta">{ui.track.otherRoles}</p>
  <ul>
    {#each data.others as other (other.slug)}
      <li data-track={other.slug}>
        <a href={href(lang, `/hire/${other.slug}`)}>{other.hire}</a>
      </li>
    {/each}
  </ul>
</nav>

<style>
  .head {
    display: grid;
    gap: 3rem;
    padding-top: clamp(2rem, 5vw, 4rem);
    isolation: isolate;
  }

  .text {
    position: relative;
    display: grid;
    gap: 1.5rem;
    align-content: start;
    padding-bottom: 1rem;
  }

  .text > :global(*:not(.pieces)) {
    position: relative;
    z-index: 1;
  }

  h1 {
    max-width: 11ch;
    font-size: var(--t-title);
    overflow-wrap: break-word;
  }

  .pitch {
    max-width: var(--measure);
    font-size: var(--t-lead);
    line-height: 1.5;
  }

  .actions {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 0.5rem 1.5rem;
    padding-top: 0.5rem;
  }

  .block {
    padding-top: var(--section);
  }

  h2 {
    display: inline-block;
    padding: 0.2em 0.5em;
    border: var(--border);
    border-radius: 8px;
    background: var(--accent);
    box-shadow: var(--hard-small);
    rotate: -1deg;
  }

  .list {
    display: grid;
    gap: 1.25rem;
    margin: 2rem 0 0;
    padding: 0;
    list-style: none;
  }

  .tools {
    margin-top: 1.5rem;
  }

  .cta {
    display: grid;
    gap: 1rem;
    justify-items: start;
    padding: clamp(1.25rem, 4vw, 2.5rem);
    background: var(--accent);
    rotate: 0.6deg;
  }

  .cta h2 {
    padding: 0;
    border: 0;
    background: none;
    box-shadow: none;
    rotate: 0deg;
  }

  .cta p {
    max-width: var(--measure);
  }

  .others {
    padding-top: calc(var(--section) / 2);
  }

  .others ul {
    display: flex;
    flex-wrap: wrap;
    gap: 0.75rem;
    margin: 0.5rem 0 0;
    padding: 0;
    list-style: none;
  }

  .others a {
    display: inline-flex;
    align-items: center;
    min-height: 2.75rem;
    padding: 0 1rem;
    border: var(--border);
    border-radius: 8px;
    background: var(--accent);
    box-shadow: var(--hard-small);
    font-stretch: 112%;
    font-weight: 800;
    text-decoration: none;
  }

  .others a:hover {
    translate: -1px -1px;
    box-shadow: var(--hard);
  }

  @media (min-width: 1024px) {
    .head {
      grid-template-columns: minmax(0, 1fr) minmax(0, 26rem);
      align-items: center;
      gap: 4rem;
    }
  }
</style>
