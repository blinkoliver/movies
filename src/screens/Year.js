import React from "react";
import Loading from "../components/Loading";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getMoviesByYear } from "../actions/movies";

class Year extends React.Component {
  componentDidMount() {
    this.props.getMoviesByYear(
      `https://api.themoviedb.org/3/discover/movie?api_key=6ed6e56030be8bc7d1821d5b302e302e&language=en-US&sort_by=popularity.desc&certification_country=RU&include_adult=false&include_video=false&page=1&year=${this.props.match.params.id}`
    );
  }

  componentDidUpdate(prevProps) {
    if (this.props.match.params.id !== prevProps.match.params.id) {
      this.componentDidMount(this.props.match.params.id);
    }
  }

  render() {
    if (this.props.moviesByYearLoading) {
      return <Loading/>;
    }
    return (
      <div className={"Container"}>
        <h1>Films of {this.props.match.params.id}</h1>
        <div className={"KnownForItems"} style={{ flexDirection: "column" }}>
          {this.props.moviesByYear.map((result) => (
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
  }
}

const mapStateToProps = (state) => ({
  moviesByYear: state.movies.moviesByYear,
  moviesByYearLoading: state.movies.moviesByYearLoading
});

const mapDispatchToProps = (dispatch) => ({
  getMoviesByYear: (url) => dispatch(getMoviesByYear(url))
});

export default connect(mapStateToProps, mapDispatchToProps)(Year);
