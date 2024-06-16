<script>
    import { fly } from 'svelte/transition';
    import { device } from '$lib/../stores/index';

    import ProjectCard from './ProjectCard.svelte';
    import ieac  from '$lib/media/ieac.png';
    import castlecanada from '$lib/media/castlecanada.png';

    let projects = [
        {
            name: 'IEAC Official Website',
            description: "For the International and Ethnic Associations Council (IEAC), I solo'd the development of their official website. The goal was to create a dynamic and responsive platform that serves as an information hub for the council, catering to diverse communities and promoting cultural inclusivity.",
            image: ieac,
            link: 'https://ieac.ca',
            tags: [
                { name: 'HTML', class: 'fa-brands fa-html5' },
                { name: 'CSS', class: 'fa-brands fa-css3' },
                { name: 'JavaScript', class: 'fa-brands fa-js' },
                { name: 'Express', class: 'fas fa-server' },
                { name: 'MongoDB', class: 'fas fa-database' },
                { name: 'Hetzner VPS', class: 'fas fa-server' }
            ]
        },
        {
            name: 'The Castle Canada',
            description: "For the development of an online fragrances e-commerce store, I helped create a user-friendly and visually appealing platform. The goal was to establish an accessible and efficient online shopping experience for customers, focusing on ease of navigation, product discovery, and secure transactions.",
            image: castlecanada,
            link: 'https://castlecanada.com',
            tags: [
                { name: 'HTML', class: 'fa-brands fa-html5' },
                { name: 'CSS', class: 'fa-brands fa-css3' },
                { name: 'JavaScript', class: 'fa-brands fa-js' },
                { name: 'Shopify', class: 'fas fa-shopping-cart'},
                { name: 'Hetzner VPS', class: 'fas fa-server' }
            ]
        }
    ]
</script>

<style lang="scss">
    .projects {
        display: flex;
        gap: 1rem;
        flex-wrap: wrap;

        overflow: auto;
    }
</style>

<div class="projects my-4 text-lg overflow-auto h-full" transition:fly={$device === 'desktop' ? { x: -20, duration: 500 } : { y: -20, duration: 500 }}>
    {#each projects as project}
        <ProjectCard {...project} />
    {/each}
</div>