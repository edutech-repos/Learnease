
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';




export default defineConfig({
  plugins: [react()],
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  optimizeDeps: {
    esbuildOptions: {
      target: 'esnext',
    },
    exclude: ['pdfjs-dist']
  },
  build: {
    target: 'esnext',
    outDir: 'dist',
    commonjsOptions: {
      transformMixedEsModules: true,
    }
  },
  server: {
    port: 3000,
    open: true,
    proxy: {
      '/webhook': {
        target: 'https://amrutpatankar.app.n8n.cloud',
        changeOrigin: true,
        secure: false,
      }
    }
  },
});