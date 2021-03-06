import fs from "fs";
import { run } from "./src/app";
import { parseInputData } from "./src/services/parseInputData";

const data = fs.readFileSync("./commands.txt", "utf8");
const config = parseInputData(data);

run(config);
