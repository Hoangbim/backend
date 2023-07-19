import { readGenreId } from "../models/Genres.model.js";
import Videos from "../models/Videos.model.js";
import Movies from "../models/movies.model.js";


export const getAllMovies = (req, res, next) => {
  res.send(Movies.data());
};
export const getRatingMovies = (req, res, next) => {
  console.log("query", req.query.page);

  res.send(Movies.rating(req.query.page));
};

export const getTrendingMovies = (req, res, next) => {
  console.log("query", req.query.page);

  res.send(Movies.trending(req.query.page));
};

export const getMoviesByGenre = (req, res, next) => {
  //send error when not found id parram
  if (!req.query.genre) {
    res.status(400).send({ message: "Not found gerne parram" });
  }

  if (req.query.genre) {
    const response = Movies.discover(req.query.genre, req.query.page);

    if (response === "no exist") {
      res.status(400).send({ message: "Not found that gerne id" });
    } else {
      res.send(response);
    }
  }
};

export const getGenreId = (req, res, next) => {
  res.send(readGenreId());
};

///////////////get movie trailer or feature/////////////
export const getMovieVideos = (req, res, next) => {
  if (!req.query.id) {
    res.status(400).send({ message: "Not found video id parram" });
  }

  if (req.query.id) {
    const response = Videos.movieVideos(req.query.id);

    if (response === "not found") {
      res.status(404).send({ message: "Not Found Video" });
    } else {
      res.send(response);
    }
  }
};
