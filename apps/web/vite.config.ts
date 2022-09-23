import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'node:path';
import fs from 'node:fs';

const dirAliases = fs
  .readdirSync(path.join(__dirname, 'src'), { withFileTypes: true })
  .filter((item) => item.isDirectory())
  .map((item) => item.name)
  .reduce((acc, current) => {
    acc[current] = path.resolve(__dirname, `src/${current}`);
    return acc;
  }, {});

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: dirAliases,
  },
  server: {
    proxy: {
      '/^/$/': {
        target: '/home',
      },
    },
  },
});
