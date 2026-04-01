export default {
  navbar: {
    brand: "aoof.ca",
    home: "HOME",
    about: "ABOUT",
    projects: "PROJECTS",
    contact: "CONTACT",
    resume: "RESUME",
    language: "FR"
  },
  home: {
    title: "Abdulrahman Mousa",
    subtitle: "or aoof",
    subtitleHighlight: "(pronunciation)",
    location: "Montreal Quebec, Canada | He/Him",
    description: "I am a Computer Science student at Collège LaSalle. I speak English, Arabic and French.",
    passion: "I am passionate about Software Development, Web Development and Game Development I am always looking for new opportunities to learn and grow.",
    skills: {
      proficient: "I'm confident in...",
      familiar: "Decent with..."
    }
  },
  about: {
    workExperienceTitle: "Work Experience",
    eventsCompetitionsTitle: "Events and Competitions",
    eventsCompetitionsDescription: "I've jumped into a few competitions and events—some went better than others, but each one taught me something new.",
    current: "Current",
    linkedinPost: "LinkedIn Post",
    websiteTitle: "About this website",
    websiteDescription: "This website is built using SvelteKit, a framework for building web applications. It has a responsive design and is optimized for performance. There are some hidden features for me and my friends to enjoy. These features are built using SvelteKit's server-side rendering and API routes. With Express.js and MongoDB, I created an API to store and retrieve data. The API and backend are for the hidden features and are not used for the main website.",
    workExperiences: [
      {
        date: "Feb 2024 - ongoing",
        title: "Functional/Linguistic Quality Assurance Tester",
        location: "Altagram Canada | Montreal, QC",
        description: "Testing games for a localization company—hunting down bugs, catching inconsistencies, and making sure everything works smoothly. It's been a crash course in quality assurance and sharpened my eye for detail. Plus, working with the team has taught me a lot about effective communication and collaborative problem-solving."
      },
      {
        date: "December 2023 - Present",
        title: "Frontend Developer",
        location: "Welfare Avenue, Montreal QC - Freelance / Maintainance",
        description: "Bringing designs to life for a charity organization using React. I jump between coding and collaborating on design decisions, which has been a great balance of technical work and creative input. Each update is a chance to refine my frontend development skills and learn something new."
      },
      {
        date: "Feb 2022 - ongoing",
        title: "Personal and Group College Level Programming Tutor",
        location: "Freelance | Montreal, QC",
        description: "I tutored more than 50 hours to people from all over the world (UK, France, Saudi Arabia, Canada and the US) mostly in English. Most of the sessions I've completed were programming in C#, Java and Python."
      },
      {
        date: "November 2022 - June 2023",
        title: "Inbound Customer Care Representative",
        location: "IO Solutions, Montreal QC - Part Time",
        description: "Handled customer calls for Rogers Communications—answering questions, solving issues, and keeping things running smoothly. Picked up skills in data entry, marketing, and learned how to adapt quickly to new systems."
      }
    ],
    eventsAndCompetitionsList: [
      {
        name: "Global Game Jam 2026 - Unity Technologies",
        location: "Montreal QC",
        time: "January 2026",
        summary: "Participated in the Global Game Jam 2026, hosted at Unity Technologies in Montreal. It was an intense 48 hours of creativity, collaboration, and caffeine. Our team was a mix of passionate amateurs and some professionals, which made for a great learning environment. We managed to whip up a fun little game that we're all proud of (even if it wasn't polished), and the experience was a blast from start to finish."
      },
      {
        name: "Montreal International Game Summit",
        location: "Montreal QC",
        time: "December 2025",
        summary: "Attended the Montreal International Game Summit, a major event in the gaming industry. It was an incredible opportunity to connect with professionals, attend insightful talks, and get a behind-the-scenes look at upcoming games and technologies. The experience was inspiring and reinforced my passion for game development."
      },
      {
        name: "Fusion Festival",
        location: "Montreal QC",
        time: "June 2025",
        summary: "Participated in Fusion Festival, where I showed an interactive visual effects project. It was a great experience to connect with professionals and get feedback on my work. I was happy to be part of it and I'm grateful for my college for hosting it and giving me the opportunity to showcase my work."
      },
      {
        name: "BotQuest",
        location: "Autodesk Canada Inc, Montreal QC",
        time: "November 2024",
        summary: "Round two of maze-solving robots, this time at Autodesk. Built a robot that crushed most of the mazes—and was surprisingly fast. The competition was tough, but that's what made it fun. Leveled up my robotics and teamwork skills even more."
      },
      {
        name: "Warhacks",
        location: "Concordia University, Montreal QC",
        time: "February 2024",
        summary: "Built a maze-navigating robot and raced it against other teams. Ours handled the mazes well and we snagged 3rd place! First real dive into robotics—learned a ton about hardware, code, and working under pressure with a team."
      },
      {
        name: "ConUHacks",
        location: "Concordia University, Montreal QC",
        time: "February 2024",
        summary: "My first hackathon. Tried building a web app to help mechanics schedule repairs more efficiently. Didn't quite finish in time—pacing is hard when you're new—but learned a lot about web development, working with a team, and how to pivot when things don't go as planned."
      }
    ]
  },
  projects: {
    title: "Projects",
    items: [
      {
        name: 'Planet of Lana II',
        description: "<p>Planet of Lana II is a puzzle-platformer game that I tested at Altagram. It looked amazing and had some really interesting mechanics. The developers were very responsive to feedback and quick to patch bugs, which made the testing process enjoyable.</p>",
        tags: ["Functional Quality Assurance", "Bug Tracking", "Altagram Project"]
      },
      {
        name: 'ColorMask',
        description: "<p>Part of a weekend-long game jam project, ColorMask is a swarm game where players can get rid of their enemies by changing their colours through blocks from their inventory.</p><p>I was responsible for the game's programming, using <strong>C#</strong> and <strong>Unity</strong>. I also contributed to the game's design and mechanics, collaborating with my teammate to create a fun and engaging experience.</p><p>(You can find the linkedIn post <a href='https://www.linkedin.com/posts/aoof_a-week-ago-my-friends-and-i-decided-to-take-activity-7427119229058936834-Lcsn' target='_blank' class='text-pink hover:underline'>here</a>)</p>",
        tags: ["C#", "Unity"]
      },
      {
        name: 'Aska',
        description: "<p>Aska was one of my favourite games to test during my time at Altagram. It's a survival game and a simulator that revolves around gathering resources, crafting items, and building a village with smart AI villagers.</p><p>This was also one of the longest projects I worked on, so I've found hundreds of bugs, linguistic and functional.</p>",
        tags: ["Functional Quality Assurance", "Localization Testing", "Bug Tracking", "Altagram Project"]
      },
      {
        name: 'Lonely Mountains: Snow Riders',
        description: "<p>Lonely Mountains: Snow Riders is a skiing game that I had the pleasure of testing at Altagram. The game was beautifully designed even though it was buggy at first. Working with the developers was a great experience because they were receptive to feedback and quick with their patches.</p>",
        tags: ["Functional Quality Assurance", "Bug Tracking", "Altagram Project"]
      },
      {
        name: 'IEAC Official Website',
        description: "<p>For the <strong>International and Ethnic Associations Council (IEAC)</strong>, I solo'd the development of their official website.</p><p>The goal was to create a dynamic and responsive platform that serves as an information hub for the council, catering to diverse communities and promoting cultural inclusivity.</p>",
        tags: ["HTML", "CSS", "JavaScript", "Express", "MongoDB", "Hetzner VPS"]
      },
      {
        name: 'The Castle Canada',
        description: "<p>For the development of an online fragrances e-commerce store, I helped create a user-friendly and visually appealing platform.</p><p>The goal was to establish an accessible and efficient online shopping experience for customers, focusing on ease of navigation, product discovery, and secure transactions.</p>",
        tags: ["HTML", "CSS", "JavaScript", "Shopify"]
      }
    ]
  },
  contact: {
    title: "Contact Information",
    subtitle: "Mostly active on Discord but feel free to reach out on one of the following.",
    discord: "aoof",
    form: {
      title: "Contact Form",
      email: "Email address :",
      emailPlaceholder: "Enter your email here",
      message: "Message :",
      messagePlaceholder: "Enter your message here",
      send: "Send",
      submitting: "Submitting...",
      success: "Message sent successfully",
      error: "Failed to send message"
    }
  }
};