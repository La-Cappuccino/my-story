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
      <span className="os-desktop-icon-emoji">
        {app.iconSrc && !imgError ? (
          <Image
            src={app.iconSrc}
            alt={app.name}
            width={48}
            height={48}
            className="pointer-events-none"
            onError={() => setImgError(true)}
          />
        ) : (
          app.icon
        )}
      </span>
      <span className="os-desktop-icon-label">
        {app.name}
      </span>
    </button>
  );
}
