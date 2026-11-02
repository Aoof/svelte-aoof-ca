<script lang="ts">
  import Icon from './Icon.svelte';

  // A strip of things I like. `items` is [icon, label] and comes from settings.
  let { items, label }: { items: [string, string][]; label: string } = $props();
</script>

<div class="frame">
<section class="ticker" aria-label={label}>
  <div class="track">
    {#each [0, 1] as copy (copy)}
      <ul aria-hidden={copy === 1 ? 'true' : undefined}>
        {#each items as [icon, text] (text)}
          <li><Icon name={icon} size={28} /> <span>{text}</span></li>
        {/each}
      </ul>
    {/each}
  </div>
</section>
</div>

<style>
  .frame {
    margin-block: var(--section);
    padding-block: 1.25rem;
    overflow: hidden;
  }

  .ticker {
    overflow: hidden;
    border-block: 3px solid #111;
    background: var(--key);
    transform: rotate(-1.2deg) scaleX(1.03);
  }

  .track {
    display: flex;
    width: max-content;
  }

  ul {
    display: flex;
    flex: none;
    gap: 2.5rem;
    margin: 0;
    padding: 0.7rem 1.25rem;
    list-style: none;
  }

  li {
    display: inline-flex;
    align-items: center;
    gap: 0.6rem;
    font-stretch: 125%;
    font-weight: 900;
    font-size: 1.25rem;
    white-space: nowrap;
  }

  @media (prefers-reduced-motion: no-preference) {
    .track {
      animation: slide 38s linear infinite;
    }

    .ticker:hover .track {
      animation-play-state: paused;
    }
  }

  @keyframes slide {
    to {
      transform: translateX(-50%);
    }
  }
</style>
