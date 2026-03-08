import { AppDefinition } from './types';

export const APPS: AppDefinition[] = [
  {
    id: 'about',
    name: 'About Me',
    icon: '👤',
    description: "Allan's story — from Uganda to Oslo, the entrepreneurial journey, the why behind the work",
    color: '#FB6422',
  },
  {
    id: 'projects',
    name: 'Projects',
    icon: '💼',
    description: 'Portfolio of work — Afrobeats.no, R&B Vault, Tamu Plan, EchoAlgoriData, client projects',
    color: '#E55A1F',
  },
  {
    id: 'skills',
    name: 'Skills',
    icon: '🛠️',
    description: 'Tech stack and capabilities — Next.js, React, TypeScript, Supabase, AI/ML, WordPress',
    color: '#FC8B5A',
  },
  {
    id: 'resume',
    name: 'Resume',
    icon: '📄',
    description: 'CV and experience — work history, education, achievements, downloadable resume',
    color: '#FB6422',
  },
  {
    id: 'contact',
    name: 'Contact',
    icon: '📧',
    description: 'Get in touch — email, LinkedIn, GitHub, booking a call',
    color: '#E55A1F',
  },
  {
    id: 'dj',
    name: 'DJ Demure',
    icon: '🎵',
    description: 'The music side — DJ sets, R&B Vault curation, Afrobeats, bookings',
    color: '#FC8B5A',
  },
  {
    id: 'terminal',
    name: 'Terminal',
    icon: '💻',
    description: 'Easter egg — interactive terminal with personality, fun commands',
    color: '#FB6422',
  },
  {
    id: 'settings',
    name: 'Settings',
    icon: '⚙️',
    description: 'OS settings — theme, about this portfolio OS, credits',
    color: '#E55A1F',
  },
];

export const TASKBAR_APPS = ['about', 'projects', 'skills', 'terminal'];
