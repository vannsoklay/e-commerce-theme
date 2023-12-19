import solid from "solid-start/vite";
import solidPlugin from "vite-plugin-solid";

import { ConfigEnv, defineConfig, loadEnv } from "vite";

export default defineConfig(({ mode }: ConfigEnv) => {
  const env = loadEnv(mode, process.cwd());
  const PORT = `${env.VITE_PORT ?? "1024"}`;

  return {
    server: {
      port: parseInt(PORT),
    },
    build: {
      target: "esnext",
    },
    plugins: [
      solid(),
      solidPlugin({
        babel: {
          plugins: [
            [
              "@locator/babel-jsx/dist",
              {
                env: "development",
              },
            ],
          ],
        },
      }),
    ],
  };
});
