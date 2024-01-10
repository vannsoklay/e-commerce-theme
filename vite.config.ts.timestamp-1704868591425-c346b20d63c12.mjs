// vite.config.ts
import solid from "file:///Users/vannsoklay/Dev/e-commerce-theme-riverbase/node_modules/.pnpm/solid-start@0.3.10_@solidjs+meta@0.29.3_@solidjs+router@0.8.4_solid-js@1.8.7_solid-start-node@0.3.10_vite@4.5.1/node_modules/solid-start/vite/plugin.js";
import solidPlugin from "file:///Users/vannsoklay/Dev/e-commerce-theme-riverbase/node_modules/.pnpm/vite-plugin-solid@2.8.0_solid-js@1.8.7_vite@4.5.1/node_modules/vite-plugin-solid/dist/esm/index.mjs";
import { defineConfig, loadEnv } from "file:///Users/vannsoklay/Dev/e-commerce-theme-riverbase/node_modules/.pnpm/vite@4.5.1_@types+node@20.10.4/node_modules/vite/dist/node/index.js";
var vite_config_default = defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());
  const PORT = `${env.VITE_PORT ?? "1024"}`;
  return {
    server: {
      port: parseInt(PORT)
    },
    build: {
      target: "esnext"
    },
    plugins: [solid(), solidPlugin()]
  };
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvVXNlcnMvdmFubnNva2xheS9EZXYvZS1jb21tZXJjZS10aGVtZS1yaXZlcmJhc2VcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIi9Vc2Vycy92YW5uc29rbGF5L0Rldi9lLWNvbW1lcmNlLXRoZW1lLXJpdmVyYmFzZS92aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vVXNlcnMvdmFubnNva2xheS9EZXYvZS1jb21tZXJjZS10aGVtZS1yaXZlcmJhc2Uvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgc29saWQgZnJvbSBcInNvbGlkLXN0YXJ0L3ZpdGVcIjtcbmltcG9ydCBzb2xpZFBsdWdpbiBmcm9tIFwidml0ZS1wbHVnaW4tc29saWRcIjtcblxuaW1wb3J0IHsgQ29uZmlnRW52LCBkZWZpbmVDb25maWcsIGxvYWRFbnYgfSBmcm9tIFwidml0ZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoKHsgbW9kZSB9OiBDb25maWdFbnYpID0+IHtcbiAgY29uc3QgZW52ID0gbG9hZEVudihtb2RlLCBwcm9jZXNzLmN3ZCgpKTtcbiAgY29uc3QgUE9SVCA9IGAke2Vudi5WSVRFX1BPUlQgPz8gXCIxMDI0XCJ9YDtcblxuICByZXR1cm4ge1xuICAgIHNlcnZlcjoge1xuICAgICAgcG9ydDogcGFyc2VJbnQoUE9SVCksXG4gICAgfSxcbiAgICBidWlsZDoge1xuICAgICAgdGFyZ2V0OiBcImVzbmV4dFwiLFxuICAgIH0sXG4gICAgcGx1Z2luczogW3NvbGlkKCksIHNvbGlkUGx1Z2luKCldLFxuICB9O1xufSk7XG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQWtVLE9BQU8sV0FBVztBQUNwVixPQUFPLGlCQUFpQjtBQUV4QixTQUFvQixjQUFjLGVBQWU7QUFFakQsSUFBTyxzQkFBUSxhQUFhLENBQUMsRUFBRSxLQUFLLE1BQWlCO0FBQ25ELFFBQU0sTUFBTSxRQUFRLE1BQU0sUUFBUSxJQUFJLENBQUM7QUFDdkMsUUFBTSxPQUFPLEdBQUcsSUFBSSxhQUFhLE1BQU07QUFFdkMsU0FBTztBQUFBLElBQ0wsUUFBUTtBQUFBLE1BQ04sTUFBTSxTQUFTLElBQUk7QUFBQSxJQUNyQjtBQUFBLElBQ0EsT0FBTztBQUFBLE1BQ0wsUUFBUTtBQUFBLElBQ1Y7QUFBQSxJQUNBLFNBQVMsQ0FBQyxNQUFNLEdBQUcsWUFBWSxDQUFDO0FBQUEsRUFDbEM7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
