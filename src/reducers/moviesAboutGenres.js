const initialState = {
        moviesAboutGenres: [],
        loading: false
  };
const moviesAboutGenres = (state = initialState, action) => {
    switch (action.type) {
      case "SET_MOVIES_ABOUT_GENRES":
        return {
          ...state,
          moviesAboutGenres: action.moviesAboutGenres,
          loading: true
        };

      default:
        return state;
    }
  };
 export default moviesAboutGenres