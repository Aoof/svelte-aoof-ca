<script lang="ts">
    import { onMount } from 'svelte';
    import { fly } from 'svelte/transition';
    import { device } from '$lib/../stores/index';

    import ExpressIcon from '$lib/components/Icons/ExpressIcon.svelte';
    import SvelteIcon from '$lib/components/Icons/SvelteIcon.svelte';
    import CppIcon from '$lib/components/Icons/CppIcon.svelte';
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

    .tag {
        background-color: #333;
        padding: 0.25rem 0.5rem;
        border-radius: 5px;

        font-size: 1rem;

        display: inline-flex;
        align-items: center;
        justify-content: center;

        i {
            color: white;
            margin: 0 0.25rem;
        }

        svg {
            fill: white;
            width: 1.5rem;
            height: 1.5rem;
            display: inline-block;
        }
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
                <span class="tag" title="HTML"><i class="fa-brands fa-html5"></i></span>
                <span class="tag" title="CSS"><i class="fa-brands fa-css3"></i></span>
                <span class="tag" title="JavaScript"><i class="fa-brands fa-js"></i></span>
                <span class="tag" title="React"><i class="fa-brands fa-react"></i></span>
                <span class="tag" title="Svelte"><SvelteIcon /></span>
                <span class="tag" title="Node.js"><i class="fa-brands fa-node-js"></i></span>
                <span class="tag" title="Express.js"><ExpressIcon /></span>
                <span class="tag" title="Python"><i class="fa-brands fa-python"></i></span>
                <span class="tag" title="Java"><i class="fa-brands fa-java"></i></span>
                <span class="tag" title="C"><i class="fa-brands fa-c"></i></span>
                <span class="tag" title="C++"><CppIcon /></span>
                <span class="tag" title="Git"><i class="fa-brands fa-git"></i></span>
                <span class="tag" title="Docker"><i class="fa-brands fa-docker"></i></span>
                <span class="tag" title="MongoDB"><i class="fas fa-database"></i> MongoDB</span>
                <span class="tag" title="MySQL"><i class="fas fa-database"></i> MySQL</span>
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