import type { BuildOptions, OutputFile, Plugin, PluginBuild } from "esbuild";
import { mkdir, writeFile } from "fs/promises";
import path from "path";

/**
 * An esbuild plugin to convert TypeScript modules into JSON files.
 *
 * This plugin processes bundled TypeScript files and writes their default
 * exports as JSON. It requires specific esbuild configuration options for compatibility.
 *
 * ### Required esbuild Options:
 * - `write: false` - Prevent writing files directly to disk.
 * - `bundle: true` - Ensure dependencies are resolved.
 * - `format: "esm"` - Use ES module output for dynamic imports.
 *
 * ### Example:
 * ```javascript
 * import { build } from "esbuild";
 * import { esbuildTsToJson } from "./esbuild-plugin-ts-to-json";
 *
 * await build({
 *   entryPoints: ["src/index.ts"],
 *   outfile: "out/bundle.js",
 *   bundle: true,
 *   write: false,
 *   format: "esm",
 *   plugins: [esbuildTsToJson()],
 * });
 * ```
 *
 * @returns {Plugin} The esbuild plugin instance.
 *
 * @throws {Error} If required esbuild options are not set.
 */
export function esbuildTsToJson(): Plugin {
  return {
    name: "esbuild-plugin-ts-to-json",
    setup(build: PluginBuild) {
      build.onEnd(async (result) => {
        validateBuildOptions(build.initialOptions);

        if (!result?.outputFiles?.length) {
          throw new Error("No output files found. Ensure your esbuild config is properly set.");
        }

        await Promise.all(result.outputFiles.map(transformFileToJson));
      });
    },
  };
}

async function transformFileToJson(file: OutputFile) {
  const { dir, name } = path.parse(file.path);
  const outputFilePath = path.resolve(dir, `${name}.json`);

  try {
    const moduleURI = `data:text/javascript,${encodeURIComponent(file.text)}`;
    const { default: exportedData = {} } = await import(moduleURI);

    // Serialize the default export to JSON
    const jsonContent = JSON.stringify(exportedData, null, 2);

    // Write JSON file to disk
    await mkdir(path.dirname(outputFilePath), { recursive: true });
    await writeFile(outputFilePath, jsonContent);
  } catch (error) {
    console.error(`Failed to process ${file.path}:`, error);
  }
}

function validateBuildOptions({ write, bundle, format }: BuildOptions) {
  if (write) {
    throw new Error(
      `esbuild config: "write" must be set to false. Add "write: false" to your config.`
    );
  }

  if (!bundle) {
    throw new Error(
      `esbuild config: "bundle" must be set to true. Add "bundle: true" to your config.`
    );
  }

  if (format !== "esm") {
    throw new Error(
      `esbuild config: "format" must be set to "esm". Add "format: 'esm'" to your config.`
    );
  }
}
