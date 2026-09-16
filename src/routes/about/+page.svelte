<script lang="ts">
    import About from '$lib/components/About.svelte';
    import type { PageData } from './$types';

    export let data: PageData;
</script>

<About content={{ en: { experience: data.content.experience.en, ui: data.content.settings.en.ui }, fr: { experience: data.content.experience.fr, ui: data.content.settings.fr.ui } }} />