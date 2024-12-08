# A plugin for esbuild to transform a typescript file to JSON file

## Description

This plugin use build points to transform a typescript file to JSON file. That's why I recommend using a dedicated build for this plugin. It takes the entryPoints and outputs into the outdir. There are also some esbuild options that must be set accordingly for the plugin to work as expected.

```js
  bundle: true,
  write: false,
  format: "esm",
```

## Why this plugin?

To unlock the use of custom functions, type definitions, or any other dynamic logic.

## Installation

Add the package to your `"devDependencies"`:

```sh
npm i -D esbuild-plugin-ts-to-json
```

Define an esbuild configuration:

```js
import { build } from "esbuild";

await build({
  entryPoints,
  outdir,
  bundle: true,
  write: false,
  format: "esm",
  plugins: [esbuildTsToJson()],
});
```
