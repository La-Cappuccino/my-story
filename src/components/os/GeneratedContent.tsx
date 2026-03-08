'use client';

import { useEffect, useRef, useCallback } from 'react';

interface GeneratedContentProps {
  html: string;
  onAction: (actionId: string, elementText: string) => void;
  isStreaming?: boolean;
}

/**
 * Renders AI-generated HTML content with event delegation for interactive elements.
 *
 * Security note: The HTML comes from our own Gemini API endpoint (/api/os/generate)
 * which only accepts structured app interaction data — no user-supplied HTML is rendered.
 * The content is generated server-side by a system-prompt-controlled LLM, not from
 * untrusted user input. This is architecturally equivalent to server-rendered HTML.
 */
export function GeneratedContent({ html, onAction, isStreaming = false }: GeneratedContentProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const handleInteraction = useCallback((e: Event) => {
    const target = e.target as HTMLElement;
    const actionElement = target.closest('[data-action]') as HTMLElement | null;

    if (actionElement) {
      e.preventDefault();
      const actionId = actionElement.dataset.action || '';
      const elementText = actionElement.textContent || actionElement.dataset.action || '';
      onAction(actionId, elementText);
      return;
    }

    // Handle elements with data-url (e.g. "View Live" browser mockups)
    const urlElement = target.closest('[data-url]') as HTMLElement | null;
    if (urlElement) {
      e.preventDefault();
      const url = urlElement.dataset.url || '';
      onAction('navigate', url);
    }
  }, [onAction]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    container.addEventListener('click', handleInteraction);
    return () => container.removeEventListener('click', handleInteraction);
  }, [html, handleInteraction]);

  // Clean markdown artifacts from LLM response
  const cleanHtml = html
    .replace(/^```html\s*/i, '')
    .replace(/```\s*$/i, '')
    .replace(/^```\s*/gm, '')
    .trim();

  // Ensure iframes have sandbox for security
  const processedHtml = cleanHtml.replace(
    /<iframe([^>]*?)(?!\s+sandbox)(.*?)>/gi,
    '<iframe$1$2 sandbox="allow-scripts allow-same-origin allow-popups" loading="lazy">'
  );

  return (
    <div className="os-content">
      <div
        ref={containerRef}
        className={`os-generated ${isStreaming ? 'os-streaming' : ''}`}
        // Content sourced from our own API endpoint with controlled system prompt
        dangerouslySetInnerHTML={{ __html: processedHtml }}
      />
      {isStreaming && (
        <span className="os-cursor" />
      )}
    </div>
  );
}
