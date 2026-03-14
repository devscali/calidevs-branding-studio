'use client';

import { useState } from 'react';

interface SlideViewerProps {
  file: string;
  title: string;
}

export function SlideViewer({ file, title }: SlideViewerProps) {
  const [isFullscreen, setIsFullscreen] = useState(false);

  const iframeSrc = `/brand-files/${file}`;

  return (
    <div className={`flex-1 ${isFullscreen ? 'fixed inset-0 z-[100] bg-background' : 'relative'}`}>
      {isFullscreen && (
        <button
          onClick={() => setIsFullscreen(false)}
          className="absolute right-4 top-4 z-10 rounded-lg bg-surface border border-border px-3 py-1.5 text-sm text-muted hover:text-foreground transition-colors"
        >
          Exit Fullscreen
        </button>
      )}

      <div className="flex h-full items-center justify-center p-4">
        <div className={`w-full ${isFullscreen ? 'h-full' : 'h-[calc(100vh-10rem)]'} overflow-hidden rounded-xl border border-border bg-white`}>
          <iframe
            src={iframeSrc}
            title={title}
            className="h-full w-full"
            sandbox="allow-scripts allow-same-origin"
          />
        </div>
      </div>

      {!isFullscreen && (
        <div className="absolute bottom-8 right-8 flex gap-2">
          <button
            onClick={() => setIsFullscreen(true)}
            className="rounded-lg bg-surface border border-border px-4 py-2 text-sm text-muted hover:text-foreground transition-colors"
          >
            Fullscreen
          </button>
          <a
            href={iframeSrc}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg bg-surface border border-border px-4 py-2 text-sm text-muted hover:text-foreground transition-colors"
          >
            Open in Tab
          </a>
          <a
            href={iframeSrc}
            download={file}
            className="rounded-lg bg-ignite px-4 py-2 text-sm font-medium text-white hover:bg-ignite/90 transition-colors"
          >
            Download HTML
          </a>
        </div>
      )}
    </div>
  );
}
