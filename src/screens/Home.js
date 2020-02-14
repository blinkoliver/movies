import React from "react";
import Load from "../components/Load";
import { Link } from "react-router-dom";
import { Fetch } from "../utils";
import { connect } from "react-redux";
import { setTrendingMovies } from "../actions/trendingMovies";

class Home extends React.Component {
  fetchTrendingFilm() {
    Fetch(
      `https://api.themoviedb.org/3/trending/movie/week?api_key=6ed6e56030be8bc7d1821d5b302e302e`
    ).then(trendingMovies => this.props.setTrendingMovies(trendingMovies));
  }

  componentDidMount() {
    this.fetchTrendingFilm();
  }

  render() {
    if (this.props.trendingMovies.loading)
      return (
        <div className={"Container"}>
          <div>
            <h1 style={{ color: "darkslategray" }}>Trending movies this week</h1>
          </div>
          <div className={"KnownForItems"} style={{ flexDirection: "column" }}>
            {this.props.trendingMovies.trendingMovies.results
              .slice(0, 6)
              .map(result=>(
                <div key={result.id} style={{ flexDirection: "row" }}>
                  <Link key={result.id} to={`/InformationPage/${result.id}`}>
                    <img src={`https://image.tmdb.org/t/p/w200${result.poster_path}`}alt={result.id}/>
                    {result.original_title}
                  </Link>
                  <h2 style={{ color: "darkslategray" }}>{result.overview}</h2>
                </div>
              ))}
          </div>
        </div>
      );
    return <Load />;
  }
}

const mapStateToProps = state => ( {
  trendingMovies: state.trendingMovies
});

const mapDispatchToProps = dispatch => ( {
  setTrendingMovies: trendingMovies => dispatch(setTrendingMovies(trendingMovies))
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
