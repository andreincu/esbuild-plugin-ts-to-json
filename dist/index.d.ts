import { Plugin } from 'esbuild';

/**
 * Esbuild plugin to convert TypeScript to JSON format.
 *
 * @requires
 * - `entryPoints` (array of strings) is required.
 * - `write` set to false.
 * - `bundle` set to false.
 * - `outdir` is by default `./build`.
 */
declare function esbuildTsToJson(): Plugin;

export { esbuildTsToJson };
