import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  preview: {
    port: 5173,
    strictPort: true,
    host: '0.0.0.0',
    proxy: {
      '/api': {
        target: 'http://api-gateway:8080',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '/api')
      },
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    }
  }
})
