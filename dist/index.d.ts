import { Plugin } from 'esbuild';

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
declare function esbuildTsToJson(): Plugin;

export { esbuildTsToJson };
