<script lang="ts">
  import type { Locale, Strings } from '$lib/content/types';

  // The résumé button. It asks which résumé you want, with the page's language already picked.
  let {
    tracks,
    lang,
    ui,
    label,
    closeLabel
  }: {
    tracks: { slug: string; title: string; resume: string }[];
    lang: Locale;
    ui: Strings;
    label: string;
    closeLabel: string;
  } = $props();

  let dialog: HTMLDialogElement;
  let pick = $state<Locale>('en');

  const languages: [Locale, string][] = [
    ['en', 'English'],
    ['fr', 'Français']
  ];
  const file = (resume: string) => resume.replace(/-(en|fr)\.pdf$/, `-${pick}.pdf`);

  function open() {
    pick = lang;
    dialog.showModal();
  }

  // A click on the dimmed area lands on the dialog element itself.
  function onclick(event: MouseEvent) {
    if (event.target === dialog) dialog.close();
  }
</script>

<button class="btn" type="button" onclick={open}>{label}</button>

<dialog bind:this={dialog} aria-labelledby="resume-title" {onclick}>
  <div class="panel">
    <h2 id="resume-title">{ui.title}</h2>

    <div class="langs" role="group" aria-label={ui.language}>
      {#each languages as [code, name] (code)}
        <button type="button" class="lang" aria-pressed={pick === code} onclick={() => (pick = code)}>
          {name}
        </button>
      {/each}
    </div>

    <ul>
      {#each tracks as track (track.slug)}
        <li data-track={track.slug}>
          <a href={file(track.resume)} target="_blank" rel="noopener noreferrer" onclick={() => dialog.close()}>
            {track.title}
          </a>
        </li>
      {/each}
    </ul>

    <button class="btn-quiet" type="button" onclick={() => dialog.close()}>{closeLabel}</button>
  </div>
</dialog>

<style>
  dialog {
    width: min(26rem, calc(100% - 2.5rem));
    max-height: calc(100dvh - 2.5rem);
    margin: auto;
    padding: 0;
    border: var(--border);
    border-radius: 10px;
    background: var(--raise);
    color: var(--ink);
    box-shadow: 8px 8px 0 #111;
    overflow: auto;
  }

  dialog::backdrop {
    background: #111111b3;
  }

  .panel {
    display: grid;
    gap: 1.25rem;
    justify-items: start;
    padding: 1.5rem;
  }

  h2 {
    font-size: 1.5rem;
  }

  .langs {
    display: flex;
    gap: 0.5rem;
  }

  .lang {
    min-height: 2.75rem;
    padding: 0 1rem;
    border: 3px solid #111;
    border-radius: 8px;
    background: #fff;
    font: inherit;
    font-stretch: 112%;
    font-weight: 800;
    cursor: pointer;
  }

  .lang[aria-pressed='true'] {
    background: var(--key);
    box-shadow: 3px 3px 0 #111;
  }

  ul {
    display: grid;
    gap: 0.75rem;
    width: 100%;
    margin: 0;
    padding: 0;
    list-style: none;
  }

  li a {
    display: flex;
    align-items: center;
    min-height: 3rem;
    padding: 0 1rem;
    border: 3px solid #111;
    border-radius: 8px;
    background: var(--accent);
    box-shadow: 3px 3px 0 #111;
    color: #111;
    font-stretch: 112%;
    font-weight: 800;
    text-decoration: none;
  }

  li a:hover {
    translate: -1px -1px;
    box-shadow: 5px 5px 0 #111;
  }
</style>
