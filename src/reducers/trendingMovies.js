const initialState = {
  loading: false,
  trendingMovies: []
};

const trendingMovies = (state = initialState, action) => {
  switch (action.type) {
    case "SET_TRENDING_MOVIES":
      return {
        ...state,
        trendingMovies: action.trendingMovies,
        loading: true
      };

    default:
      return state;
  }
};
export default trendingMovies;
