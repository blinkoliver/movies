export const Fetch = (url, params) => {
  return fetch(url).then(response => response.json());
};

export const addToWatchList = movieId => {
  let currentWatchlist =
    JSON.parse(localStorage.getItem("watchlistMovieIds")) || [];
  let updateWatchlist = [...currentWatchlist, movieId];
  localStorage.setItem("watchlistMovieIds", JSON.stringify(updateWatchlist));
};
