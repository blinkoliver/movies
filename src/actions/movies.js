import { Fetch } from "../utils";

export const getTrendingMovies = (url) => {
  return (dispatch) => {
    dispatch(setTrendingMoviesLoading(true));
    Fetch(url).then((trendingMovies) =>
      dispatch(setTrendingMovies(trendingMovies.results))
    );
  };
};

export const setTrendingMovies = (trendingMovies) => ({
  type: "SET_TRENDING_MOVIES",
  trendingMovies
});
export const setTrendingMoviesLoading = (loading) => ({
  type: "SET_TRENDING_MOVIES_LOADING",
  trendingMoviesLoading: loading
});
export const setMoviesByGenres = (moviesByGenres) => ({
  type: "SET_MOVIES_BY_GENRES",
  moviesByGenres
});
export const setMoviesByYear = (moviesByYear) => ({
  type: "SET_MOVIES_BY_YEAR",
  moviesByYear
});
