const initialState = {
  informationAboutFilm: [],
  trailers: [],
  castAndCrew: [],
  recommendations: [],
  informationAboutFilmLoading: false
};

const informationAboutFilm = (state = initialState, action) => {
  switch (action.type) {
    case "SET_INFORMATION_ABOUT_FILM":
      return {
        ...state,
        informationAboutFilm: action.informationAboutFilm
      };
    case "SET_TRAILERS":
      return {
        ...state,
        trailers: action.trailers
      };
    case "SET_CAST_AND_CREW":
      return {
        ...state,
        castAndCrew: action.castAndCrew
      };
    case "SET_RECOMMENDATIONS":
      return {
        ...state,
        recommendations: action.recommendations,
        informationAboutFilmLoading: true
      };
    default:
      return state;
  }
};
export default informationAboutFilm;
