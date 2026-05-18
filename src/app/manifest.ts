import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Mexico Travel Smart',
    short_name: 'MTS',
    description: 'Your guide for FIFA World Cup 2026 in Mexico',
    start_url: '/',
    display: 'standalone',
    theme_color: '#e91e63',
    background_color: '#f5f5f5',
    icons: [
      {
        src: '/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
      },
      {
        src: '/icon-512-maskable.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
    ],
  };
}
