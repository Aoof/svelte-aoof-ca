<script lang="ts">
  import SEO from '$lib/components/SEO.svelte';
  import ExperienceCard from '$lib/components/ExperienceCard.svelte';
  import { href } from '$lib/i18n';

  let { data } = $props();

  const lang = $derived(data.lang);
  const ui = $derived(data.content.settings.ui);
  const entries = $derived(data.content.experience);
  const slug = (entry: { title: string; location: string }) =>
    `${entry.location}-${entry.title}`
      .toLowerCase()
      .normalize('NFD')
      .replace(/\p{M}/gu, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');

  const sections = $derived(
    (['job', 'education', 'volunteering'] as const)
      .map((kind) => ({
        kind,
        title: ui.experience[kind === 'job' ? 'jobs' : kind],
        rows: entries.filter((entry) => entry.kind === kind)
      }))
      .filter((section) => section.rows.length)
  );
  const other = $derived(entries.filter((entry) => entry.kind === 'other'));
  const now = $derived(entries.filter((entry) => entry.end === '' && entry.kind !== 'other'));
  const jumps = $derived([
    ...sections.map((section) => ({ id: section.kind, label: section.title })),
    ...(other.length ? [{ id: 'other', label: ui.experience.other }] : [])
  ]);

  // Breadcrumbs
  const breadcrumbs = $derived([
    { name: data.content.settings.navigation.home, url: href(lang, '/') },
    { name: ui.experience.title, url: href(lang, '/experience') }
  ]);
</script>

<SEO title={ui.experience.title} description={ui.seo.experience} {lang} path="/experience" breadcrumbs={breadcrumbs} />

<section class="wrap head">
  <h1>{ui.experience.title}</h1>
  <p class="intro">{ui.experience.intro}</p>

  {#if now.length}
    <ul class="now" aria-label={ui.common.now}>
      {#each now as entry (slug(entry))}
        <li>
          <a class="block-card" href={`#${slug(entry)}`}>
            <span class="pill">{ui.common.now}</span>
            <strong>{entry.location}</strong>
            <span>{entry.title}</span>
          </a>
        </li>
      {/each}
    </ul>
  {/if}

  <nav class="jumps" aria-label={ui.experience.jumpTo}>
    {#each jumps as jump (jump.id)}
      <a href={`#${jump.id}`}>{jump.label}</a>
    {/each}
  </nav>
</section>

{#each sections as section (section.kind)}
  <section class="wrap block" id={section.kind} aria-labelledby={`h-${section.kind}`}>
    <h2 id={`h-${section.kind}`}>{section.title}</h2>
    <ol class="rail">
      {#each section.rows as entry (slug(entry))}
        <ExperienceCard {entry} {lang} ui={ui.common} id={slug(entry)} />
      {/each}
    </ol>
  </section>
{/each}

{#if other.length}
  <section class="wrap block" id="other" aria-labelledby="h-other">
    <h2 id="h-other">{ui.experience.other}</h2>
    <p class="note">{ui.experience.otherNote}</p>
    <ul class="others">
      {#each other as entry (entry.title + entry.link)}
        <li class="block-card">
          <h3>
            {#if entry.link}
              <a href={entry.link} target="_blank" rel="noopener noreferrer">{entry.title}<span aria-hidden="true"> ↗</span></a>
            {:else}
              {entry.title}
            {/if}
          </h3>
          <div class="prose">{@html entry.description}</div>
        </li>
      {/each}
    </ul>
  </section>
{/if}

<style>
  .head {
    display: grid;
    gap: 1.25rem;
    padding-top: clamp(2rem, 5vw, 4rem);
  }

  h1 {
    font-size: var(--t-title);
  }

  .intro,
  .note {
    max-width: var(--measure);
  }

  .intro {
    font-size: var(--t-lead);
  }

  .now {
    display: grid;
    gap: 1rem;
    margin: 0.5rem 0 0;
    padding: 0;
    list-style: none;
  }

  .now a {
    display: grid;
    gap: 0.15rem;
    justify-items: start;
    height: 100%;
    padding: 1rem 1.25rem;
    color: var(--ink);
    text-decoration: none;
    transition:
      transform 120ms var(--ease),
      box-shadow 120ms var(--ease);
  }

  .now a:hover {
    transform: translate(-2px, -2px);
    box-shadow: 7px 7px 0 #111;
  }

  .now strong {
    font-stretch: 125%;
    font-weight: 900;
  }

  .pill {
    padding: 0.05rem 0.6rem;
    border: 2px solid var(--line);
    border-radius: 999px;
    background: #ffc933;
    font-weight: 800;
    font-size: var(--t-small);
  }

  .jumps {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
  }

  .jumps a {
    display: inline-flex;
    align-items: center;
    min-height: 2.75rem;
    padding: 0 1rem;
    border: 2px solid var(--line);
    border-radius: 999px;
    background: var(--raise);
    color: var(--ink);
    font-stretch: 112%;
    font-weight: 700;
    text-decoration: none;
    transition: background-color 150ms;
  }

  .jumps a:hover {
    background: var(--key-soft);
  }

  .block {
    padding-top: var(--section);
    scroll-margin-top: 4rem;
  }

  .rail {
    position: relative;
    display: grid;
    gap: 1.5rem;
    margin: 1.75rem 0 0;
    padding: 0;
    list-style: none;
  }

  .rail::before {
    content: '';
    position: absolute;
    left: 0;
    top: 1.6rem;
    bottom: 1.5rem;
    border-left: 3px solid var(--line);
  }

  .note {
    margin-top: 0.75rem;
  }

  .others {
    display: grid;
    gap: 1.25rem;
    margin: 1.5rem 0 0;
    padding: 0;
    list-style: none;
  }

  .others li {
    display: grid;
    gap: 0.5rem;
    align-content: start;
    padding: 1.25rem;
  }

  .others h3 {
    font-stretch: 125%;
    font-weight: 900;
    font-size: 1.25rem;
    overflow-wrap: anywhere;
  }

  @media (min-width: 640px) {
    .now {
      grid-template-columns: repeat(auto-fit, minmax(16rem, 1fr));
    }

    .others {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .now a {
      transition: none;
    }
  }
</style>
