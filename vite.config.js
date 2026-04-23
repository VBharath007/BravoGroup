import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  assetsInclude: ['**/*.splinecode'],
  define: {
    'process.env': {},
  },
  optimizeDeps: {
    include: [
      'react', 
      'react-dom', 
      'framer-motion', 
      'three', 
      '@react-three/fiber', 
      '@react-three/drei',
      'swiper',
      'swiper/react',
      '@splinetool/react-spline'
    ],
  },
  ssr: {
    noExternal: ['three', 'swiper', '@splinetool/react-spline'],
  },
  server: {
    port: 3000,
  },
  build: {
    chunkSizeWarningLimit: 1500,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('three') || id.includes('@react-three')) return 'vendor-three';
            if (id.includes('@splinetool')) return 'vendor-spline';
            if (id.includes('framer-motion')) return 'vendor-framer';
            if (id.includes('gsap')) return 'vendor-gsap';
            if (id.includes('react/') || id.includes('react-dom/')) return 'vendor-react';
            return 'vendor-core'; 
          }
        }
      }
    }
  }
});
