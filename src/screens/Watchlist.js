import React from "react";
import Load from "../components/Load";
import { Link } from "react-router-dom";
import _ from "lodash";

class Watchlist extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      moviesInformation: [],
      loading: true
    };
  }

  getActualWatchList = () => {
    let actualWatchList = JSON.parse(
      localStorage.getItem("watchlistMovieIds") || []
    );
    let currentUniqueWatchList = _.uniqBy(actualWatchList, "id");
    console.log(currentUniqueWatchList);
    this.setState({ moviesInformation: currentUniqueWatchList }, () =>
      this.setState({ loading: false })
    );
  };

  removeToWatchList = movieId => {
    let currentWatchlist =
      JSON.parse(localStorage.getItem("watchlistMovieIds")) || [];
    let index = currentWatchlist.findIndex(element => element.id === movieId);
    currentWatchlist.splice(index, 1);
    localStorage.setItem("watchlistMovieIds", JSON.stringify(currentWatchlist));
    this.setState({ moviesInformation: currentWatchlist });
  };

  clearWatchList = () => {
    localStorage.clear();
    this.setState({ moviesInformation: [] });
  };

  componentDidMount() {
    this.getActualWatchList();
  }

  render() {
    if (this.state.loading) {
      return <Load />;
    }
    if (this.state.moviesInformation === []) {
      return (
        <div className={"Container"}>
          <div className={"ClearAll"}>
            <h1>there is nothing here</h1>
          </div>
        </div>
      );
    }
    return (
      <div className={"Container"}>
        <div className={"ClearAll"}>
          <button onClick={() => this.clearWatchList()}>Clear All</button>
        </div>
        <div className={"KnownForItems"} style={{ flexDirection: "column" }}>
          {this.state.moviesInformation.map(result => (
            <div key={result.id} style={{ flexDirection: "row" }}>
              <Link key={result.id} to={`/InformationPage/${result.id}`}>
                <img
                  src={`https://image.tmdb.org/t/p/w200${result.poster_path}`}
                  alt={result.id}
                />
                {result.original_title}
              </Link>
              <button onClick={() => this.removeToWatchList(result.id)}>
                remove
              </button>
              <h2>{result.overview}</h2>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default Watchlist;
