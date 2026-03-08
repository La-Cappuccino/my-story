import { AppDefinition } from './types';

export const APPS: AppDefinition[] = [
  {
    id: 'about',
    name: 'About Me',
    icon: '👤',
    iconSrc: '/os-icons/about.svg',
    description: "Allan's story — from Uganda to Oslo, the entrepreneurial journey, the why behind the work",
    color: '#FB6422',
  },
  {
    id: 'projects',
    name: 'Projects',
    icon: '💼',
    iconSrc: '/os-icons/projects.svg',
    description: 'Portfolio of work — Afrobeats.no, R&B Vault, Tamu Plan, EchoAlgoriData, client projects',
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
    description: 'The music side — DJ sets, R&B Vault curation, Afrobeats, bookings',
    color: '#FC8B5A',
  },
  {
    id: 'terminal',
    name: 'Terminal',
    icon: '💻',
    iconSrc: '/os-icons/terminal.svg',
    description: 'Easter egg — interactive terminal with personality, fun commands',
    color: '#FB6422',
  },
  {
    id: 'settings',
    name: 'Settings',
    icon: '⚙️',
    iconSrc: '/os-icons/settings.svg',
    description: 'OS settings — theme, about this portfolio OS, credits',
    color: '#E55A1F',
  },
];

export const TASKBAR_APPS = ['about', 'projects', 'skills', 'terminal'];
