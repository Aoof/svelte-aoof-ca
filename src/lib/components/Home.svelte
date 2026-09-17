<script lang="ts">
    import Tag from './Tag.svelte';
    import ResumeModal from './ResumeModal.svelte';
    import { language } from '$lib/../stores/index';
    import type { HomeContent, SiteSettings, SkillsContent } from '$lib/content/types';
    import { sanitizeHtml } from '$lib/content/sanitize';

    export let content: { en: HomeContent; fr: HomeContent };
    export let skills: SkillsContent;
    export let settings: { en: SiteSettings; fr: SiteSettings };

    type Skill = { title: string; component?: string; iconClass?: string };
    type SkillCategory = 'proficient' | 'familiar';

    const fallbackSkills: Record<SkillCategory, Skill[]> = {
        "proficient": [
            { title: "Python", iconClass: "fa-brands fa-python" },
            { title: "C#", component: "CsharpIcon" },
            { title: "Java", iconClass: "fa-brands fa-java" },
            { title: "HTML5", iconClass: "fa-brands fa-html5" },
            { title: "Svelte", component: "SvelteIcon" },
            { title: "Express.js", component: "ExpressIcon" },
            { title: "JavaScript", iconClass: "fa-brands fa-js" },
            { title: "CSS", iconClass: "fa-brands fa-css3-alt" },
        ],
        "familiar": [
            { title: "C++", component: "CppIcon" },
            { title: "MongoDB", component: "MongodbIcon" },
            { title: "MySQL", component: "MySQLIcon" },
            { title: "Shopify", component: "ShopifyIcon" },
            { title: "Neovim", component: "NeovimIcon"},
            { title: "Tailwind CSS", component: "TailwindIcon" },
            { title: "TypeScript", component: "TypescriptIcon" }, // No icon
            { title: "React", iconClass: "fa-brands fa-react" },
            { title: "PHP", iconClass: "fa-brands fa-php" },
            { title: "Bootstrap", iconClass: "fa-brands fa-bootstrap" },
            { title: "Sass", iconClass: "fa-brands fa-sass" },
            { title: "C Language", iconClass: "fa-brands fa-c" },
            { title: "Node.js", iconClass: "fa-brands fa-node-js" },
            { title: "Git", iconClass: "fa-brands fa-git" },
            { title: "GitHub", iconClass: "fa-brands fa-github" },
            { title: "Linux", iconClass: "fa-brands fa-linux" },
        ]
    }

    const skillCategories: SkillCategory[] = ['proficient', 'familiar'];
    let isFamiliarExpanded = false;
    let isResumeModalOpen = false;

    $: localizedContent = content?.[$language === 'fr' ? 'fr' : 'en'] ?? content?.en;
    $: localizedSkills = skills ?? fallbackSkills;
    $: localizedSettings = settings?.[$language === 'fr' ? 'fr' : 'en'] ?? settings?.en;

    const openResumeModal = () => {
        isResumeModalOpen = true;
    }
</script>

<article class="h-full w-full p-4 bg-dark" id="home">
    <section class="border border-gray rounded"> 
        <img src="/media/hero-banner.jpg" alt="Hero Banner" class="w-full h-48 object-cover rounded-t" />
        <div class="p-5">
            <div class="flex justify-center gap-4 w-fit float-right">
                <a href="https://github.com/aoof" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                    <i class="fab fa-github text-gray hover:text-pink"></i>
                </a>
                <a href="https://www.linkedin.com/in/aoof/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                    <i class="fab fa-linkedin text-gray hover:text-pink"></i>
                </a>
                <a href="mailto:aoof.mousa@gmail.com" target="_blank" rel="noopener noreferrer" aria-label="Email">
                    <i class="fas fa-envelope text-gray hover:text-pink"></i>
                </a>
            </div>
    
            <h1 class="font-bold text-3xl">{localizedContent.title}</h1>
            <a class="text-md transition-all duration-75 hover:underline hover:text-pink" href="https://namedrop.io/abdulrahmanmousa" target="_blank">{localizedContent.subtitle} <span class="text-pink">{localizedContent.subtitle_highlight}</span></a>
            <p class="text-gray text-xl">{localizedContent.location}</p>
    
            <p class="text-white text-lg mt-4">
                {@html sanitizeHtml(localizedContent.description)}
            </p>
            <p class="text-white text-lg mt-4">
                {@html sanitizeHtml(localizedContent.passion)}
            </p>
            <p class="text-white text-lg mt-4">
                {@html sanitizeHtml(localizedContent.looking_for)}
            </p>
            <div class="flex justify-end gap-4 mt-4">
                <button class="text-dark py-2 px-4 font-bold rounded bg-pink hover:opacity-80 transition-opacity ease-out text-sm cursor-pointer" on:click={openResumeModal}>{localizedSettings.ui.resume.title}</button>
            </div>
        </div>
    </section>
    <h3 class="text-white text-2xl font-bold mt-8">Skills</h3>
    <div class="flex flex-wrap justify-stretch gap-2 mt-4">
        {#each skillCategories as category}
            <div class="w-full text-right">
               {#if category === 'familiar'}
                    <div class="overflow-hidden transition-all ease-out duration-500" style:max-height={isFamiliarExpanded ? '500px' : '0'} style:opacity={isFamiliarExpanded ? '1' : '0'}>
                        <h3 class="text-xl text-white my-2 text-left select-none">{localizedContent.skills.familiar}</h3>
                            <div class="flex flex-wrap gap-2">
                                {#each localizedSkills[category] as skill (skill.title)}
                                    <Tag title={skill.title} iconClass={skill.icon_class ?? skill.iconClass} component={skill.icon ?? skill.component} />
                                {/each}
                            </div>
                        </div>
                {:else}
                    <h3 class="text-xl text-white text-left select-none">{localizedContent.skills.proficient}</h3>
                    <div class="flex flex-wrap gap-2 my-2">
                        {#each localizedSkills[category] as skill (skill.title)}
                            <Tag title={skill.title} iconClass={skill.icon_class ?? skill.iconClass} component={skill.icon ?? skill.component} />
                        {/each}
                        <button class="select-none border border-pink hover:bg-pink hover:text-dark font-black px-3 py-1 m-1 rounded flex items-center gap-2 cursor-pointer text-base relative" on:click={() => isFamiliarExpanded = !isFamiliarExpanded}>
                            {isFamiliarExpanded ? 'Show less...' : 'Show more...'}
                        </button>
                    </div>
                {/if}
            </div>
        {/each}
    </div>
</article>

<ResumeModal settings={localizedSettings} bind:open={isResumeModalOpen} />
