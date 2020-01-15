import { includes } from "lodash";

export const Fetch = (url, params) => {
  return fetch(url).then(response => response.json());
};

export const addToWatchList = movieId => {
  let currentWatchlist =
    JSON.parse(localStorage.getItem("watchlistMovieIds")) || [];
  let updateWatchlist = [...currentWatchlist, movieId];
  localStorage.setItem("watchlistMovieIds", JSON.stringify(updateWatchlist));
};

export const removeFromWatchList = movieId => {
  let currentWatchlist =
    JSON.parse(localStorage.getItem("watchlistMovieIds")) || [];
  let index = currentWatchlist.findIndex(element => element.id === movieId);
  currentWatchlist.splice(index, 1);
  localStorage.setItem("watchlistMovieIds", JSON.stringify(currentWatchlist));
};
export const isMovieInWatchlist = movieId => {
  let currentWatchlist =
    JSON.parse(localStorage.getItem("watchlistMovieIds")) || [];
  if (!includes(currentWatchlist, movieId)) return true;
};
console.log(isMovieInWatchlist());
