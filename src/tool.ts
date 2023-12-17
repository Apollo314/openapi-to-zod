import { OpenAPIV3 } from "openapi-types";
import { componentSchemasParser } from "./parser/parser";
import path from "path";
import * as fs from "node:fs/promises";
import { existsSync } from "fs";
import axios from "axios";
import yaml from "js-yaml";
import { error } from "console";

function file_template(zodObj: string): string {
  return `import { z } from "zod";\n\nexport default ${zodObj};\n`;
}

export type Options = {
  flags: {
    input: string;
    output: string;
    axiosConfig?: string;
    fileExt?: string;
  };
};

export async function run(options: Options) {
  let data: OpenAPIV3.Document;
  if (
    options.flags.input.startsWith("http://") ||
    options.flags.input.startsWith("https://")
  ) {
    const res = await axios.get(
      options.flags.input,
      JSON.parse(options.flags.axiosConfig || "{}")
    );
    if (res.status < 400) {
      data = res.data;
    } else {
      error("There was an error while fetching the data");
    }
  } else if (existsSync(options.flags.input)) {
    const rawData = await fs.readFile(options.flags.input, "utf-8");
    data = yaml.load(rawData) as OpenAPIV3.Document;
  } else {
    error("The schema file you have given doesn't exist");
    return;
  }
  const zodFileContents = await componentSchemasParser(
    data! || {},
    options.flags.fileExt
  );
  if (!existsSync(options.flags.output)) {
    fs.mkdir(options.flags.output, { recursive: true });
  }
  zodFileContents.forEach(async ([name, fileContent]) => {
    const file = await fs.open(path.join(options.flags.output, name), "w");
    await file.write(file_template(fileContent));
    await file.close();
  });
}
