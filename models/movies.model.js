import fs from "fs";
import path from "path";
import { readGenreId } from "./Genres.model.js";
import { findIntersection } from "./dict.model.js";
const p = path.join(process.cwd(), "data", "movieList.json");
const dictPath = path.join(process.cwd(), "data", "dict.json");
const movies = JSON.parse(fs.readFileSync(p, "utf-8"));
const sortRatingMovies = [...movies].sort((a, b) => {
  return b.vote_average - a.vote_average;
});

const sortTrendingMovies = [...movies].sort((a, b) => {
  return b.popularity - a.popularity;
});

const genreList = readGenreId();

let dict;
fs.readFile(dictPath, (err, data) => {
  if (err) throw err;
  dict = JSON.parse(data);
});

///////////////////////////get list genre id in data//////////////

let listOfGenreID = [];
movies.forEach((movie) => {
  listOfGenreID = [...listOfGenreID, ...movie.genre_ids];
});

/////////////////////////// list of genre ID///////////////////////////
const setOfListGenreID = Array.from(new Set(listOfGenreID));
setOfListGenreID.sort((a, b) => a - b);

/////////////////////////get reverted index///////////////////////////
let revertedGenreIndex = {};
setOfListGenreID.map((id) => {
  const index = [];
  for (let i = 0; i < movies.length; i++) {
    if (movies[i].genre_ids.includes(id)) index.push(i);
  }
  return (revertedGenreIndex[id] = index);
});

const Movies = {
  all: function () {
    return movies;
  },

  trending: (page) => {
    let pageNum = 1;

    if (!!page) pageNum = page > 0 ? page : 1;
    return {
      page: pageNum,
      results: sortTrendingMovies.slice(
        (pageNum - 1) * 20,
        (pageNum - 1) * 20 + 20
      ),
      total_page: Math.floor(sortTrendingMovies.length / 20) + 1,
      total_result: sortTrendingMovies.length,
    };
  },

  rating: (page) => {
    let pageNum = 1;
    if (!!page) pageNum = page > 0 ? page : 1;
    return {
      page: pageNum,
      results: sortRatingMovies.slice(
        (pageNum - 1) * 20,
        (pageNum - 1) * 20 + 20
      ),
      total_page: Math.floor(sortRatingMovies.length / 20) + 1,
      total_result: sortRatingMovies.length,
    };
  },

  discover: (id, page) => {
    const genre = genreList.find((genre) => genre.id === +id);

    if (!genre) return "no exist";

    if (!!genre) {
      const discoverMovies = revertedGenreIndex[id].map(
        (index) => movies[index]
      );

      // const discoverMovies = movies.filter((movie) =>
      //   movie.genre_ids.includes(+id)
      // );

      let pageNum = 1;
      if (!!page) pageNum = page > 0 ? page : 1;

      return {
        page: pageNum,
        results: discoverMovies.slice(
          (pageNum - 1) * 20,
          (pageNum - 1) * 20 + 20
        ),
        total_page: Math.floor(discoverMovies.length / 20) + 1,
        total_result: discoverMovies.length,
        genre_name: genre.name,
      };
    }
  },

  search: (keyword, page) => {
    ///////split keyword and turn to lowercase//////
    const searchArr = keyword.toLowerCase().split(" ");

    let searchResults;

    let searchIndex = dict[searchArr[0]];
    // let searchIndex = 1;
    let i = 1;
    while (i < searchArr.length) {
      searchIndex = findIntersection(searchIndex, dict[searchArr[i]]);
      i++;
    }

    ////////get search result by reverted index//////////////
    searchResults = searchIndex.map((index) => movies[index]);

    console.log("search index", searchIndex);

    //////split data to n page/////////////////////////////////
    let pageNum = 1;
    if (!!page) pageNum = page > 0 ? page : 1;

    return {
      page: pageNum,
      results: searchResults.slice((pageNum - 1) * 20, (pageNum - 1) * 20 + 20),
      total_page: Math.floor(searchResults.length / 20) + 1,
      total_result: searchResults.length,
    };
  },
};

export default Movies;
