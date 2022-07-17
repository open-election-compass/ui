/// <reference types="vitest" />
import { fileURLToPath, URL } from 'url';
import path from 'path';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import dts from 'vite-plugin-dts';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    dts({
      outputDir: path.resolve(__dirname, 'types'),
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/main.ts'),
      name: 'OpenElectionCompassUI',
      fileName: (format) => `open-election-compass-ui.${format}.min.js`,
    },
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      external: [
        'vue',
        '@fortawesome/vue-fontawesome',
        '@fortawesome/fontawesome-svg-core',
        '@fortawesome/free-solid-svg-icons',
        '@vueuse/core',
        'vee-validate',
        'vue-i18n',
      ],
      output: {
        // Provide global variables to use in the UMD build
        // for externalized deps
        globals: {
          'vue': 'Vue',
          'vee-validate': 'vee-validate',
        },
      },
    },
  },
});
