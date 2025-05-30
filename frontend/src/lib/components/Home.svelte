<script lang="ts">
    import Tag from './Tag.svelte';
    import resume from '$lib/media/resume.pdf';

    type Skill = { title: string; component?: string; iconClass?: string };
    type SkillCategory = 'proficient' | 'familiar';

    const skills: Record<SkillCategory, Skill[]> = {
        "proficient": [
            { title: "Python", iconClass: "fa-brands fa-python" },
            { title: "C#", component: "CsharpIcon" },
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
            { title: "Hetzner", component: "HetznerIcon" },
            { title: "Shopify", component: "ShopifyIcon" },
            { title: "Neovim", component: "NeovimIcon"},
            { title: "Tailwind CSS", component: "TailwindIcon" },
            { title: "TypeScript", component: "TypescriptIcon" }, // No icon
            { title: "React", iconClass: "fa-brands fa-react" },
            { title: "PHP", iconClass: "fa-brands fa-php" },
            { title: "Bootstrap", iconClass: "fa-brands fa-bootstrap" },
            { title: "Sass", iconClass: "fa-brands fa-sass" },
            { title: "Java", iconClass: "fa-brands fa-java" },
            { title: "C Language", iconClass: "fa-brands fa-c" },
            { title: "Node.js", iconClass: "fa-brands fa-node-js" },
            { title: "Git", iconClass: "fa-brands fa-git" },
            { title: "GitHub", iconClass: "fa-brands fa-github" },
            { title: "Linux", iconClass: "fa-brands fa-linux" },
        ]
    }

    let isFamiliarExpanded = false;
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
    <section class="border border-gray rounded p-5"> 
        <!-- Socials buttons container -->
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

        <h1 class="font-bold text-3xl">Abdulrahman Mousa</h1>
        <p class="text-gray text-xl">Montreal Quebec, Canada | He/Him</p>

        <p class="text-white text-lg mt-4">
            I am a <span class="keyword">Computer Science</span> student at Collège LaSalle. I speak <span class="keyword">English</span>, and <span class="keyword">Arabic</span>.
            I am passionate about <span class="keyword">Software Development</span> and <span class="keyword">Web Development.</span> I am always looking for new opportunities to learn and grow. 
        </p>
        <p class="text-white text-lg mt-4">
            I am currently looking for 
            <span class="keyword">Part-Time,</span> 
            <span class="keyword">Full-Time,</span> or 
            <span class="keyword">Contract</span> positions in software development.
        </p>
        <div class="flex justify-end gap-4 mt-4">
            <a href="#contact">
                <button class="text-dark py-2 px-4 font-bold rounded bg-pink hover:opacity-80 transition-opacity ease-out text-sm cursor-pointer">CONTACT ME</button>
            </a>
            <a href={resume} download="amousaresume.pdf">
                <button class="text-dark py-2 px-4 font-bold rounded bg-pink hover:opacity-80 transition-opacity ease-out text-sm cursor-pointer">RESUME</button>
            </a>
        </div>
    </section>
    <h3 class="text-white text-2xl font-bold mt-8">Skills</h3>
    <div class="flex flex-wrap justify-stretch gap-2 mt-4">
        {#each Object.keys(skills) as category}
            <div class="w-full text-right">
               {#if category === 'familiar'}
                    <div class="overflow-hidden transition-all ease-out duration-500" style:max-height={isFamiliarExpanded ? '500px' : '0'} style:opacity={isFamiliarExpanded ? '1' : '0'}>
                        <h3 class="text-xl text-white my-2 text-center select-none">Familiar</h3>
                            <div class="flex flex-wrap gap-2">
                                {#each skills[category] as skill}
                                    <Tag title={skill.title} iconClass={skill.iconClass} component={skill.component} />
                                {/each}
                            </div>
                        </div>
                {:else}
                    <h3 class="text-xl text-white text-center select-none">Proficient</h3>
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
