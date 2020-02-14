const initialState = {
  loading: true,
  movies: []
};

const trendingMovies = (state = initialState, action) => {
  switch (action.type) {
    case "SET_POPULAR_MOVIES":
      return {
        ...state,
        movies: action.movies,
        loading: true
      };
    case "SET_MOVIES_LOADING":
      return {
        ...state,
        loading: false
      };
    default:
      return state;
  }
};
export default trendingMovies;
