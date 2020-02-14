import { combineReducers } from "redux";
import trendingMovies from "./trendingMovies";
import moviesAboutGenres from "./moviesAboutGenres";
import moviesAboutYear from "../reducers/moviesAboutYear"

export default combineReducers({
  trendingMovies, moviesAboutGenres, moviesAboutYear
});
