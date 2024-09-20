<script lang="ts">
    import { onMount } from 'svelte';
    import { fly } from 'svelte/transition';
    import { device } from '$lib/../stores/index';

    import Tag from '$lib/components/Tag.svelte';

    const techTags = [
        { title: "HTML", iconClass: "fa-brands fa-html5" },
        { title: "CSS", iconClass: "fa-brands fa-css3" },
        { title: "JavaScript", iconClass: "fa-brands fa-js" },
        { title: "React", iconClass: "fa-brands fa-react" },
        { title: "Svelte", component: "SvelteIcon" },
        { title: "Node.js", iconClass: "fa-brands fa-node-js" },
        { title: "Express.js", component: "ExpressIcon" },
        { title: "Python", iconClass: "fa-brands fa-python" },
        { title: "Java", iconClass: "fa-brands fa-java" },
        { title: "C", iconClass: "fa-brands fa-c" },
        { title: "C++", component: "CppIcon" },
        { title: "Git", iconClass: "fa-brands fa-git" },
        { title: "Docker", iconClass: "fa-brands fa-docker" },
        { title: "MongoDB", component: "MongodbIcon" },
        { title: "MySQL", component: "MySQLIcon" }
    ];

</script>

<style lang="scss">
    .content {
        display: flex;
        flex-direction: column;

        gap: 1rem;
        justify-items: center;

        justify-content: space-between;
        height: stretch;

        padding: 1rem 0;

        .content-group {
            padding: 1rem;

            h1, h2 {
                margin: 0;
            }

            div {
                margin: 20px 0; 
            }
        }
    }

    .tags-container {
        display: flex;
        gap: 0.5rem;
        flex-wrap: wrap;
        justify-content: center;
    }
</style>

<article class="bg-dark w-full p-4 rounded-lg h-full justify-center align-middle top-0 absolute" transition:fly={$device === 'desktop' ? { x: -20, duration: 500 } : { y: -20, duration: 500 }}>
    <div class="window-controls flex justify-end gap-2 mb-4">
        <div class="window-control bg-red w-3 h-3 rounded-full"></div>
        <div class="window-control bg-yellow w-3 h-3 rounded-full"></div>
        <div class="window-control bg-green w-3 h-3 rounded-full"></div>
    </div>

    <div class="content flex md:flex-row flex-col h-full p-4 my-4 text-lg overflow-auto">
        <div class="content-group">
            <h1 class="text-2xl text-center">About Me</h1>
            <p class="my-4 text-lg">
                I am a Concordia University student studying Computer Engineering. 
                I am passionate about software development and have experience in web development and Game development. 
                I am always eager to learn new technologies and improve my skills.</p>
        </div>

        <div class="content-group">
            <h2 class="text-xl text-center">Skills</h2>
            <div class="tags-container text-lg">
                {#each techTags as tag}
                    <Tag 
                        title={tag.title} 
                        iconClass={tag.iconClass} 
                        component={tag.component}
                    />
                {/each}
            </div>
        </div>

        <div class="content-group">
            <h2 class="text-xl text-center">About this Website</h2>
            <p class="my-4 text-lg">
                This website is built using SvelteKit, a framework for building web applications.
                It has a responsive design and is optimized for performance.
                There are some hidden features for me and my friends to enjoy.
                These features are built using SvelteKit's server-side rendering and API routes.
                With Express.js and MongoDB, I created a RESTful API to store and retrieve data.
            </p>
        </div>
    </div>
</article>