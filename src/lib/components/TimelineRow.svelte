<script lang="ts">
  import { href, period } from '$lib/i18n';
  import type { Experience, Locale, Strings } from '$lib/content/types';

  let { entry, lang, ui }: { entry: Experience; lang: Locale; ui: Strings } = $props();

  const when = $derived(
    period(lang, entry.start, entry.end, { present: ui.present, expected: ui.expected }, entry.expected)
  );
</script>

<li class="row">
  <p class="when meta">{when}</p>
  <div class="text">
    <h3>{entry.title}</h3>
    <p class="org meta">{entry.location}</p>
    <div class="prose">{@html entry.description}</div>
    {#if entry.project}
      <a class="more" href={href(lang, `/work/${entry.project}`)}>{ui.readMore}</a>
    {:else if entry.link}
      <a class="more" href={entry.link} target="_blank" rel="noopener noreferrer">{entry.link.replace(/^https?:\/\/(www\.)?/, '')}</a>
    {/if}
  </div>
</li>

<style>
  .row {
    display: grid;
    gap: 0.5rem;
    padding-block: 1.5rem;
    border-top: 3px solid #111;
  }

  .when {
    margin: 0;
  }

  .text {
    display: grid;
    gap: 0.5rem;
    min-width: 0;
  }

  h3 {
    overflow-wrap: anywhere;
  }

  .org {
    margin: 0;
  }

  .more {
    justify-self: start;
    min-height: 2.75rem;
    display: inline-flex;
    align-items: center;
    overflow-wrap: anywhere;
  }

  @media (min-width: 640px) {
    .row {
      grid-template-columns: 9.5rem minmax(0, 1fr);
      column-gap: 2rem;
    }
  }
</style>
