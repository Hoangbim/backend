import fs from "fs";
import path from "path";
const MediaTypes = {
  all: function () {
    const p = path.join(process.cwd(), "data", "mediaTypeList.json");
    return JSON.parse(fs.readFileSync(p, "utf8"));
  },
};

export default MediaTypes;
