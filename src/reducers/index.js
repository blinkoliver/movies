import { combineReducers } from "redux";
import movies from "./movies";
import personInformation from "./personInformation"

export default combineReducers({
  movies, personInformation
});
