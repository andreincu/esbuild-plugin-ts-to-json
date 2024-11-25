import { build } from "esbuild";
import { esbuildTsToJson } from "./dist/index.js";

(async () => {
  try {
    await build({
      entryPoints: ["./test/manifest.ts"],
      outdir: "./test/out",
      bundle: false, // Avoid bundling for JSON generation
      write: false,
      plugins: [esbuildTsToJson()],
    });
  } catch (error) {
    console.error("Build failed:", error);
    process.exit(1);
  }
})();
