// @ts-check
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import path from 'path';

export default defineConfig({
  site: 'https://macros.lemonnutrition.eu',
  base: '/',
  output: 'static',
  outDir: './dist',
  
  integrations: [
    tailwind()
  ],
  
  vite: {
    resolve: {
      alias: {
        '@': path.resolve('./src'),
        '@/components': path.resolve('./src/components'),
        '@/layouts': path.resolve('./src/layouts'),
        '@/styles': path.resolve('./src/styles')
      }
    },
    build: {
      cssCodeSplit: false,
      rollupOptions: {
        output: {
          assetFileNames: 'assets/[name].[hash][extname]'
        }
      }
    }
  },
  
  compressHTML: true,
  
  image: {
    domains: ['macros.lemonnutrition.eu'],
    remotePatterns: [{ protocol: 'https' }]
  }
}); 