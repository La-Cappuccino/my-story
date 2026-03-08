'use client';

import { AppDefinition } from './types';

interface IconProps {
  app: AppDefinition;
  onOpen: () => void;
}

export function Icon({ app, onOpen }: IconProps) {
  return (
    <button
      onClick={onOpen}
      onDoubleClick={onOpen}
      className="os-desktop-icon group"
      aria-label={`Open ${app.name}`}
    >
      <span className="os-desktop-icon-emoji">
        {app.icon}
      </span>
      <span className="os-desktop-icon-label">
        {app.name}
      </span>
    </button>
  );
}
