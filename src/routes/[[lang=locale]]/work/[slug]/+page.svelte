<script lang="ts">
  import SEO from '$lib/components/SEO.svelte';
  import { href, period } from '$lib/i18n';

  let { data } = $props();

  const lang = $derived(data.lang);
  const ui = $derived({ ...data.content.settings.ui.common, ...data.content.settings.ui.case });
  const project = $derived(data.project);
  const when = $derived(project.when ?? period(lang, project.start, project.end, { present: ui.present }));
  const facts = $derived(
    [
      { label: ui.role, value: project.role },
      { label: ui.when, value: when },
      { label: ui.team, value: project.team },
      { label: ui.tools, value: project.stack.join(', ') }
    ].filter((fact) => fact.value)
  );
  const sections = $derived(
    (['problem', 'did', 'with', 'result'] as const)
      .filter((key) => project.story?.[key])
      .map((key) => ({ title: ui[key], html: project.story![key]! }))
  );
</script>

<SEO
  title={project.name}
  description={project.summary}
  {lang}
  path={`/work/${project.slug}`}
  image={project.image}
/>

<article data-track={project.tracks[0]}>
  <header class="wrap head">
    <a class="btn-quiet back" href={href(lang, '/work')}>{ui.back}</a>
    <h1>{project.name}</h1>
    <p class="summary">{project.summary}</p>

    {#if project.links.length}
      <div class="actions">
        {#each project.links as link, i (link.url)}
          <a
            class={i === 0 ? 'btn' : 'btn-quiet'}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer">{link.label}</a
          >
        {/each}
      </div>
    {/if}

    <dl class="facts">
      {#each facts as fact (fact.label)}
        <div>
          <dt class="meta">{fact.label}</dt>
          <dd>{fact.value}</dd>
        </div>
      {/each}
    </dl>
  </header>

  {#if project.image}
    <div class="wrap shot">
      <img src={project.image} alt="" width="1120" height="700" decoding="async" />
    </div>
  {/if}

  <div class="wrap body">
    {#each sections as section (section.title)}
      <section>
        <h2>{section.title}</h2>
        <div class="prose">{@html section.html}</div>
      </section>
    {/each}

    {#if project.description}
      <section>
        {#if sections.length}<h2>{ui.more}</h2>{/if}
        <div class="prose">{@html project.description}</div>
      </section>
    {/if}
  </div>
</article>

<style>
  .head {
    display: grid;
    gap: 1.25rem;
    padding-top: clamp(1.5rem, 4vw, 3rem);
  }

  .back {
    justify-self: start;
    margin-left: -0.25rem;
  }

  h1 {
    font-size: var(--t-title);
    overflow-wrap: anywhere;
  }

  .summary {
    max-width: var(--measure);
    font-size: var(--t-lead);
    line-height: 1.5;
  }

  .actions {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 0.5rem 1.5rem;
  }

  .facts {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(13rem, 1fr));
    gap: 1.25rem 2rem;
    margin: 1rem 0 0;
    padding-top: 1.5rem;
    border-top: 1px solid var(--line);
  }

  dt {
    margin-bottom: 0.15rem;
  }

  dd {
    margin: 0;
    overflow-wrap: anywhere;
  }

  .shot {
    padding-top: 2.5rem;
  }

  .shot img {
    display: block;
    width: 100%;
    max-height: 36rem;
    object-fit: cover;
    border-radius: 4px;
    background: var(--raise);
  }

  .body {
    display: grid;
    gap: 3rem;
    padding-top: 3rem;
  }

  .body h2 {
    margin-bottom: 1rem;
    font-size: 1.5rem;
  }
</style>
