import test, { after, before, describe, it } from "node:test";
import assert from "node:assert";
import { existsSync } from "fs";
import * as fs from "node:fs/promises";
import { Options, run } from "../src/tool";

async function filesContentsAreSame(
  expectedFilePath: string,
  testedFilePath: string
): Promise<boolean> {
  if (!existsSync(testedFilePath)) {
    return false;
  }
  const expectedFileContent = await fs.readFile(expectedFilePath);
  const testedFileContent = await fs.readFile(testedFilePath);
  return expectedFileContent.toString() === testedFileContent.toString();
}

describe("runs expectedly", () => {
  before(async () => {
    const options: Options = {
      flags: {
        input: "test/input/petstore.yaml",
        output: "test/tempoutput/",
      },
    };
    await run(options);
  });

  const expectedFilePaths = [
    "test/expected/zod-Pet.output",
    "test/expected/zod-Pets.output",
    "test/expected/zod-Error.output",
  ];

  const testedFilePaths = [
    "test/tempoutput/zod-Pet.js",
    "test/tempoutput/zod-Pets.js",
    "test/tempoutput/zod-Error.js",
  ];
  for (let i = 0; i < expectedFilePaths.length; i++) {
    const expectedFilePath = expectedFilePaths[i];
    const testedFilePath = testedFilePaths[i];
    it(`should be the same as expected file ${expectedFilePath}`, async () => {
      return assert(
        await filesContentsAreSame(expectedFilePath, testedFilePath),
        `${expectedFilePath} and ${testedFilePath} seems to differ`
      );
    });
  }

  after(() => {
    fs.rmdir("test/tempoutput", { recursive: true });
  });
});
