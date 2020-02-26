import { Fetch } from "../utils";

export const getInformationForInformationPage = (movieId) => {
  return (dispatch) => {
    dispatch(setInformationPageLoading(true));
    Fetch(
      `https://api.themoviedb.org/3/movie/${movieId}?api_key=6ed6e56030be8bc7d1821d5b302e302e&language=en-US`
    ).then((informationAboutFilm) =>
      dispatch(setInformationAboutFilm(informationAboutFilm))
    );
    Fetch(
      `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=6ed6e56030be8bc7d1821d5b302e302e`
    ).then((castAndCrew) => dispatch(setCastAndCrew(castAndCrew)));
    Fetch(
      `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=6ed6e56030be8bc7d1821d5b302e302e&language=en-US`
    ).then((trailers) => dispatch(setTrailers(trailers)));
    Fetch(
      `https://api.themoviedb.org/3/movie/${movieId}/recommendations?api_key=6ed6e56030be8bc7d1821d5b302e302e&language=en-US&page=1`
    ).then((recommendations) => dispatch(setRecommendations(recommendations.results)));
  };
};

export const setInformationPageLoading = (informationPageLoading) => ({
  type: "SET_INFORMATION_PAGE_LOADING",
  informationPageLoading: informationPageLoading
});
export const setInformationAboutFilm = (informationAboutFilm) => ({
  type: "SET_INFORMATION_ABOUT_FILM",
  informationAboutFilm
});
export const setCastAndCrew = (castAndCrew) => ({
  type: "SET_CAST_AND_CREW",
  castAndCrew
});
export const setTrailers = (trailers) => ({
  type: "SET_TRAILERS",
  trailers
});
export const setRecommendations = (recommendations) => ({
  type: "SET_RECOMMENDATIONS",
  recommendations
});
