<script lang="ts">

  import Home from '$lib/components/Home.svelte';
  import type { PageData, LayoutData } from './$types';

  export let data: PageData & LayoutData;

</script>

<Home content={data.content.home} skills={data.content.skills} settings={data.content.settings} />
