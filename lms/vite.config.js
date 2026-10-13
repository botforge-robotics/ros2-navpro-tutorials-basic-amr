import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: './',
  build: {
    outDir: 'dist',
    chunkSizeWarningLimit: 600,
    rollupOptions: {
      output: {
        entryFileNames: 'assets/react/index-[hash].js',
        chunkFileNames: 'assets/react/[name]-[hash].js',
        assetFileNames: 'assets/react/[name]-[hash].[ext]',
        manualChunks(id) {
          if (id.includes('lessonsData.json')) {
            return 'curriculum-data';
          }
          if (id.includes('node_modules')) {
            return 'vendor';
          }
        },
      },
    },
  },
});
