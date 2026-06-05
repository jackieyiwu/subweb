import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';

const srcAlias = (path) => fileURLToPath(new URL(`./src/${path}`, import.meta.url));

export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
  ],
  resolve: {
    alias: {
      '@': srcAlias(''),
      layouts: srcAlias('layouts'),
      assets: srcAlias('assets'),
      components: srcAlias('components'),
      network: srcAlias('network'),
      views: srcAlias('views'),
      utils: srcAlias('utils'),
    },
  },
  build: {
    sourcemap: false,
  },
});
