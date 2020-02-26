const initialState = {
  moviesByGenres: [],
  moviesByGenresLoading: false,
  moviesByYear: [],
  moviesByYearLoading: false,
  trendingMovies: [],
  trendingMoviesLoading: false
};
const movies = (state = initialState, action) => {
  switch (action.type) {
    case "SET_MOVIES_BY_GENRES":
      return {
        ...state,
        moviesByGenres: action.moviesByGenres,
        moviesByGenresLoading: false
      };
    case "SET_MOVIES_BY_GENRES_LOADING":
      return {
        ...state,
        moviesByGenresLoading: action.moviesByGenresLoading
      };

    case "SET_MOVIES_BY_YEAR":
      return {
        ...state,
        moviesByYear: action.moviesByYear,
        moviesByYearLoading: false
      };
    case "SET_MOVIES_BY_YEAR_LOADING":
      return {
        ...state,
        moviesByYearLoading: action.moviesByYearLoading
      };

    case "SET_TRENDING_MOVIES":
      return {
        ...state,
        trendingMovies: action.trendingMovies,
        trendingMoviesLoading: false
      };
    case "SET_TRENDING_MOVIES_LOADING":
      return { ...state, trendingMoviesLoading: action.trendingMoviesLoading };
    default:
      return state;
  }
};
export default movies;
