export type Locale = 'en' | 'fr';

export interface HomeContent {
  title: string;
  subtitle: string;
  subtitle_highlight: string;
  location: string;
  description: string;
  passion: string;
  looking_for: string;
  skills: {
    proficient: string;
    familiar: string;
  };
}

export interface Skill {
  title: string;
  icon?: string;
  icon_class?: string;
  iconClass?: string;
  component?: string;
}

export interface SkillsContent {
  proficient: Skill[];
  familiar: Skill[];
}

export interface Experience {
  date: string;
  title: string;
  location: string;
  description: string;
  current: boolean;
}

export interface Event {
  name: string;
  location: string;
  time: string;
  summary: string;
  link?: string;
  image?: string;
}

export interface Project {
  name: string;
  description: string;
  image: string;
  link: string;
  tags: Skill[];
}

export interface SiteSettings {
  brand: string;
  navigation: Record<string, string>;
  contact: {
    title: string;
    subtitle: string;
    discord: string;
    email: string;
    location: string;
  };
  social: {
    github: string;
    linkedin: string;
    discord: string;
  };
  resume: {
    english: string;
    french: string;
  };
}

export interface Localized<T> {
  en: T;
  fr: T;
}