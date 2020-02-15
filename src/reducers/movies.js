const initialState = {
  moviesByGenres: [],
  moviesByGenresLoading: false,
  moviesByYear: [],
  moviesByYearLoading: false,
  trendingMovies: [],
  trendingMoviesLoading: false,
};
const movies = (state = initialState, action) => {
  switch (action.type) {
    case "SET_MOVIES_BY_GENRES":
      return {
        ...state,
        moviesByGenres: action.moviesByGenres,
        moviesByGenresLoading: true
      };
    case "SET_MOVIES_BY_YEAR":
      return {
        ...state,
        moviesByYear: action.moviesByYear,
        moviesByYearLoading: true
      };
    case "SET_TRENDING_MOVIES":
      return {
        ...state,
        trendingMovies: action.trendingMovies,
        trendingMoviesLoading: true
      };
    default:
      return state;
  }
};
export default movies;