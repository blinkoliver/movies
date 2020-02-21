import { combineReducers } from "redux";
import movies from "./movies";
import personInformation from "./personInformation";
import informationAboutFilm from "./informationAboutFilm"

export default combineReducers({
  movies, personInformation, informationAboutFilm
});
