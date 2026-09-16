<script lang="ts">
    import Projects from '$lib/components/Projects.svelte';
    import type { PageData } from './$types';

    export let data: PageData;
</script>

<Projects content={data.content.projects} />