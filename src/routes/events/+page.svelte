<script lang="ts">
    import Events from '$lib/components/Events.svelte';
    import type { PageData } from './$types';

    export let data: PageData;
</script>

<main class="lg:w-1/2 md:w-2/3 sm:max-w-full m-auto">
       <Events content={data.content.events} ui={{ en: data.content.settings.en.ui, fr: data.content.settings.fr.ui }} />
</main>