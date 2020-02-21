import React from "react";
import Load from "../components/Load";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getTrendingMovies } from "../actions/movies";

class Home extends React.Component {
  componentDidMount() {
    this.props.getTrendingMovies(
      `https://api.themoviedb.org/3/trending/movie/week?api_key=6ed6e56030be8bc7d1821d5b302e302e`
    );
  }

  render() {
    if (this.props.trendingMoviesLoading) {
      return <Load />;
    }
    return (
      <div className={"Container"}>
        <div>
          <h1 style={{ color: "darkslategray" }}>Trending movies this week</h1>
        </div>
        <div className={"KnownForItems"} style={{ flexDirection: "column" }}>
          {this.props.trendingMovies.slice(0, 6).map((result) => (
            <div key={result.id} style={{ flexDirection: "row" }}>
              <Link key={result.id} to={`/InformationPage/${result.id}`}>
                <img
                  src={`https://image.tmdb.org/t/p/w200${result.poster_path}`}
                  alt={result.id}
                />
                {result.original_title}
              </Link>
              <h2 style={{ color: "darkslategray" }}>{result.overview}</h2>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    trendingMovies: state.movies.trendingMovies,
    trendingMoviesLoading: state.movies.trendingMoviesLoading
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getTrendingMovies: (url) => dispatch(getTrendingMovies(url))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
