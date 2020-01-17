import React from "react";
import Load from "../components/Load";
import { Link } from "react-router-dom";
import _ from "lodash";
import { removeFromWatchList, clearWatchList } from "../utils";

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
      localStorage.getItem("watchlistMovieIds") || "[]"
    );
    let currentUniqueWatchList = _.uniqBy(actualWatchList, "id");
    this.setState({ moviesInformation: currentUniqueWatchList }, () =>
      this.setState({ loading: false })
    );
  };

  componentDidMount() {
    this.getActualWatchList();
  }

  render() {
    console.log(this.state.moviesInformation);
    if (this.state.loading) {
      return <Load />;
    }
    return (
      <div className={"Container"}>
        <div className={"ClearAll"}>
          {this.state.moviesInformation.length === 0 ? (
            <h1>there is nothing here</h1>
          ) : (
            <button
              onClick={() => {
                clearWatchList();
                this.setState({ moviesInformation: [] });
              }}
            >
              Clear All
            </button>
          )}
        </div>
        <div className={"KnownForItems"} style={{ flexDirection: "column" }}>
          {this.state.moviesInformation.map(result => (
            <div id={"Suggest"} key={result.id}>
              <div>
                <Link key={result.id} to={`/InformationPage/${result.id}`}>
                  <img
                    src={`https://image.tmdb.org/t/p/w200${result.poster_path}`}
                    alt={result.id}
                  />
                  {result.original_title}
                </Link>
                <button
                  onClick={() => {
                    removeFromWatchList(result.id);
                    this.getActualWatchList();
                  }}
                >
                  <h3>Remove</h3>
                </button>
              </div>
              <h2>{result.overview}</h2>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default Watchlist;
