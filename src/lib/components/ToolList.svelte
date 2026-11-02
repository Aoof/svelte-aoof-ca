<script lang="ts">
  import Icon from './Icon.svelte';
  import { brandFor } from '$lib/icons';

  let { tools }: { tools: string[] } = $props();
</script>

<ul class="tools">
  {#each tools as tool (tool)}
    <li>
      {#if brandFor(tool)}<Icon name={tool} size={16} />{/if}
      <span>{tool}</span>
    </li>
  {/each}
</ul>

<style>
  .tools {
    display: flex;
    flex-wrap: wrap;
    gap: 0.4rem;
    margin: 0;
    padding: 0;
    list-style: none;
  }

  li {
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    min-height: 1.75rem;
    padding: 0.1rem 0.55rem;
    border: 2px solid #111;
    border-radius: 999px;
    background: #fff;
    font-stretch: 90%;
    font-weight: 600;
    font-size: 0.875rem;
    line-height: 1.2;
  }

  li :global(svg) {
    flex: none;
  }
</style>
