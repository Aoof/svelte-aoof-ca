<script>
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
                { title: 'Shopify', iconClass: 'fas fa-shopping-cart', component: 'ShopifyIcon'}
            ]
        },
    ]
</script>

<article class="h-full w-full p-4 bg-dark flex flex-col gap-10" id="projects">
    <h3 class="text-white text-2xl font-bold mt-4">Projects</h3>
    {#each projects as project}
        <ProjectCard {...project} />
    {/each}
</article>
