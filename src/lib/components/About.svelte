<script lang="ts">
    import { language } from '$lib/../stores/index';
    import type { Experience, UiContent } from '$lib/content/types';
    import { sanitizeHtml } from '$lib/content/sanitize';

    export let content: {
        en: { experience: Experience[]; ui: UiContent };
        fr: { experience: Experience[]; ui: UiContent };
    };

    $: localizedContent = content?.[$language === 'fr' ? 'fr' : 'en'] ?? content?.en;
    $: workExperiences = (localizedContent?.experience ?? []) as Experience[];
</script>

<article class="bg-dark w-full p-4 rounded-lg justify-center items-center" id="about">
    <div class="content flex flex-col h-full my-4 text-lg overflow-auto">
        <div class="content-group">
            <h3 class="text-white text-2xl mt-4 font-bold">{localizedContent.ui.about.workExperienceTitle}</h3>
            <ol class="relative border-s border-gray-200 m-4">
                {#each workExperiences as experience (experience.title)}
                    <li class="mb-10 ms-4">
                        <div class="absolute w-4 h-4 rounded-full mt-2 -start-2 {experience.current ? 'bg-pink' : 'bg-white'}"></div>
                        <time class="mb-1 text-sm font-normal leading-none">{experience.date}
                            {#if experience.current}
                                <span class="text-sm leading-none bg-pink font-black text-dark py-1 px-3 mx-3 rounded-lg select-none">{localizedContent.ui.about.current}</span>
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
            <h3 class="text-white text-2xl mt-4 font-bold">{localizedContent.ui.about.websiteTitle}</h3>
            <p class="my-4 text-lg">{localizedContent.ui.about.websiteDescription}</p>
        </div>
    </div>
</article>
