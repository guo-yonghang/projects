import { defineConfig } from '@vben/vite-config';

import ElementPlus from 'unplugin-element-plus/vite';

export default defineConfig(async () => {
  return {
    application: {},
    vite: {
      plugins: [
        ElementPlus({
          format: 'esm',
        }) as any,
      ],
      server: {
        host: '0.0.0.0',
        cors: true,
        proxy: {
          '/api': {
            changeOrigin: true,
            rewrite: (path) => path.replace(/^\/api/, ''),
            target: 'https://dev-api.hmlink.cn',
            ws: true,
          },
        },
      },
    },
  };
});
