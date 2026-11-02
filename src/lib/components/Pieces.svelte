<script lang="ts">
  import Icon from './Icon.svelte';

  // Stickers: icons about me, set in a loose row above a heading. They sit in the normal
  // flow, so they can never cover text at any width. Decoration only.
  type Sticker = { icon: string; size: number; turn: number; lift: number; bg: string; round?: boolean };

  let { track = 'home' }: { track?: string } = $props();

  const sets: Record<string, Sticker[]> = {
    web: [
      { icon: 'coffee', size: 84, turn: 8, lift: 0, bg: 'var(--accent)' },
      { icon: 'leaf', size: 60, turn: -12, lift: 14, bg: '#fff', round: true }
    ],
    game: [
      { icon: 'hat', size: 88, turn: -9, lift: 0, bg: 'var(--accent)', round: true },
      { icon: 'volleyball', size: 68, turn: 12, lift: 16, bg: '#fff', round: true }
    ],
    qa: [
      { icon: 'cat', size: 86, turn: 7, lift: 0, bg: 'var(--accent)' },
      { icon: 'bug', size: 62, turn: -14, lift: 14, bg: '#fff', round: true }
    ],
    software: [
      { icon: 'code', size: 86, turn: 10, lift: 0, bg: 'var(--accent)' },
      { icon: 'pot', size: 62, turn: -10, lift: 14, bg: '#fff' }
    ],
    home: [
      { icon: 'coffee', size: 76, turn: -8, lift: 0, bg: '#ffc933' },
      { icon: 'cat', size: 66, turn: 12, lift: 14, bg: 'var(--key)' }
    ]
  };

  const stickers = $derived(sets[track] ?? sets.home);
</script>

<div class="pieces" aria-hidden="true">
  {#each stickers as s, i (i)}
    <span
      class="sticker"
      class:round={s.round}
      style:--size={`${s.size}px`}
      style:--turn={`${s.turn}deg`}
      style:--lift={`${s.lift}px`}
      style:background={s.bg}
    >
      <Icon name={s.icon} size={s.size * 0.62} />
    </span>
  {/each}
</div>

<style>
  .pieces {
    display: flex;
    flex-wrap: wrap;
    align-items: flex-start;
    gap: 0.9rem;
    padding: 0.25rem 0.5rem 1.25rem 0.25rem;
    pointer-events: none;
  }

  .sticker {
    display: grid;
    place-items: center;
    flex: none;
    width: min(var(--size), 22vw);
    aspect-ratio: 1;
    border: 3px solid #111;
    border-radius: 10px;
    box-shadow: 4px 4px 0 #111;
    rotate: var(--turn);
    translate: 0 var(--lift);
  }

  .sticker :global(svg) {
    width: 62%;
    height: 62%;
  }

  .round {
    border-radius: 50%;
  }
</style>
