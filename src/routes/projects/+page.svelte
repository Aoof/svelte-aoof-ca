<script lang="ts">
    import Projects from '$lib/components/Projects.svelte';
    import type { PageData } from './$types';

    export let data: PageData;
</script>

<main class="lg:w-1/2 md:w-2/3 sm:max-w-full m-auto">
    <Projects content={data.content.projects} />
</main>