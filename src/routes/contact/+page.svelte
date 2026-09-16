<script lang="ts">
    import Contact from '$lib/components/Contact.svelte';
    import type { PageData } from './$types';

    export let data: PageData;
</script>

<main class="lg:w-1/2 md:w-2/3 sm:max-w-full m-auto">
    <Contact settings={data.content.settings} />
</main>