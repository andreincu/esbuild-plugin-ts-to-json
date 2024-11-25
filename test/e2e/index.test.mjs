import assert from "assert";
import { build } from "esbuild";
import fs from "fs";
import fsPromises from "fs/promises";
import { afterEach, beforeEach, describe, it } from "node:test";
import os from "os";
import path from "path";
import { esbuildTsToJson } from "../../dist/index.js";

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
      if (fs.existsSync(outPath)) {
        await fsPromises.rm(outPath, { recursive: true, force: true });
      }
    } finally {
      process.chdir(savedDir); // Restore original directory
      await fsPromises.rm(testDir, { recursive: true, force: true }); // Cleanup temporary directory
    }
  });

  const helper = async () => {
    const inputFile = path.resolve(
      savedDir,
      "test/e2e/manifest.ts" // Use relative path to the original input file
    );

    const outputFile = "manifest.json";

    try {
      // Run esbuild with the correct entryPoints format
      await build({
        entryPoints: [
          { in: inputFile, out: outputFile }, // Correct format
        ],
        outdir: outputDir,
        write: false,
        bundle: false,
        plugins: [esbuildTsToJson()],
      });

      const outputFilePath = path.join(testDir, outputDir, outputFile);
      assert.ok(fs.existsSync(outputFilePath), "Output file not found.");
      const content = await fsPromises.readFile(outputFilePath, "utf8");
      return JSON.parse(content);
    } catch (error) {
      console.error("Error during build:", error);
      throw error; // Re-throw to ensure test fails properly
    }
  };

  it("convert a single ts to a single manifest", async () => {
    const result = await helper();

    assert.ok(result);
    assert.deepStrictEqual(result, expectedOutput);
  });
});
