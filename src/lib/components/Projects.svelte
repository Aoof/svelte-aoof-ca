<script lang="ts">
    import ProjectCard from './ProjectCard.svelte';
    import ieac  from '$lib/media/ieac.png';
    import castlecanada from '$lib/media/castlecanada.png';
    import placeholderImage from '$lib/media/placeholder.svg';
    import askaImage from '$lib/media/aska.jpg';
    import colorMaskImage from '$lib/media/colormask.png';

    type Tag = {
        title: string;
        iconClass: string;
        component?: string; // Optional component name for custom icons
    };

    let projects : { name : string, description: string, image: string, link: string, tags : Tag[]}[] = [
        {
            name: 'ColorMask',
            description: "<p>Part of a weekend-long game jam project, ColorMask is a swarm game where players can get rid of their enemies by changing their colours through blocks from their inventory.</p><p>I was responsible for the game's programming, using <strong>C#</strong> and <strong>Unity</strong>. I also contributed to the game's design and mechanics, collaborating with my teammate to create a fun and engaging experience.</p><p>(You can find the linkedIn post <a href='https://www.linkedin.com/posts/aoof_a-week-ago-my-friends-and-i-decided-to-take-activity-7427119229058936834-Lcsn' target='_blank' class='text-pink hover:underline'>here</a>)</p>",
            image: colorMaskImage,
            link: 'https://aoof.itch.io/colormask',
            tags: [
                { title: 'C#', iconClass: 'fa-brands fa-csharp' },
                { title: 'Unity', iconClass: 'fa-brands fa-unity' }
            ]
        },
        {
            name: 'Aska',
            description: "<p>Aska was one of my favourite games to test during my time at Altagram. It's a survival game and a simulator that revolves around gathering resources, crafting items, and building a village with smart AI villagers.</p><p>This was also one of the longest projects I worked on, so I've found hundreds of bugs, linguistic and functional.</p>",
            image: askaImage,
            link: 'https://playaska.com/',
            tags: [
                { title: 'Functional Quality Assurance', iconClass: 'fa-solid fa-certificate' },
                { title: 'Localization Testing', iconClass: 'fa-solid fa-language' },
                { title: 'Bug Tracking', iconClass: 'fa-solid fa-bug' },
                { title: 'Altagram Project', iconClass: 'fa-solid fa-a', component: 'AltagramIcon' }
            ]
        },
        {
            name: 'Lonely Mountains: Snow Riders',
            description: "<p>Lonely Mountains: Snow Riders is a skiing game that I had the pleasure of testing at Altagram. The game was beautifully designed even though it was buggy at first. Working with the developers was a great experience because they were receptive to feedback and quick with their patches.</p>",
            image: placeholderImage,
            link: 'https://lonelymountains.com/#LMSR',
            tags: [
                { title: 'Functional Quality Assurance', iconClass: 'fa-solid fa-certificate' },
                { title: 'Bug Tracking', iconClass: 'fa-solid fa-bug' },
                { title: 'Altagram Project', iconClass: 'fa-solid fa-a', component: 'AltagramIcon' }
            ]
        },
        {
            name: 'IEAC Official Website',
            description: "<p>For the <strong>International and Ethnic Associations Council (IEAC)</strong>, I solo'd the development of their official website.</p><p>The goal was to create a dynamic and responsive platform that serves as an information hub for the council, catering to diverse communities and promoting cultural inclusivity.</p>",
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
            description: "<p>For the development of an online fragrances e-commerce store, I helped create a user-friendly and visually appealing platform.</p><p>The goal was to establish an accessible and efficient online shopping experience for customers, focusing on ease of navigation, product discovery, and secure transactions.</p>",
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
