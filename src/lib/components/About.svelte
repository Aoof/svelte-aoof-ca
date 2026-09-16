<script lang="ts">
    import { _ } from 'svelte-i18n';
    import { language } from '$lib/../stores/index';
    import type { Event, Experience } from '$lib/content/types';
    import { sanitizeHtml } from '$lib/content/sanitize';

    export let content: {
        en: { experience: Experience[]; events: Event[] };
        fr: { experience: Experience[]; events: Event[] };
    };

    $: localizedContent = content?.[$language === 'fr' ? 'fr' : 'en'] ?? content?.en;
    $: workExperiences = localizedContent?.experience ?? [];
    $: eventsAndCompetitions = localizedContent?.events ?? [];
</script>

<article class="bg-dark w-full p-4 rounded-lg justify-center items-center" id="about">
    <div class="content flex flex-col h-full my-4 text-lg overflow-auto">
        <div class="content-group">
            <h3 class="text-white text-2xl mt-4 font-bold">{$_('about.workExperienceTitle')}</h3>
            <ol class="relative border-s border-gray-200 m-4">
                {#each workExperiences as experience (experience.title)}
                    <li class="mb-10 ms-4">
                        <div class="absolute w-4 h-4 rounded-full mt-2 -start-2 {experience.current ? 'bg-pink' : 'bg-white'}"></div>
                        <time class="mb-1 text-sm font-normal leading-none">{experience.date}
                            {#if experience.current}
                                <span class="text-sm leading-none bg-pink font-black text-dark py-1 px-3 mx-3 rounded-lg select-none">{$_('about.current')}</span>
                            {/if}
                        </time>
                        <h3 class="text-lg font-semibold">{experience.title}</h3>
                        <p class="mb-4 text-sm font-normal leading-none">{experience.location}</p>
                        <p class="mb-4 text-base font-normal text-gray-500">{@html sanitizeHtml(experience.description.replace(/;\[(.*?)\]/g, '<span class="keyword">$1</span>'))}</p>
                    </li>
                {/each}
            </ol>
        </div>
        <div class="content-group">
            <h3 class="text-white text-2xl mt-4 font-bold">{$_('about.eventsCompetitionsTitle')}</h3>
            <p class="my-4 text-lg">{$_('about.eventsCompetitionsDescription')}</p>
            {#each eventsAndCompetitions as event (event.name)}
                <div class="card border border-gray p-4 rounded-lg mb-4">
                    {#if event.image}
                        <img src={event.image} alt={event.name} class="w-full h-48 object-cover rounded-lg mb-4" />
                    {/if}
                    {#if event.link}
                        <div class="float-right">
                            <a href={event.link} target="_blank" rel="noreferrer" class="text-dark py-2 px-4 font-bold rounded bg-pink hover:opacity-80 transition-opacity ease-out text-sm cursor-pointer">{$_('about.linkedinPost')}</a>
                        </div>
                    {/if}
                    <h4 class="text-2xl font-semibold text-white">{event.name}</h4>
                    <div class="mb-2"><span class="text-gray text-sm">{event.location}</span> <span class="text-gray text-sm">{event.time}</span></div>
                    <p class="text-lg">{@html sanitizeHtml(event.summary.replace(/;\[(.*?)\]/g, '<span class="keyword">$1</span>'))}</p>
                </div>
            {/each}
        </div>
        <div class="content-group">
            <h3 class="text-white text-2xl mt-4 font-bold">{$_('about.websiteTitle')}</h3>
            <p class="my-4 text-lg">{$_('about.websiteDescription')}</p>
        </div>
    </div>
</article>
