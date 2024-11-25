import { defineConfig } from "tsup";

const env = process.env.NODE_ENV;

export default defineConfig({
  entry: ["src/index.ts"],
  outDir: "dist",
  format: ["cjs", "esm"],
  skipNodeModulesBundle: true,
  clean: true,
  dts: true,
  minify: true,
  bundle: true,
  sourcemap: true,
});
