#! /usr/bin/env node

import { OpenAPIV3 } from "openapi-types";
import { componentSchemasParser } from "./parser/parser";
import init from "./utils/init";
import cli from "./utils/cli";
import log from "./utils/log";
import path from "path";
import * as fs from "node:fs/promises";
import { existsSync } from "fs";
import axios from 'axios'
import yaml from 'js-yaml'

(async () => {
  init()
  let data: OpenAPIV3.Document;
  if (
    cli.flags.input.startsWith("http://") ||
    cli.flags.input.startsWith("https://")
  ) {
    const res = await axios.get(
      cli.flags.input,
      JSON.parse(cli.flags.axiosConfig || "{}")
    );
    if (res.status < 300) {
      data = res.data;
    }
  } else if (existsSync(cli.flags.input)) {
    const rawData = await fs.readFile(cli.flags.input, 'utf-8')
    data = yaml.load(rawData) as OpenAPIV3.Document
  } else {
    log('The schema file you have given doesn\'t exist')
    return
  }
  const zodFileContents = await componentSchemasParser(data! || {});
  if (!existsSync(cli.flags.output)) {
    fs.mkdir(cli.flags.output, { recursive: true });
  }
  zodFileContents.forEach(async ([name, fileContent]) => {
    const file = await fs.open(path.join(cli.flags.output, name), "w");
    await file.write(fileContent);
    await file.close();
  });
})();
