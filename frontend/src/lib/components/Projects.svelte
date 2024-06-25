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
                { title: 'HTML', iconClass: 'fa-brands fa-html5' },
                { title: 'CSS', iconClass: 'fa-brands fa-css3' },
                { title: 'JavaScript', iconClass: 'fa-brands fa-js' },
                { title: 'Express', iconClass: 'fas fa-server', component: 'ExpressIcon' },
                { title: 'MongoDB', iconClass: 'fas fa-database', component: 'MongodbIcon' },
                { title: 'Hetzner VPS', iconClass: 'fas fa-server', component: 'HetznerIcon' }
            ]
        },
        {
            name: 'The Castle Canada',
            description: "For the development of an online fragrances e-commerce store, I helped create a user-friendly and visually appealing platform. The goal was to establish an accessible and efficient online shopping experience for customers, focusing on ease of navigation, product discovery, and secure transactions.",
            image: castlecanada,
            link: 'https://castlecanada.com',
            tags: [
                { title: 'HTML', iconClass: 'fa-brands fa-html5' },
                { title: 'CSS', iconClass: 'fa-brands fa-css3' },
                { title: 'JavaScript', iconClass: 'fa-brands fa-js' },
                { title: 'Shopify', iconClass: 'fas fa-shopping-cart', component: 'ShopifyIcon'},
                { title: 'Hetzner VPS', iconClass: 'fas fa-server', component: 'HetznerIcon'}
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

<div 
    class="projects my-4 text-lg overflow-auto xl:h-fit h-full" 
    transition:fly={$device === 'desktop' ? { x: -20, duration: 500 } : { y: -20, duration: 500 }}
>
    {#each projects as project}
        <ProjectCard {...project} />
    {/each}
</div>