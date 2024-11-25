import { Plugin, PluginBuild } from "esbuild";
import { mkdir, readFile, stat, writeFile } from "fs/promises";
import path from "path";
import {
  ModuleKind,
  ModuleResolutionKind,
  ScriptTarget,
  transpileModule,
  TranspileOptions,
} from "typescript";

const transpilerConfig: TranspileOptions = {
  compilerOptions: {
    module: ModuleKind.ESNext,
    moduleResolution: ModuleResolutionKind.Bundler,
    target: ScriptTarget.ES2017,
  },
};

// Helper function to ensure directory existence and write file
const writeJsonFile = async (filePath: string, content: string) => {
  const dir = path.dirname(filePath);
  await mkdir(dir, { recursive: true });
  await writeFile(filePath, content);
};

/**
 * Esbuild plugin to convert TypeScript to JSON format.
 *
 * @requires
 * - `entryPoints` (array of strings) is required.
 * - `write` set to false.
 * - `bundle` set to false.
 * - `outdir` is by default `./build`.
 */
export function esbuildTsToJson(): Plugin {
  return {
    name: "esbuild-plugin-ts-to-json",
    setup(build: PluginBuild) {
      build.onEnd(async () => {
        const { outdir = "./build", entryPoints } = build.initialOptions;

        if (!Array.isArray(entryPoints)) {
          throw new Error(`entryPoints must be an array of strings.`);
        }

        for (const input of entryPoints) {
          if (typeof input !== "string") {
            throw new Error(`Invalid entry point format: ${input}`);
          }

          // Read the TypeScript file
          const inputFilePath = path.resolve(input);
          const outputFileName = path.parse(input).name + ".json";
          const outputFilePath = path.resolve(outdir, outputFileName);

          try {
            // Check if the input file exists and is readable
            await stat(inputFilePath); //throw error if doesn't exists

            // Read the TypeScript file
            const source = await readFile(inputFilePath, "utf8");

            // Transpile TypeScript to JavaScript
            const { outputText } = transpileModule(source, transpilerConfig);

            // Create a new file in memory that can be imported as a module
            const moduleURI = `data:text/javascript,${encodeURIComponent(
              outputText
            )}`;

            // Dynamically import the transpiled module
            const { default: exportedData = {} } = await import(moduleURI);

            // Serialize the default export to JSON
            const jsonContent = JSON.stringify(exportedData, null, 2);

            // Write JSON file to disk
            await writeJsonFile(outputFilePath, jsonContent);
          } catch (error) {
            console.error(`Failed to process ${inputFilePath}:`, error);
          }
        }
      });
    },
  };
}
