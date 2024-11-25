import { context } from "esbuild";
import { esbuildTsToJson } from "./dist/index.js";

(async () => {
  try {
    const ctx = await context({
      entryPoints: ["./test/manifest.ts"],
      outdir: "./test/out",
      bundle: false, // Avoid bundling for JSON generation
      write: false,
      logLevel: "info",
      plugins: [esbuildTsToJson()],
    });

    ctx.watch();
  } catch (error) {
    console.error("Build failed:", error);
    process.exit(1);
  }
})();
