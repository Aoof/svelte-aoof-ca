
<script lang="ts">
    let workExperiences : { current: boolean, date: string, title: string, location: string, description: string }[] = [
        {
            current: true,
            date: "February 2024 - Present",
            title: "Video Games Quality Assurance Tester",
            location: "Altagram Canada, Montreal QC - Project Based",
            description:
                "Working as a video games quality assurance tester for a ;[localization] company. " +
                "I am responsible for testing video games for bugs, errors, and issues. " +
                "This project has been a great opportunity to learn ;[quality assurance], ;[video games], and ;[testing]. " +
                "I have gained experience in ;[teamwork], ;[communication], and ;[problem-solving]. " +
                "I am always looking for ways to improve and learn new skills."
        },
        {
            current: true,
            date: "December 2023 - Present",
            title: "Frontend Developer",
            location: "Welfare Avenue, Montreal QC - Freelance / Maintainance",
            description:
                "Working as a frontend developer for a ;[charity] company. " +
                "I am tasked to bring designs to life using various technologies and helped with these designs. " +
                "This project was a great opportunity to learn ;[React], ;[Frontend Development], and ;[Design]. " +
                "There is always room for improvement and I am always looking for ways to improve. " +
                "Key skills gained included ;[technological team work], ;[design], and ;[frontend development]."
        },
        {
            current: false,
            date: "December 2023 - January 2024",
            title: "Full Stack Developer",
            location: "International Ethnic Associations Council, Montreal QC - Freelance",
            description:
                "Developed and maintained the IEAC Concordia website, resolving issues and adding features. " +
                "This project enhanced my skills in full stack development, working independently, and using ;[Express.js], ;[MongoDB], and ;[Node.js]. " +
                "I gained experience in ;[backend development], ;[server management], and ;[database management]. " +
                "Reflecting on the project, I identified areas for improvement and would approach some tasks differently." 
        },
        {
            current: false,
            date: "November 2022 - June 2023",
            title: "Inbound Customer Care Representative",
            location: "IO Solutions, Montreal QC - Part Time",
            description:
                "Worked as a customer care representative for Rogers Communications. " +
                "I was responsible for handling customer inquiries, complaints, and requests. " +
                "Key skills gained included ;[data entry], ;[marketting], and ;[quick learning]."
        },
        {
            current: false,
            date: "January 2022 - August 2022",
            title: "Customer Care Representative",
            location: "LogX Group, Cross Border Pickups, Markham ON - Full Time",
            description: 
                "Worked as a front desk customer care representative at a package handling facility. " +
                "I was responsible for handling customer inquiries, complaints, and requests. " +
                "Key skills gained included ;[multitasking], ;[interpersonal skills], and ;[problem-solving]."
        },
    ];

    workExperiences = workExperiences.map(experience => {
        experience.description = experience.description.replace(/;\[(.*?)\]/g, '<span class="keyword">$1</span>');
        return experience;
    }); 
    
    let competitions: { name: string, location: string, time: string, summary: string, link?: string }[] = [
        {
            name: "BotQuest",
            location: "Autodesk Canada Inc, Montreal QC",
            time: "November 2024",
            link: "https://www.linkedin.com/posts/aoof_botquest-robotics-engineering-activity-7273043506187702274-bwtj?utm_source=share&utm_medium=member_desktop",
            summary: "The improved variation of Warhacks. Our challenge was to build a robot that could navigate a maze and finish in the shortest time. " +
                    "We built a robot that navigated most of the mazes provided, and it was really fast. " +
                    "Our opponents were very challenging to go against but we had fun and gained valuable experience in ;[robotics], ;[teamwork], and ;[problem-solving].",
        },
        {
            name: "Warhacks",
            location: "Concordia University, Montreal QC",
            time: "February 2024",
            summary: "Our challenge was to build a robot that could navigate a maze and finish in the shortest time. " +
                    "We built a robot that navigated most of the mazes provided, and it was really fast. " +
                    "We won 3rd place in the competition and gained valuable experience in ;[robotics], ;[teamwork], and ;[problem-solving].",
            link: "https://www.linkedin.com/posts/aoof_concordiauniversity-warhacks-robotics-activity-7157886921753378818-xt8O?utm_source=share&utm_medium=member_desktop"
        },
        {
            name: "ConUHacks",
            location: "Concordia University, Montreal QC",
            time: "February 2024",
            summary: "A hackathon run by HackConcordia, hackathons are a great way to learn new skills and meet new people. " +
                    "We built a web application that helps mechanics find the most optimal fixing schedule and display that in an intuitive way to both the mechanic and the customers. " +
                    "Being my first hackathon it was challenging to maintain a decent enough pacing and we didn't end up finishing the project on time. " +
                    "It was a great learning experience and I gained valuable experience in ;[web development], ;[teamwork], and ;[problem-solving].",
        }
    ];

    competitions = competitions.map(competition => {
        competition.summary = competition.summary.replace(/;\[(.*?)\]/g, '<span class="keyword">$1</span>');
        return competition;
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
            <h3 class="text-white text-2xl mt-4 font-bold">Competitions</h3>
            <p class="my-4 text-lg">
                I have participated in several competitions and hackathons. 
                I have won some of them and have gained valuable experience from all of them.
            </p>
            {#each competitions as competition}
                <div class="card border border-gray p-4 rounded-lg mb-4">
                    <h4 class="text-2xl font-semibold text-white">{competition.name}</h4>
                    <div class="mb-2">
                        <span class="text-gray text-sm">{competition.location}</span>
                        <span class="text-gray text-sm">{competition.time}</span>
                    </div>
                    <p class="text-lg">{@html competition.summary}</p>
                    {#if competition.link}
                        <div class="flex justify-end">
                            <a href={competition.link} target="_blank" rel="anonymous" class="text-dark py-2 px-4 font-bold rounded bg-pink hover:opacity-80 transition-opacity ease-out text-sm cursor-pointer">Linkedin Post</a>
                        </div>
                    {/if}
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