import assert from "assert";
import { build } from "esbuild";
import fsPromises from "fs/promises";
import { afterEach, beforeEach, describe, it } from "node:test";
import os from "os";
import path from "path";
import { esbuildTsToJson } from "../dist/index.js";
import expectedOutput from "./manifest.json" assert { type: "json" };

describe("build-single-ts-to-json", () => {
  let savedDir;
  let testDir; // Temporary test directory
  const outputDir = "out"; // Define output directory

  beforeEach(async () => {
    savedDir = process.cwd();
    testDir = await fsPromises.mkdtemp(
      path.join(os.tmpdir(), "esbuild-plugin-test_")
    );
    process.chdir(testDir); // Change to the temporary directory
  });

  afterEach(async () => {
    try {
      // Remove the output directory if it exists
      const outPath = path.join(testDir, outputDir);

      await fsPromises.rm(outPath, { recursive: true, force: true });
    } finally {
      process.chdir(savedDir); // Restore original directory
      await fsPromises.rm(testDir, { recursive: true, force: true }); // Cleanup temporary directory
    }
  });

  const helper = async () => {
    const inputFile = path.join(savedDir, "test/e2e/manifest.ts");
    console.log("🚀 ~ inputFile:", inputFile);

    // Run esbuild with the correct entryPoints format
    await build({
      entryPoints: [inputFile],
      outdir: outputDir,
      write: false,
      bundle: false,
      plugins: [esbuildTsToJson()],
    });

    const outputFile = "manifest.json";
    const outputFilePath = path.join(testDir, outputDir, outputFile);
    const content = await fsPromises.readFile(outputFilePath, "utf8");

    return JSON.parse(content);
  };

  it("convert a single ts to a single manifest", async () => {
    const result = await helper();

    assert.ok(result);
    assert.deepStrictEqual(result, expectedOutput);
  });
});
