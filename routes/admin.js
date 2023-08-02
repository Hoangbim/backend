import express from "express";
import {
  getMovieVideos,
  getMoviesByGenre,
  getRatingMovies,
  getTrendingMovies,
} from "../controller/admin.controller.js";
import { searchMovies } from "../controller/search.controller.js";
import { hoang } from "../models/remapCoorData.js";

const adminRouter = express.Router();

// adminRouter.get("/api/movies/trending", getTrendingMovies);
// adminRouter.get("/api/movies/top-rate", getRatingMovies);
// adminRouter.get("/api/movies/discover", getMoviesByGenre);
// adminRouter.get("/api/movies/video", getMovieVideos);
// adminRouter.get("/api/movies/search", searchMovies);

// adminRouter.get("/users", getUsers);

// // /admin/add-product => POST
// adminRouter.post("/", postProducts);
export default adminRouter;
