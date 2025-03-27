import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  base: mode === 'production' ? "/promise-duel/" : "/",
  server: {
    host: "::",
    port: 8080,
    headers: {
      'Content-Type': 'application/javascript',
      'X-Content-Type-Options': 'nosniff'
    }
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html'),
      },
      output: {
        entryFileNames: mode === 'production' ? 'assets/[name].[hash].mjs' : 'assets/[name].[hash].js',
        chunkFileNames: mode === 'production' ? 'assets/[name].[hash].mjs' : 'assets/[name].[hash].js',
        assetFileNames: (assetInfo) => {
          if (!assetInfo.name) return 'assets/[name].[hash].[ext]';
          if (/\.(png|jpe?g|gif|svg|webp|ico)$/.test(assetInfo.name)) {
            return 'uploads/[name].[ext]';
          }
          if (/\.js$/.test(assetInfo.name)) {
            return mode === 'production' ? 'assets/[name].[hash].mjs' : 'assets/[name].[hash].js';
          }
          return 'assets/[name].[hash].[ext]';
        }
      }
    }
  },
  plugins: [
    react(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  publicDir: 'public',
}));
