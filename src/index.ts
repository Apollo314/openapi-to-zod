#! /usr/bin/env node

import init from "./utils/init";
import cli from "./utils/cli";
import { Options, run } from "./tool";

(async () => {
  init();
  run(cli as Options)
})();
