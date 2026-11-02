<script lang="ts">
  import Icon from './Icon.svelte';

  // Stickers: icons about me, stuck on at odd angles. Decoration only.
  type Sticker = { icon: string; x: string; y: string; size: number; turn: number; bg: string; round?: boolean };

  let { track = 'home' }: { track?: string } = $props();

  const sets: Record<string, Sticker[]> = {
    web: [
      { icon: 'coffee', x: '84%', y: '4%', size: 84, turn: 8, bg: 'var(--accent)' },
      { icon: 'leaf', x: '68%', y: '24%', size: 60, turn: -12, bg: '#fff', round: true }
    ],
    game: [
      { icon: 'hat', x: '82%', y: '4%', size: 92, turn: -9, bg: 'var(--accent)', round: true },
      { icon: 'volleyball', x: '66%', y: '24%', size: 78, turn: 12, bg: '#fff', round: true }
    ],
    qa: [
      { icon: 'cat', x: '83%', y: '3%', size: 90, turn: 7, bg: 'var(--accent)' },
      { icon: 'bug', x: '68%', y: '24%', size: 62, turn: -14, bg: '#fff', round: true }
    ],
    software: [
      { icon: 'code', x: '83%', y: '3%', size: 92, turn: 10, bg: 'var(--accent)' },
      { icon: 'pot', x: '68%', y: '24%', size: 62, turn: -10, bg: '#fff' }
    ],
    home: [
      { icon: 'coffee', x: '56%', y: '2%', size: 76, turn: -8, bg: '#ffc933' },
      { icon: 'cat', x: '96%', y: '6%', size: 70, turn: 12, bg: 'var(--key)' }
    ]
  };

  const stickers = $derived(sets[track] ?? sets.home);
</script>

<div class="pieces" aria-hidden="true">
  {#each stickers as s, i (i)}
    <span
      class="sticker"
      class:round={s.round}
      style:left={`min(${s.x}, calc(100% - ${s.size}px - 8px))`}
      style:top={`min(${s.y}, calc(100% - ${s.size}px))`}
      style:--size={`${s.size}px`}
      style:--turn={`${s.turn}deg`}
      style:background={s.bg}
    >
      <Icon name={s.icon} size={s.size * 0.62} />
    </span>
  {/each}
</div>

<style>
  .pieces {
    position: absolute;
    inset: 0;
    z-index: 2;
    pointer-events: none;
  }

  .sticker {
    position: absolute;
    display: grid;
    place-items: center;
    width: var(--size);
    height: var(--size);
    border: 3px solid #111;
    border-radius: 10px;
    box-shadow: 4px 4px 0 #111;
    rotate: var(--turn);
    scale: 0.7;
  }

  .round {
    border-radius: 50%;
  }

  @media (max-width: 639px) {
    .sticker {
      display: none;
    }
  }

  @media (min-width: 768px) {
    .sticker {
      scale: 1;
    }
  }
</style>
