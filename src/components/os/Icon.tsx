'use client';

import Image from 'next/image';
import { useState } from 'react';
import { AppDefinition } from './types';

interface IconProps {
  app: AppDefinition;
  onOpen: () => void;
}

export function Icon({ app, onOpen }: IconProps) {
  const [imgError, setImgError] = useState(false);

  return (
    <button
      onClick={onOpen}
      onDoubleClick={onOpen}
      className="os-desktop-icon group"
      aria-label={`Open ${app.name}`}
    >
      <span className="os-desktop-icon-well">
        {app.iconSrc && !imgError ? (
          <Image
            src={app.iconSrc}
            alt={app.name}
            width={56}
            height={56}
            className="pointer-events-none select-none"
            draggable={false}
            onError={() => setImgError(true)}
          />
        ) : (
          <span className="os-desktop-icon-emoji">{app.icon}</span>
        )}
      </span>
      <span className="os-desktop-icon-label">
        {app.name}
      </span>
    </button>
  );
}
