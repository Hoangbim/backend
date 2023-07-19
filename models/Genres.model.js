import fs from "fs";
import path from "path";

const p = path.join(process.cwd(), "data", "genreList.json");
export const ListOfGenre = JSON.parse(fs.readFileSync(p, "utf8"));

export const readGenreId = () => {
  return ListOfGenre;
};
