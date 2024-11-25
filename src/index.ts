import { Plugin, PluginBuild } from "esbuild";
import { mkdir, readFile, writeFile } from "fs/promises";
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

/**
 * Esbuild plugin to convert TypeScript to JSON format.
 * 
 * @requires
 * - `entryPoints` is required. only one entry point is supported. entry point format is `{in: string, out: string}`. 
 * - `outdir` is required.
 * - `write` set to false.
 * - `bundle` set to false.
 * 
 * @example 
 * await esbuild.build({
    entryPoints: [{ in: './src/manifest.ts', out: 'manifest.json' }],
    outdir: './build',
    bundle: false, // Avoid bundling for JSON generation
    write: false,
    plugins: [esbuildTsToJson()],
  });
 * 
 *  */
export function esbuildTsToJson(): Plugin {
  return {
    name: "esbuild-plugin-ts-to-json",
    setup(build: PluginBuild) {
      build.onEnd(async () => {
        const { outdir = "./build/manifest.json", entryPoints } =
          build.initialOptions;

        if (!Array.isArray(entryPoints)) {
          throw new Error(
            `entryPoints must be { in: string; out: string; }[] format.`
          );
        }

        for (const entryPoint of entryPoints) {
          if (typeof entryPoint === "string") {
            throw new Error(`Invalid entry point format: ${entryPoint}`);
          }

          // Read the TypeScript file
          const { in: input, out: output } = entryPoint;
          const inputFilePath = path.resolve(input);
          const outputFilePath = path.resolve(outdir + "/" + output);

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

          try {
            // ensure the directory exists before writing the file
            const dir = path.dirname(outputFilePath);
            await mkdir(dir, { recursive: true });

            //   writing the content into the file
            await writeFile(outputFilePath, jsonContent);
          } catch (error) {
            console.log(error);
          }
        }
      });
    },
  };
}
