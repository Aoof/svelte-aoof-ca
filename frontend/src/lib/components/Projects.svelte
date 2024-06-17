<script>
    import { fly } from 'svelte/transition';
    import { device } from '$lib/../stores/index';

    import ProjectCard from './ProjectCard.svelte';
    import ieac  from '$lib/media/ieac.png';
    import castlecanada from '$lib/media/castlecanada.png';
    import CppIcon from '$lib/components/Icons/CppIcon.svelte';
    import ExpressIcon from '$lib/components/Icons/ExpressIcon.svelte';
    import SvelteIcon from '$lib/components/Icons/SvelteIcon.svelte';
    import MongodbIcon from '$lib/components/Icons/MongodbIcon.svelte';
    import HetznerIcon from '$lib/components/Icons/HetznerIcon.svelte';
    import ShopifyIcon from '$lib/components/Icons/ShopifyIcon.svelte';

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
                { name: 'Express', class: 'fas fa-server', component: ExpressIcon },
                { name: 'MongoDB', class: 'fas fa-database', component: MongodbIcon },
                { name: 'Hetzner VPS', class: 'fas fa-server', component: HetznerIcon }
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
                { name: 'Shopify', class: 'fas fa-shopping-cart', component: ShopifyIcon},
                { name: 'Hetzner VPS', class: 'fas fa-server', component: HetznerIcon}
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