// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  // Mantenemos el renderizado híbrido/servidor para la comunicación fluida con tu Spring Boot Gateway
  output: 'server',
  
  integrations: [
    react() // Tus islas de React ejecutándose de forma aislada
  ],
  
  vite: {
    plugins: [tailwindcss()],
    server: {
      proxy: {
        '/api': {
          target: 'http://localhost:8080/api',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, '')
        }
      }
    },
    ssr: {
      // Forzamos a que Framer Motion y Lucide se procesen correctamente en el SSR de Astro
      noExternal: ['framer-motion', 'lucide-react']
    }
  }
});