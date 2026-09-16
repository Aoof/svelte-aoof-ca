import { cp, mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import en from '../src/lib/locales/en.js';
import fr from '../src/lib/locales/fr.js';

const root = process.cwd();
const contentRoot = path.join(root, 'content');
const mediaSource = path.join(root, 'src/lib/media');
const mediaTarget = path.join(root, 'static/media');

const experienceCurrent = [true, true, true, false];
const eventImages = ['ggj_image.jpg', 'migs_image.png', 'FusionFestival.jpg', 'BotQuest.jpeg', null, null];
const eventLinks = [
  'https://www.linkedin.com/posts/aoof_a-week-ago-my-friends-and-i-decided-to-take-activity-7427119229058936834-Lcsn',
  'https://www.linkedin.com/posts/aoof_last-month-i-had-the-pleasure-to-attend-activity-7402542580120375296-s-7v',
  'https://www.linkedin.com/posts/aoof_fusionfestival-activity-7328610056080404481-WUQE',
  'https://www.linkedin.com/posts/aoof_botquest-robotics-engineering-activity-7273043506187702274-bwtj',
  'https://www.linkedin.com/posts/aoof_concordiauniversity-warhacks-robotics-activity-7157886921753378818-xt8O?utm_source=share&utm_medium=member_desktop',
  null
];

const projectMetadata = [
  { image: 'pol.jpg', link: 'https://www.planetoflana.com/', tags: [['Functional Quality Assurance', 'certificate'], ['Bug Tracking', 'bug'], ['Altagram Project', 'altagram']] },
  { image: 'colormask.png', link: 'https://aoof.itch.io/colormask', tags: [['C#', null, 'fa-brands fa-csharp'], ['Unity', null, 'fa-brands fa-unity']] },
  { image: 'aska.jpg', link: 'https://playaska.com/', tags: [['Functional Quality Assurance', 'certificate'], ['Localization Testing', 'language'], ['Bug Tracking', 'bug'], ['Altagram Project', 'altagram']] },
  { image: 'placeholder.svg', link: 'https://lonelymountains.com/#LMSR', tags: [['Functional Quality Assurance', 'certificate'], ['Bug Tracking', 'bug'], ['Altagram Project', 'altagram']] },
  { image: 'ieac.png', link: 'https://ieac.ca', tags: [['HTML', null, 'fa-brands fa-html5'], ['CSS', null, 'fa-brands fa-css3'], ['JavaScript', null, 'fa-brands fa-js'], ['Express', 'express'], ['MongoDB', 'mongodb'], ['Hetzner VPS', 'hetzner']] },
  { image: 'castlecanada.png', link: 'https://castlecanada.com', tags: [['HTML', null, 'fa-brands fa-html5'], ['CSS', null, 'fa-brands fa-css3'], ['JavaScript', null, 'fa-brands fa-js'], ['Shopify', 'shopify']] }
];

const skills = {
  proficient: [
    ['Python', null, 'fa-brands fa-python'], ['C#', 'csharp'], ['Java', null, 'fa-brands fa-java'],
    ['HTML5', null, 'fa-brands fa-html5'], ['Svelte', 'svelte'], ['Express.js', 'express'],
    ['JavaScript', null, 'fa-brands fa-js'], ['CSS', null, 'fa-brands fa-css3-alt']
  ],
  familiar: [
    ['C++', 'cpp'], ['MongoDB', 'mongodb'], ['MySQL', 'mysql'], ['Shopify', 'shopify'],
    ['Neovim', 'neovim'], ['Tailwind CSS', 'tailwind'], ['TypeScript', 'typescript'],
    ['React', null, 'fa-brands fa-react'], ['PHP', null, 'fa-brands fa-php'],
    ['Bootstrap', null, 'fa-brands fa-bootstrap'], ['Sass', null, 'fa-brands fa-sass'],
    ['C Language', null, 'fa-brands fa-c'], ['Node.js', null, 'fa-brands fa-node-js'],
    ['Git', null, 'fa-brands fa-git'], ['GitHub', null, 'fa-brands fa-github'], ['Linux', null, 'fa-brands fa-linux']
  ]
};

const toSkill = ([title, icon, iconClass]) => ({ title, ...(icon ? { icon } : {}), ...(iconClass ? { icon_class: iconClass } : {}) });
const slugify = (value) => value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
const writeJson = async (filePath, value) => {
  await mkdir(path.dirname(filePath), { recursive: true });
  await writeFile(filePath, `${JSON.stringify(value, null, 2)}\n`);
};

await mkdir(contentRoot, { recursive: true });
await mkdir(mediaTarget, { recursive: true });

for (const [locale, source] of [['en', en], ['fr', fr]]) {
  await writeJson(path.join(contentRoot, `settings.${locale}.json`), {
    brand: source.navbar.brand,
    navigation: {
      home: source.navbar.home,
      about: source.navbar.about,
      projects: source.navbar.projects,
      contact: source.navbar.contact,
      resume: source.navbar.resume,
      language: source.navbar.language
    },
    contact: {
      title: source.contact.title,
      subtitle: source.contact.subtitle,
      discord: source.contact.discord,
      email: 'aoof.mousa@gmail.com',
      location: source.home.location
    },
    social: {
      github: 'https://github.com/Aoof',
      linkedin: 'https://www.linkedin.com/in/aoof/',
      discord: 'https://discord.gg'
    },
    resume: { english: '/media/resume_en.pdf', french: '/media/resume_fr.pdf' }
  });

  await writeJson(path.join(contentRoot, `home.${locale}.json`), {
    title: source.home.title,
    subtitle: source.home.subtitle,
    subtitle_highlight: source.home.subtitleHighlight,
    location: source.home.location,
    description: source.home.description,
    passion: source.home.passion,
    looking_for: source.home.lookingFor,
    skills: source.home.skills
  });

  for (const [index, experience] of source.about.workExperiences.entries()) {
    const slug = slugify(experience.title);
    await writeJson(path.join(contentRoot, 'experience', `${slug}.${locale}.json`), {
      ...experience,
      current: experienceCurrent[index]
    });
  }

  for (const [index, event] of source.about.eventsAndCompetitionsList.entries()) {
    await writeJson(path.join(contentRoot, 'events', `${slugify(event.name)}.${locale}.json`), {
      ...event,
      image: eventImages[index] ? `/media/${eventImages[index]}` : '',
      link: eventLinks[index] || ''
    });
  }

  for (const [index, project] of source.projects.items.entries()) {
    const metadata = projectMetadata[index];
    await writeJson(path.join(contentRoot, 'projects', `${slugify(project.name)}.${locale}.json`), {
      ...project,
      image: `/media/${metadata.image}`,
      link: metadata.link,
      tags: metadata.tags.map(toSkill)
    });
  }
}

await writeJson(path.join(contentRoot, 'skills.json'), {
  proficient: skills.proficient.map(toSkill),
  familiar: skills.familiar.map(toSkill)
});

for (const file of ['aska.jpg', 'BotQuest.jpeg', 'castlecanada.png', 'colormask.png', 'FusionFestival.jpg', 'ggj_image.jpg', 'hero-banner.jpg', 'ieac.png', 'migs_image.png', 'placeholder.svg', 'pol.jpg', 'resume_en.pdf', 'resume_fr.pdf']) {
  await cp(path.join(mediaSource, file), path.join(mediaTarget, file));
}

console.log('Migrated locale content and media into content/ and static/media/.');