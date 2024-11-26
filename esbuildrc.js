import { context } from "esbuild";
import { esbuildTsToJson } from "./dist/index.js";

(async () => {
  try {
    const ctx = await context({
      entryPoints: ["./test/manifest.ts"],
      outdir: "./test/out",
      bundle: true,
      write: false,
      format: "esm",
      plugins: [esbuildTsToJson()],
    });

    ctx.watch();
  } catch (error) {
    console.error("Build failed:", error);
    process.exit(1);
  }
})();
