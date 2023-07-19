import path from "path";
import fs from "fs";

const dictPath = path.join(process.cwd(), "data", "userToken.json");

export const userToken = JSON.parse(fs.readFileSync(dictPath, "utf-8"));
