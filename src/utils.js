import _ from "lodash";

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
  const updatedWatchList = currentWatchlist.filter(
    element => element.id !== movieId
  );
  localStorage.setItem("watchlistMovieIds", JSON.stringify(updatedWatchList));
};

export const isMovieInWatchList = movieId => {
  let currentWatchlist = JSON.stringify(
    localStorage.getItem("watchlistMovieIds")
  );
  return _.includes(currentWatchlist, movieId);
};

export const clearWatchList = () => {
  localStorage.setItem("watchlistMovieIds", "[]");
};
