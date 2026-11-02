<script lang="ts">
  import { brandFor } from '$lib/icons';

  // `name` is either one of the hand-drawn icons below or a tool name such as "Docker".
  let { name, size = 24 }: { name: string; size?: number } = $props();

  const brand = $derived(brandFor(name));
  const drawn = [
    'coffee',
    'tea',
    'milk',
    'cat',
    'movies',
    'anime',
    'football',
    'code',
    'teach',
    'hike',
    'music',
    'flower',
    'leaf',
    'volleyball',
    'hat',
    'pot',
    'bug'
  ];
  const isDrawn = $derived(drawn.includes(name));
</script>

{#if isDrawn}
  <svg
    viewBox="0 0 24 24"
    width={size}
    height={size}
    fill="none"
    stroke="#111"
    stroke-width="1.8"
    stroke-linecap="round"
    stroke-linejoin="round"
    aria-hidden="true"
  >
    {#if name === 'coffee'}
      <path d="M4 9h12v5a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5z" fill="#ffc933" />
      <path d="M16 10.5h1.5a2.5 2.5 0 0 1 0 5H16" />
      <path d="M8 3v3M12 3v3" />
    {:else if name === 'tea'}
      <path d="M4 10h12v4a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5z" fill="#2ee59d" />
      <path d="M16 11.5h1.5a2.5 2.5 0 0 1 0 5H16" />
      <path d="M10 10V5l4-2" />
      <rect x="13" y="2" width="4" height="4" fill="#ff4d79" />
    {:else if name === 'milk'}
      <path d="M7 3h10l2 5v13H5V8z" fill="#fff" />
      <path d="M5 8h14" />
      <circle cx="12" cy="14.5" r="3" fill="#5b7cff" />
    {:else if name === 'cat'}
      <path d="M4 4l4 3h8l4-3v10a8 8 0 0 1-16 0z" fill="#ffc933" />
      <circle cx="9" cy="13" r="1" fill="#111" />
      <circle cx="15" cy="13" r="1" fill="#111" />
      <path d="M11 16l1 1 1-1M7 17H3M17 17h4" />
    {:else if name === 'movies'}
      <path d="M3 5h18v4H3z" fill="#ffc933" />
      <path d="M3 9h18v11H3z" fill="#fff" />
      <path d="M7 5L5 9M12 5l-2 4M17 5l-2 4" />
      <path d="M10 13.500l4 2.500-4 2.500z" fill="#ff4d79" />
    {:else if name === 'anime'}
      <path d="M2 12c3-5 7-7 10-7s7 2 10 7c-3 5-7 7-10 7s-7-2-10-7z" fill="#fff" />
      <circle cx="12" cy="12" r="4.200" fill="#a259ff" />
      <circle cx="12" cy="12" r="1.700" fill="#111" />
      <circle cx="13.600" cy="10.400" r="1" fill="#fff" stroke="none" />
    {:else if name === 'football'}
      <circle cx="12" cy="12" r="9.500" fill="#fff" />
      <path d="M12 8.500l3 2.200-1.200 3.500h-3.600L9 10.700z" fill="#111" />
      <path d="M12 8.500V2.600M15 10.700l5.500-1.800M13.800 14.200l3.200 4.800M10.200 14.200L7 19M9 10.700L3.500 8.900" />
    {:else if name === 'code'}
      <rect x="2" y="3.500" width="20" height="17" rx="3" fill="#2ee59d" />
      <path d="M8.500 8.500L5 12l3.500 3.500M15.500 8.500L19 12l-3.500 3.500M13.500 7l-3 10" />
    {:else if name === 'teach'}
      <rect x="2" y="3.500" width="20" height="13" rx="1.500" fill="#14b86c" />
      <path d="M6 8.500h8M6 12h5" stroke="#fff" />
      <path d="M8 21l2-4.500M16 21l-2-4.500" />
    {:else if name === 'hike'}
      <path d="M2 20l7-12 4 7 3-4 6 9z" fill="#5b7cff" />
      <path d="M9 8V3l4.500 1.700L9 6.500" fill="#ff4d79" />
    {:else if name === 'music'}
      <path d="M9 18V5l10-2v13" />
      <circle cx="6.5" cy="18" r="2.8" fill="#a259ff" />
      <circle cx="16.5" cy="16" r="2.8" fill="#a259ff" />
    {:else if name === 'flower'}
      <circle cx="12" cy="6" r="3.4" fill="#ff4d79" />
      <circle cx="18" cy="10.5" r="3.4" fill="#ff4d79" />
      <circle cx="15.8" cy="17" r="3.4" fill="#ff4d79" />
      <circle cx="8.2" cy="17" r="3.4" fill="#ff4d79" />
      <circle cx="6" cy="10.5" r="3.4" fill="#ff4d79" />
      <circle cx="12" cy="12" r="2.8" fill="#ffc933" />
    {:else if name === 'leaf'}
      <path d="M4 20C4 10 9 5 20 4c0 11-5 16-16 16z" fill="#2ee59d" />
      <path d="M4 20L14 10" />
    {:else if name === 'volleyball'}
      <defs><clipPath id="ball"><circle cx="12" cy="12" r="9.5" /></clipPath></defs>
      <circle cx="12" cy="12" r="9.5" fill="#ffd23f" />
      <g clip-path="url(#ball)">
        <path d="M0 7C8 6 15 10 24 19V24H18C12 15 6 10.500 0 10.500z" fill="#2457d6" />
        <path d="M10 0c1 5 4 8 14 9V5.500C18 4.500 16 2.500 15.500 0z" fill="#2457d6" />
        <path d="M0 7C8 6 15 10 24 19M0 10.500C6 10.500 12 15 18 24M10 0c1 5 4 8 14 9M15.500 0c.5 2.500 2.500 4.500 8.500 5.500" stroke-width="1" />
      </g>
      <circle cx="12" cy="12" r="9.5" />
    {:else if name === 'hat'}
      <ellipse cx="12" cy="16" rx="10.5" ry="3.5" fill="#ffc933" />
      <path d="M6 15c0-6 3-9.500 6-9.500s6 3.500 6 9.500" fill="#ffc933" />
      <path d="M6.500 12.500c3.500 1.200 7.500 1.200 11 0" stroke="#ff4d79" stroke-width="2.600" />
    {:else if name === 'pot'}
      <path d="M4 10h16v6a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4z" fill="#ff4d79" />
      <path d="M2 11h2M20 11h2M8 3c1 1 1 2 0 3M13 3c1 1 1 2 0 3" />
    {:else if name === 'bug'}
      <ellipse cx="12" cy="14" rx="5" ry="6.500" fill="#2ee59d" />
      <path d="M9 8c0-3 6-3 6 0M12 8v12M7 12H3M17 12h4M7.500 17L4 19M16.500 17l3.500 2M8 6L6 3M16 6l2-3" />
    {/if}
  </svg>
{:else if brand}
  <svg viewBox="0 0 24 24" width={size} height={size} role="img" aria-label={brand.title}>
    <path d={brand.path} fill={`#${brand.hex}`} />
  </svg>
{/if}
