import { Plugin } from 'esbuild';

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
declare function esbuildTsToJson(): Plugin;

export { esbuildTsToJson };
