<script lang="ts">
    import Events from '$lib/components/Events.svelte';
    import type { PageData } from './$types';

    export let data: PageData;
</script>

<Events content={data.content.events} ui={{ en: data.content.settings.en.ui, fr: data.content.settings.fr.ui }} />