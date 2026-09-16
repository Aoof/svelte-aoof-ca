<script lang="ts">
    import { language } from '$lib/../stores/index';
    import ProjectCard from './ProjectCard.svelte';
    import type { Project } from '$lib/content/types';
    import { sanitizeHtml } from '$lib/content/sanitize';

    export let content: { en: Project[]; fr: Project[] };
    $: projects = content?.[$language === 'fr' ? 'fr' : 'en'] ?? content?.en ?? [];

    const fontAwesomeIcons: Record<string, string> = {
        certificate: 'fa-solid fa-certificate',
        bug: 'fa-solid fa-bug',
        language: 'fa-solid fa-language'
    };

    const toTag = (tag: Project['tags'][number]) => ({
        title: tag.title,
        iconClass: tag.icon_class ?? (tag.icon ? fontAwesomeIcons[tag.icon] ?? '' : ''),
        component: tag.icon && !fontAwesomeIcons[tag.icon] ? tag.icon : undefined
    });
</script>

<article class="h-full w-full p-4 bg-dark flex flex-col gap-10" id="projects">
    <h3 class="text-white text-2xl font-bold mt-4">Projects</h3>
    {#each projects as project (project.name)}
        <ProjectCard {...project} description={sanitizeHtml(project.description)} tags={project.tags.map(toTag)} />
    {/each}
</article>
