import { AppDefinition } from './types';

export const APPS: AppDefinition[] = [
  {
    id: 'about',
    name: 'About Me',
    icon: '👤',
    iconSrc: '/os-icons/about.svg',
    description: "Allan Kisuule — full-stack developer, AI consultant, DJ. Le Wagon Berlin grad, building products in Oslo",
    color: '#FB6422',
  },
  {
    id: 'projects',
    name: 'Projects',
    icon: '💼',
    iconSrc: '/os-icons/projects.svg',
    description: "Live products with screenshots — Afrobeats.no, R&B Vault, Tamu Plan, Gadgetikk, EchoAlgoriData, client work",
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
    description: 'CV — Le Wagon Berlin, Noroff, freelance projects, AI consulting, tech stack timeline',
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
    description: 'DJ Demure — Afrobeats, R&B, amapiano. YouTube: Drop Demand + B4 Drop Demand. Mixes & bookings',
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
