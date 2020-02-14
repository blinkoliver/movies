const initialState = {
    moviesAboutYear: [],
    loading: false
};
const moviesAboutYear = (state = initialState, action) => {
switch (action.type) {
  case "SET_MOVIES_ABOUT_YEAR":
    return {
      ...state,
      moviesAboutYear: action.moviesAboutYear,
      loading: true
    };

  default:
    return state;
}
};
export default moviesAboutYear