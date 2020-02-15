import React from "react";
import Load from "../components/Load";
import { Link } from "react-router-dom";
import { Fetch } from "../utils";
import { connect } from "react-redux";
import { setMoviesByYear } from "../actions/movies";

class Year extends React.Component {
  fetchFilmsInfoByYear() {
    Fetch(
      `https://api.themoviedb.org/3/discover/movie?api_key=6ed6e56030be8bc7d1821d5b302e302e&language=en-US&sort_by=popularity.desc&certification_country=RU&include_adult=false&include_video=false&page=1&year=${this.props.match.params.id}`
    ).then((moviesByYear) => this.props.setMoviesByYear(moviesByYear));
  }

  componentDidMount() {
    this.fetchFilmsInfoByYear();
  }

  componentDidUpdate(prevProps) {
    if (this.props.match.params.id !== prevProps.match.params.id) {
      this.fetchFilmsInfoByYear(this.props.match.params.id);
    }
  }

  render() {
    if (this.props.moviesByYearLoading)
      return (
        <div className={"Container"}>
          <h1>Films of {this.props.match.params.id}</h1>
          <div className={"KnownForItems"} style={{ flexDirection: "column" }}>
            {this.props.moviesByYear.results.map((result) => (
              <div key={result.id} style={{ flexDirection: "row" }}>
                <Link key={result.id} to={`/InformationPage/${result.id}`}>
                  <img
                    src={`https://image.tmdb.org/t/p/w200${result.poster_path}`}
                    alt={result.id}
                  />
                  {result.original_title}
                </Link>
                <h2>{result.overview}</h2>
              </div>
            ))}
          </div>
        </div>
      );
    return <Load />;
  }
}

const mapStateToProps = (state) => ({
  moviesByYear: state.movies.moviesByYear,
  moviesByYearLoading: state.movies.moviesByYearLoading
});

const mapDispatchToProps = (dispatch) => ({
  setMoviesByYear: (moviesByYear) => dispatch(setMoviesByYear(moviesByYear))
});

export default connect(mapStateToProps, mapDispatchToProps)(Year);
