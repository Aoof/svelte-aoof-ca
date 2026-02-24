
<script lang="ts">
    import migsImg from '$lib/media/migs_image.png';
    import fusionImg from '$lib/media/FusionFestival.jpg';
    import botQuestImg from '$lib/media/BotQuest.jpeg';
    import ggjImg from '$lib/media/ggj_image.jpg';

    let workExperiences : { current: boolean, date: string, title: string, location: string, description: string }[] = [
        {
            current: true,
            date: "February 2024 - Present",
            title: "Video Games Quality Assurance Tester",
            location: "Altagram Canada, Montreal QC - Project Based",
            description:
                "Testing games for a ;[localization] company—hunting down bugs, catching inconsistencies, and making sure everything works smoothly. " +
                "It's been a crash course in ;[quality assurance] and sharpened my eye for detail. Plus, working with the team has taught me a lot about effective ;[communication] and collaborative ;[problem-solving]."
        },
        {
            current: true,
            date: "December 2023 - Present",
            title: "Frontend Developer",
            location: "Welfare Avenue, Montreal QC - Freelance / Maintainance",
            description:
                "Bringing designs to life for a ;[charity] organization using ;[React]. " +
                "I jump between coding and collaborating on design decisions, which has been a great balance of technical work and creative input. " +
                "Each update is a chance to refine my ;[frontend development] skills and learn something new."
        },
        // {
        //     current: false,
        //     date: "December 2023 - January 2024",
        //     title: "Full Stack Developer",
        //     location: "International Ethnic Associations Council, Montreal QC - Freelance",
        //     description:
        //         "Built and maintained the IEAC Concordia website, tackling bugs and adding new features. " +
        //         "Worked with ;[Express.js], ;[MongoDB], and ;[Node.js] to handle both the frontend and backend. " +
        //         "Looking back, there are definitely things I'd do differently, but every project is a learning experience."
        // },
        {
            current: false,
            date: "November 2022 - June 2023",
            title: "Inbound Customer Care Representative",
            location: "IO Solutions, Montreal QC - Part Time",
            description:
                "Handled customer calls for Rogers Communications—answering questions, solving issues, and keeping things running smoothly. " +
                "Picked up skills in ;[data entry], ;[marketing], and learned how to adapt quickly to new systems."
        },
        // {
        //     current: false,
        //     date: "January 2022 - August 2022",
        //     title: "Customer Care Representative",
        //     location: "LogX Group, Cross Border Pickups, Markham ON - Full Time",
        //     description: 
        //         "Front desk at a package handling facility, juggling customer requests, complaints, and general inquiries. " +
        //         "Got really good at ;[multitasking] and dealing with all sorts of people—definitely built up my ;[interpersonal skills]."
        // },
    ];

    workExperiences = workExperiences.map(experience => {
        experience.description = experience.description.replace(/;\[(.*?)\]/g, '<span class="keyword">$1</span>');
        return experience;
    }); 
    
    let eventsAndCompetitions: { name: string, location: string, time: string, summary: string, link?: string, image?: string }[] = [
        {
            name: "Global Game Jam 2026 - Unity Technologies",
            location: "Montreal QC",
            time: "January 2026",
            link: "https://www.linkedin.com/posts/aoof_a-week-ago-my-friends-and-i-decided-to-take-activity-7427119229058936834-Lcsn",
            image: ggjImg,
            summary: "Participated in the Global Game Jam 2026, hosted at Unity Technologies in Montreal. " +
                    "It was an intense 48 hours of creativity, collaboration, and caffeine. " +
                    "Our team was a mix of passionate amateurs and some professionals, which made for a great learning environment. " +
                    "We managed to whip up a fun little game that we're all proud of (even if it wasn't polished), and the experience was a blast from start to finish."

        },
        {
            name: "Montreal International Game Summit",
            location: "Montreal QC",
            time: "December 2025",
            image: migsImg,
            link: "https://www.linkedin.com/posts/aoof_last-month-i-had-the-pleasure-to-attend-activity-7402542580120375296-s-7v",
            summary: "Attended the Montreal International Game Summit, a major event in the gaming industry. " +
                    "It was an incredible opportunity to connect with professionals, attend insightful talks, and get a behind-the-scenes look at upcoming games and technologies. " +
                    "The experience was inspiring and reinforced my passion for game development."
        },
        {
            name: "Fusion Festival",
            location: "Montreal QC",
            time: "June 2025",
            link: "https://www.linkedin.com/posts/aoof_fusionfestival-activity-7328610056080404481-WUQE",
            image: fusionImg,
            summary: "Participated in Fusion Festival, where I showed an interactive visual effects project. " +
                    "It was a great experience to connect with professionals and get feedback on my work. " +
                    "I was happy to be part of it and I'm grateful for my college for hosting it and giving me the opportunity to showcase my work."
        },
        {
            name: "BotQuest",
            location: "Autodesk Canada Inc, Montreal QC",
            time: "November 2024",
            image: botQuestImg,
            link: "https://www.linkedin.com/posts/aoof_botquest-robotics-engineering-activity-7273043506187702274-bwtj",
            summary: "Round two of maze-solving robots, this time at Autodesk. Built a robot that crushed most of the mazes—and was surprisingly fast. " +
                    "The competition was tough, but that's what made it fun. Leveled up my ;[robotics] and ;[teamwork] skills even more.",
        },
        {
            name: "Warhacks",
            location: "Concordia University, Montreal QC",
            time: "February 2024",
            summary: "Built a maze-navigating robot and raced it against other teams. Ours handled the mazes well and we snagged 3rd place! " +
                    "First real dive into ;[robotics]—learned a ton about hardware, code, and working under pressure with a team.",
            link: "https://www.linkedin.com/posts/aoof_concordiauniversity-warhacks-robotics-activity-7157886921753378818-xt8O?utm_source=share&utm_medium=member_desktop"
        },
        {
            name: "ConUHacks",
            location: "Concordia University, Montreal QC",
            time: "February 2024",
            summary: "My first hackathon. Tried building a web app to help mechanics schedule repairs more efficiently. " +
                    "Didn't quite finish in time—pacing is hard when you're new—but learned a lot about ;[web development], working with a team, and how to pivot when things don't go as planned.",
        }
    ];

    eventsAndCompetitions = eventsAndCompetitions.map(event => {
        event.summary = event.summary.replace(/;\[(.*?)\]/g, '<span class="keyword">$1</span>');
        return event;
    });
