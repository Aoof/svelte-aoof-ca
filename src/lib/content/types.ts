export type Locale = 'en' | 'fr';

export type Strings = Record<string, string>;

export type UiGroup =
  | 'common'
  | 'home'
  | 'track'
  | 'work'
  | 'case'
  | 'experience'
  | 'events'
  | 'contact'
  | 'card'
  | 'interests'
  | 'footnotes'
  | 'resume'
  | 'seo';

export interface HomeContent {
  title: string;
  subtitle: string;
  subtitle_highlight: string;
  location: string;
  /** HTML, already sanitized by the loader */
  description: string;
  passion: string;
  looking_for: string;
  featured: string[];
}

export interface Story {
  problem?: string;
  did?: string;
  with?: string;
  result?: string;
}

export interface ProjectLink {
  label: string;
  url: string;
}

export interface Project {
  name: string;
  slug: string;
  summary: string;
  description?: string;
  story?: Story;
  image?: string;
  links: ProjectLink[];
  stack: string[];
  tracks: string[];
  start?: string;
  /** '' means ongoing */
  end?: string;
  /** Free text that replaces the computed dates */
  when?: string;
  role?: string;
  team?: string;
}

export type ExperienceKind = 'job' | 'education' | 'volunteering' | 'other';

export interface Experience {
  kind: ExperienceKind;
  title: string;
  location: string;
  start?: string;
  end?: string;
  expected?: boolean;
  description: string;
  tracks: string[];
  project?: string;
  link?: string;
}

export interface Event {
  name: string;
  location: string;
  time: string;
  /** YYYY-MM, for sorting */
  date: string;
  summary: string;
  link?: string;
  image?: string;
  project?: string;
}

export interface Track {
  slug: string;
  order: number;
  title: string;
  hire: string;
  pitch: string;
  resume: string;
  featured: string[];
}

export interface SiteSettings {
  brand: string;
  navigation: Strings;
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
  ui: Record<UiGroup, Strings>;
}
