<script lang="ts">
    import { _ } from 'svelte-i18n';
    import Tag from './Tag.svelte';
    import ResumeModal from './ResumeModal.svelte';
    import Banner from '$lib/media/hero-banner.jpg';

    type Skill = { title: string; component?: string; iconClass?: string };
    type SkillCategory = 'proficient' | 'familiar';

    const skills: Record<SkillCategory, Skill[]> = {
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

    const openResumeModal = () => {
        isResumeModalOpen = true;
    }
</script>

<style>
    .keyword {
        background-clip: text;
        background-image: linear-gradient(90deg, #ffc82c, #e0afa0); 
        color: transparent;
        animation: animateKeyword 10s linear infinite;
        background-size: 300% 300%; 
    }
    @keyframes animateKeyword {
        0% {
            background-position: 0% 50%;
        }
        25% {
            background-position: 100% 50%;
        }
        50% {
            background-position: 100% 100%;
        }
        75% {
            background-position: 0% 100%;
        }
        100% {
            background-position: 0% 50%;
        }
    }
</style>

<article class="h-full w-full p-4 bg-dark" id="home">
    <section class="border border-gray rounded"> 
        <img src={Banner} alt="Hero Banner" class="w-full h-48 object-cover rounded-t" />
        <div class="p-5">
            <div class="flex justify-center gap-4 w-fit float-right">
                <a href="https://github.com/aoof" target="_blank" rel="noopener noreferrer">
                    <i class="fab fa-github text-gray hover:text-pink"></i>
                </a>
                <a href="https://www.linkedin.com/in/aoof/" target="_blank" rel="noopener noreferrer">
                    <i class="fab fa-linkedin text-gray hover:text-pink"></i>
                </a>
                <a href="mailto:aoof.mousa@gmail.com" target="_blank" rel="noopener noreferrer">
                    <i class="fas fa-envelope text-gray hover:text-pink"></i>
                </a>
            </div>
    
            <h1 class="font-bold text-3xl">{$_('home.title')}</h1>
            <a class="text-md transition-all duration-75 hover:underline hover:text-pink" href="https://namedrop.io/abdulrahmanmousa" target="_blank">{$_('home.subtitle')} <span class="text-pink">{$_('home.subtitleHighlight')}</span></a>
            <p class="text-gray text-xl">{$_('home.location')}</p>
    
            <p class="text-white text-lg mt-4">
                {@html $_('home.description')}
            </p>
            <p class="text-white text-lg mt-4">
                {@html $_('home.passion')}
            </p>
            <p class="text-white text-lg mt-4">
                {@html $_('home.lookingFor')}
            </p>
            <div class="flex justify-end gap-4 mt-4">
                <button on:click={() => window.location.href = '#contact' } class="text-dark py-2 px-4 font-bold rounded bg-pink hover:opacity-80 transition-opacity ease-out text-sm cursor-pointer">{$_('contact.title').toUpperCase()}</button>
                <button class="text-dark py-2 px-4 font-bold rounded bg-pink hover:opacity-80 transition-opacity ease-out text-sm cursor-pointer" on:click={openResumeModal}>{$_('navbar.resume')}</button>
            </div>
        </div>
    </section>
    <h3 class="text-white text-2xl font-bold mt-8">Skills</h3>
    <div class="flex flex-wrap justify-stretch gap-2 mt-4">
        {#each skillCategories as category}
            <div class="w-full text-right">
               {#if category === 'familiar'}
                    <div class="overflow-hidden transition-all ease-out duration-500" style:max-height={isFamiliarExpanded ? '500px' : '0'} style:opacity={isFamiliarExpanded ? '1' : '0'}>
                        <h3 class="text-xl text-white my-2 text-left select-none">{$_('home.skills.familiar')}</h3>
                            <div class="flex flex-wrap gap-2">
                                {#each skills[category] as skill}
                                    <Tag title={skill.title} iconClass={skill.iconClass} component={skill.component} />
                                {/each}
                            </div>
                        </div>
                {:else}
                    <h3 class="text-xl text-white text-left select-none">{$_('home.skills.proficient')}</h3>
                    <div class="flex flex-wrap gap-2 my-2">
                        {#each skills[category] as skill}
                            <Tag title={skill.title} iconClass={skill.iconClass} component={skill.component} />
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

<ResumeModal bind:open={isResumeModalOpen} />
