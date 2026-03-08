import { AppDefinition } from './types';

export const APPS: AppDefinition[] = [
  {
    id: 'about',
    name: 'About Me',
    icon: '👤',
    iconSrc: '/os-icons/about.svg',
    description: "Allan Okoth — founder, full-stack developer, DJ. From Kampala to Oslo, the hustle and the why behind it all",
    color: '#FB6422',
  },
  {
    id: 'projects',
    name: 'Projects',
    icon: '💼',
    iconSrc: '/os-icons/projects.svg',
    description: "Allan's real products with live screenshots — Afrobeats.no, R&B Vault, Tamu Plan, Gadgetikk, EchoAlgoriData",
    color: '#E55A1F',
  },
  {
    id: 'skills',
    name: 'Skills',
    icon: '🛠️',
    iconSrc: '/os-icons/skills.svg',
    description: 'Tech stack and capabilities — Next.js, React, TypeScript, Supabase, AI/ML, WordPress',
    color: '#FC8B5A',
  },
  {
    id: 'resume',
    name: 'Resume',
    icon: '📄',
    iconSrc: '/os-icons/resume.svg',
    description: 'CV and experience — work history, education, achievements, downloadable resume',
    color: '#FB6422',
  },
  {
    id: 'contact',
    name: 'Contact',
    icon: '📧',
    iconSrc: '/os-icons/contact.svg',
    description: 'Get in touch — email, LinkedIn, GitHub, booking a call',
    color: '#E55A1F',
  },
  {
    id: 'dj',
    name: 'DJ Demure',
    icon: '🎵',
    iconSrc: '/os-icons/dj.svg',
    description: 'DJ Demure — Afrobeats, R&B, amapiano sets. Mixes, bookings, and the R&B Vault',
    color: '#FC8B5A',
  },
  {
    id: 'terminal',
    name: 'Terminal',
    icon: '💻',
    iconSrc: '/os-icons/terminal.svg',
    description: 'AllanOS command line — run neofetch, explore projects, and discover easter eggs',
    color: '#FB6422',
  },
  {
    id: 'settings',
    name: 'Settings',
    icon: '⚙️',
    iconSrc: '/os-icons/settings.svg',
    description: 'System preferences & wallpaper — theme, about AllanOS, credits and tech stack',
    color: '#E55A1F',
  },
];

export const TASKBAR_APPS = ['about', 'projects', 'skills', 'terminal'];
