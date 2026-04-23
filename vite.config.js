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
});
