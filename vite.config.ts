import solid from "solid-start/vite";
import { defineConfig } from "vite";

export default defineConfig({
  server: {
    port: 2002
  },
  plugins: [solid()],
});
