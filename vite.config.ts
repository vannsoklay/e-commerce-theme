import solid from "solid-start/vite";

import { ConfigEnv, defineConfig, loadEnv } from 'vite';

export default defineConfig(({ mode }: ConfigEnv) => {
  const env = loadEnv(mode, process.cwd());
  const PORT = `${env.VITE_PORT ?? '1024'}`;

  return {
    server: {
      port: parseInt(PORT),
    },
    build: {
      target: "esnext",
    },
    plugins: [solid()],
  };
});