</script>

<article class="bg-dark w-full p-4 rounded-lg justify-center items-center" id="about">
    <div class="content flex flex-col h-full my-4 text-lg overflow-auto">
        <div class="content-group">
            <h3 class="text-white text-2xl mt-4 font-bold">Work Experience</h3>
            <ol class="relative border-s border-gray-200 m-4">
                {#each workExperiences as experience}
                    <li class="mb-10 ms-4">
                        {#if experience.current}
                            <div class="absolute w-4 h-4 rounded-full mt-2 -start-2 bg-pink"></div>
                        {:else}
                            <div class="absolute w-4 h-4 rounded-full mt-2 -start-2 bg-white"></div>
                        {/if}
                        <time class="mb-1 text-sm font-normal leading-none">{experience.date}
                            {#if experience.current}
                                <span class="text-sm leading-none bg-pink font-black text-dark py-1 px-3 mx-3 rounded-lg select-none">Current</span>
                            {/if}
                        </time>
                        <h3 class="text-lg font-semibold">{experience.title}</h3>
                        <p class="mb-4 text-sm font-normal leading-none">{experience.location}</p>
                        <p class="mb-4 text-base font-normal text-gray-500">{@html experience.description}</p>
                    </li>
                {/each}
            </ol>
        </div>
        <div class="content-group">
            <h3 class="text-white text-2xl mt-4 font-bold">Events and Competitions</h3>
            <p class="my-4 text-lg">
                I've jumped into a few competitions and events—some went better than others, but each one taught me something new.
            </p>
            {#each eventsAndCompetitions as event}
                <div class="card border border-gray p-4 rounded-lg mb-4">
                    {#if event.image}
                        <img src={event.image} alt={event.name} class="w-full h-48 object-cover rounded-lg mb-4" />
                    {/if}
                    {#if event.link}
                        <div class="float-right">
                            <a href={event.link} target="_blank" rel="anonymous" class="text-dark py-2 px-4 font-bold rounded bg-pink hover:opacity-80 transition-opacity ease-out text-sm cursor-pointer">Linkedin Post</a>
                        </div>
                    {/if}
                    <h4 class="text-2xl font-semibold text-white">{event.name}</h4>
                    <div class="mb-2">
                        <span class="text-gray text-sm">{event.location}</span>
                        <span class="text-gray text-sm">{event.time}</span>
                    </div>
                    <p class="text-lg">{@html event.summary}</p>
                </div>
            {/each}
        </div>
        <div class="content-group">
            <h3 class="text-white text-2xl mt-4 font-bold">About this website</h3>
            <p class="my-4 text-lg">
                This website is built using SvelteKit, a framework for building web applications.
                It has a responsive design and is optimized for performance.
                There are some hidden features for me and my friends to enjoy.
                These features are built using SvelteKit's server-side rendering and API routes.
                With Express.js and MongoDB, I created an API to store and retrieve data.
                The API and backend are for the hidden features and are not used for the main website.
            </p>
        </div>
    </div>
</article>