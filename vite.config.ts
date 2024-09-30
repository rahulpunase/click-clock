import react from "@vitejs/plugin-react-swc";
import path from "path";
import { visualizer } from "rollup-plugin-visualizer";
import webpackStatsPlugin from "rollup-plugin-webpack-stats";
import { defineConfig, loadEnv } from "vite";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());
  return {
    server: {
      port: Number(env.VITE_PORT) || 5173,
    },
    plugins: [
      react(),
      visualizer({ open: true, filename: "bundle-visualization.html" }),
      webpackStatsPlugin(),
    ],
    build: {
      rollupOptions: {
        treeshake: true,
        output: {
          assetFileNames: "assets/[name].[hash][extname]",
          chunkFileNames: "assets/[name].[hash].js",
          entryFileNames: "assets/[name].[hash].js",
        },
      },
    },
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
        "@db": path.resolve(__dirname, "./convex"),
      },
    },
  };
});
