import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Калкулатор Заплата 2026 България - Данъци и Осигуровки',
    short_name: 'Калкулатор Заплата 2026',
    description: 'Безплатен калкулатор за изчисляване на нетна заплата, данъци и осигуровки в България за 2026 година',
    start_url: '/',
    display: 'standalone',
    background_color: '#000000',
    theme_color: '#ef4444',
    lang: 'bg',
    orientation: 'portrait',
    categories: ['finance', 'business', 'productivity'],
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
    ],
  }
}
