import fs from "fs";
import path from "path";
import Movies from "../models/movies.model.js";

const dictPath = path.join(process.cwd(), "data", "dict.json");
let dict;
fs.readFile(dictPath, (err, data) => {
  if (err) throw err;
  dict = JSON.parse(data);
});

export const searchMovies = (req, res, next) => {
  const searchKey = req.query.keywork;
  const page = req.query.page;

  res.send(Movies.search(searchKey, page));
};
