import assert from "assert";
import { build } from "esbuild";
import * as fs from "fs";
import * as fsPromises from "fs/promises";
import { afterEach, beforeEach, describe, it } from "node:test";
import os from "os";
import * as path from "path";
import { esbuildTsToJson } from "../../dist/index.js";

describe("build-single-ts-to-json", () => {
  let savedDir;
  let testDir; // Temporary test directory

  beforeEach(async () => {
    savedDir = process.cwd();
    testDir = await fsPromises.mkdtemp(
      path.join(os.tmpdir(), "esbuild-plugin-test_")
    );
    process.chdir(testDir); // Change to the temporary directory
  });

  afterEach(async () => {
    try {
      process.chdir(savedDir); // Restore original directory
    } finally {
      await fsPromises.rm(testDir, { recursive: true, force: true }); // Cleanup temporary directory
    }
  });

  const helper = async () => {
    // Use manifest.test.ts as the input file
    const inputFile = path.resolve(
      savedDir,
      "test/e2e/manifest.test.ts" // Relative path from the current test directory
    );

    // Output file within the temporary testDir
    const outputFile = "manifest.json";

    try {
      // Run esbuild with the correct entryPoints format
      await build({
        entryPoints: [
          { in: inputFile, out: outputFile }, // Correct format
        ],
        outdir: "out",
        write: true,
        bundle: false,
        plugins: [esbuildTsToJson()],
      });

      const outputFilePath = path.join(testDir, "out", outputFile);
      assert.ok(fs.existsSync(outputFilePath), "Output file not found.");
      return await fsPromises.readFile(outputFilePath, "utf8");
    } catch (error) {
      throw error;
    }
  };

  it("convert a single ts to a single manifest", async () => {
    const result = await helper();
    console.log("🚀 ~ result:", result);

    assert.ok(result);
    assert.strictEqual(
      result.trim(),
      `{
  "key": "value"
}` // Replace with the actual expected output
    );
  });
});
