import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: vitePreprocess(),
  kit: {
    prerender: {
      handleHttpError: ({ path, referrer, message }) => {
        if (path === '/custom.css') {
          return;
        }

        // otherwise fail the build
        throw new Error(message);
      },
    },
    adapter: adapter({
      // fallback: 'index.html',
      precompress: true,
    }),
    alias: {
      $lib: 'src/lib',
      '$lib/*': 'src/lib/*',
      '@test-data': 'src/test-data',
    },
  },
};

export default config;
