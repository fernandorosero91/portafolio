// ===== Language =====
export type Language = 'es' | 'en';
export type LocalizedField = Record<Language, string>;

// ===== Personal Info =====
export interface LocationInfo {
  city: string;
  region: string;
  country: string;
  full: LocalizedField;
}

export interface SocialLinks {
  linkedin: string;
  github: string;
  youtube: string;
  whatsapp: string;
}

export interface PersonalInfo {
  name: string;
  lastName: string;
  fullName: string;
  title: LocalizedField;
  email: string;
  phone: string;
  location: LocationInfo;
  photo: string;
  social: SocialLinks;
  summary: LocalizedField;
  stats: {
    yearsExperience: string;
    projectsCount: string;
    organizations: string;
  };
}

// ===== Skills =====
export interface SkillItem {
  name: string;
  icon: string;
}

export interface SkillCategory {
  category: string;
  translationKey: string;
  items: SkillItem[];
}

export type SkillsData = Record<Language, SkillCategory[]>;

// ===== Projects =====
export interface ProjectCredentials {
  email: string;
  password: string;
}

export interface Project {
  title: string;
  description: string;
  technologies: string[];
  status: 'production' | 'testing';
  demoUrl: string | null;
  image: string;
  credentials?: ProjectCredentials;
  features: string[];
}

export type ProjectsData = Record<Language, Project[]>;

// ===== Experiences =====
export type ExperienceType = 'academic' | 'professional';

export interface Experience {
  type: ExperienceType;
  year: string;
  title: string;
  subtitle: string;
  description: string;
}

export type ExperiencesData = Record<Language, Experience[]>;

// ===== Testimonials =====
export interface Testimonial {
  name: string;
  role: string;
  avatar: string;
  text: string;
  stars?: number;
}

export interface TestimonialsLanguage {
  featured: Testimonial;
  testimonials: Testimonial[];
}

export type TestimonialsData = Record<Language, TestimonialsLanguage>;

// ===== Social Icon Link =====
export interface SocialIconLink {
  name: string;
  href: string;
  bg: string;
  icon: string;
}

// ===== Project Card (UI) =====
export interface ProjectCardData {
  titleKey: string;
  descriptionKey: string;
  technologies: string[];
  status: 'production' | 'testing';
  icon: string;
  demoUrl: string | null;
  image: string;
  credentials?: ProjectCredentials;
  features: string[];
}

// ===== Experience Filter =====
export type ExperienceFilter = 'all' | ExperienceType;
export type ExperienceViewMode = 'carousel' | 'timeline';
