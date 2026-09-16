<script lang="ts">
    import { language } from '$lib/../stores/index';
    import ProjectCard from './ProjectCard.svelte';
    import type { Project } from '$lib/content/types';
    import { sanitizeHtml } from '$lib/content/sanitize';

    export let content: { en: Project[]; fr: Project[] };
    $: projects = content?.[$language === 'fr' ? 'fr' : 'en'] ?? content?.en ?? [];
</script>

<article class="h-full w-full p-4 bg-dark flex flex-col gap-10" id="projects">
    <h3 class="text-white text-2xl font-bold mt-4">Projects</h3>
    {#each projects as project (project.name)}
        <ProjectCard {...project} description={sanitizeHtml(project.description)} tags={project.tags.map((tag) => ({ title: tag.title, iconClass: tag.icon_class ?? '', component: tag.icon }))} />
    {/each}
</article>
