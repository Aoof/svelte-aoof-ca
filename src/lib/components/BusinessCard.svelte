<script lang="ts">
  import Icon from './Icon.svelte';
  import type { Strings } from '$lib/content/types';

  // The printable 3.5 x 2 inch card, made interactive: click to flip, copy the email,
  // save the contact, or print it at real size. Sizes use container units, so the same
  // markup fills a phone screen and prints at 3.5 inches wide.
  let {
    track,
    icon,
    title,
    email,
    linkedin,
    github,
    location,
    link,
    qr,
    vcf,
    ui
  }: {
    track: string;
    icon: string;
    title: string;
    email: string;
    linkedin: string;
    github: string;
    location: string;
    link: string;
    qr: string;
    vcf: string;
    ui: Strings;
  } = $props();

  let flipped = $state(false);
  let copied = $state(false);
  const bare = (url: string) => url.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '');

  async function copy() {
    try {
      await navigator.clipboard.writeText(email);
      copied = true;
      setTimeout(() => (copied = false), 2000);
    } catch {
      window.location.href = `mailto:${email}`;
    }
  }
</script>

{#snippet front()}
  <div class="face-inner front">
    <span class="tab" aria-hidden="true"><Icon name={icon} size={26} /></span>
    <div>
      <p class="name">Abdulrahman Mousa</p>
      <p class="role">{title}</p>
    </div>
    <ul class="lines">
      <li>{email}</li>
      <li>{bare(linkedin)}</li>
      <li>{bare(github)}</li>
      <li>{location}</li>
    </ul>
  </div>
{/snippet}

{#snippet back()}
  <div class="face-inner rear">
    <div class="qr">{@html qr}</div>
    <div class="note">
      <p class="scan">{ui.scan}</p>
      <p class="url">{bare(link)}</p>
    </div>
  </div>
{/snippet}

<div class="widget" data-track={track}>
  <button
    class="card"
    class:flipped
    type="button"
    aria-pressed={flipped}
    aria-label={flipped ? ui.showFront : ui.showBack}
    onclick={() => (flipped = !flipped)}
  >
    <span class="flipper">
      <span class="face" inert={flipped} aria-hidden={flipped}>{@render front()}</span>
      <span class="face rear-face" inert={!flipped} aria-hidden={!flipped}>{@render back()}</span>
    </span>
  </button>

  <div class="actions">
    <button class="btn" type="button" onclick={() => (flipped = !flipped)}>{ui.flip}</button>
    <button class="btn-quiet" type="button" onclick={copy} aria-live="polite">{copied ? ui.copied : ui.copyEmail}</button>
    <a class="btn-quiet" href={vcf} download>{ui.saveContact}</a>
    <button class="btn-quiet" type="button" onclick={() => window.print()}>{ui.print}</button>
  </div>

  <!-- Only visible when printing: both faces at real size. -->
  <div class="print-area" aria-hidden="true">
    <div class="print-card"><span class="face">{@render front()}</span></div>
    <div class="print-card"><span class="face rear-face">{@render back()}</span></div>
  </div>
</div>

<style>
  .widget {
    display: grid;
    gap: 1.25rem;
    justify-items: start;
    width: 100%;
    max-width: 26rem;
  }

  .card {
    display: block;
    width: 100%;
    aspect-ratio: 7 / 4;
    padding: 0;
    border: 0;
    background: none;
    color: inherit;
    font: inherit;
    text-align: left;
    cursor: pointer;
    perspective: 900px;
    container-type: inline-size;
  }

  .flipper {
    position: relative;
    display: block;
    width: 100%;
    height: 100%;
    transform-style: preserve-3d;
    transition: transform 450ms var(--ease);
  }

  .card.flipped .flipper {
    transform: rotateY(180deg);
  }

  .face {
    position: absolute;
    inset: 0;
    display: block;
    overflow: hidden;
    border: 3px solid #111;
    border-radius: 3cqw;
    background: #fff;
    color: #111;
    box-shadow: 5px 5px 0 #111;
    backface-visibility: hidden;
  }

  .rear-face {
    background: var(--accent);
    transform: rotateY(180deg);
  }

  @media (prefers-reduced-motion: reduce) {
    .flipper {
      transition: none;
      transform: none !important;
    }

    .face {
      transition: opacity 150ms;
      backface-visibility: visible;
    }

    .rear-face {
      transform: none;
      opacity: 0;
    }

    .card.flipped .rear-face {
      opacity: 1;
    }

    .card.flipped .face:not(.rear-face) {
      opacity: 0;
    }
  }

  .face-inner {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
    box-sizing: border-box;
    padding: 5.5cqw 6cqw;
  }

  .tab {
    position: absolute;
    top: -1px;
    right: 6cqw;
    display: grid;
    place-items: center;
    width: 12cqw;
    height: 14cqw;
    border: 3px solid #111;
    border-top: 0;
    border-radius: 0 0 2cqw 2cqw;
    background: var(--accent);
  }

  .name {
    font-stretch: 125%;
    font-weight: 900;
    font-size: 5.6cqw;
    line-height: 1.05;
  }

  .role {
    display: inline-block;
    margin-top: 1.6cqw;
    padding: 0.6cqw 2cqw;
    border: 2px solid #111;
    border-radius: 1cqw;
    background: var(--accent);
    font-stretch: 112%;
    font-weight: 800;
    font-size: 3.6cqw;
  }

  .lines {
    margin: 0;
    padding: 0;
    list-style: none;
    font-stretch: 90%;
    font-weight: 600;
    font-size: 3.1cqw;
    line-height: 1.5;
  }

  .rear {
    flex-direction: row;
    align-items: center;
    gap: 6cqw;
  }

  .qr {
    flex: none;
    width: 38cqw;
    padding: 2.5cqw;
    box-sizing: border-box;
    border: 3px solid #111;
    border-radius: 2cqw;
    background: #fff;
    line-height: 0;
  }

  .qr :global(svg) {
    display: block;
    width: 100%;
    height: auto;
  }

  .note {
    display: grid;
    gap: 1.5cqw;
    min-width: 0;
  }

  .scan {
    font-stretch: 125%;
    font-weight: 900;
    font-size: 4.4cqw;
    line-height: 1.1;
  }

  .url {
    font-stretch: 90%;
    font-weight: 700;
    font-size: 3.1cqw;
    overflow-wrap: anywhere;
  }

  .actions {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 0.25rem 1.25rem;
  }

  .print-area {
    display: none;
  }

  @media print {
    .print-area {
      position: absolute;
      top: 0.5in;
      left: 0.5in;
      display: flex;
      gap: 0.25in;
    }

    .print-card {
      position: relative;
      width: 3.5in;
      height: 2in;
      container-type: inline-size;
    }

    .print-card .face {
      box-shadow: none;
      backface-visibility: visible;
      print-color-adjust: exact;
      -webkit-print-color-adjust: exact;
    }

    .print-card .rear-face {
      transform: none;
      opacity: 1;
    }
  }
</style>
