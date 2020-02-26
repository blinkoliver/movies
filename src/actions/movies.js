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

export const getMoviesByGenres = (url) => {
  return (dispatch) => {
    dispatch(setMoviesByGenresLoading(true));
    Fetch(url).then((moviesByGenres) =>
      dispatch(setMoviesByGenres(moviesByGenres.results))
    );
  };
};
export const setMoviesByGenres = (moviesByGenres) => ({
  type: "SET_MOVIES_BY_GENRES",
  moviesByGenres
});
export const setMoviesByGenresLoading = (loading) => ({
  type: "SET_MOVIES_BY_GENRES_LOADING",
  moviesByGenresLoading: loading
});

export const getMoviesByYear = (url) => {
  return (dispatch) => {
    dispatch(setMoviesByYearLoading(true));
    Fetch(url).then((moviesByYear) =>
      dispatch(setMoviesByYear(moviesByYear.results))
    );
  };
};
export const setMoviesByYear = (moviesByYear) => ({
  type: "SET_MOVIES_BY_YEAR",
  moviesByYear
});
export const setMoviesByYearLoading = (loading) => ({
  type: "SET_MOVIES_BY_YEAR_LOADING",
  moviesByYearLoading: loading
});
