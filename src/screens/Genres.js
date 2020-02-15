import React from "react";
import Load from "../components/Load";
import { Link } from "react-router-dom";
import { Fetch } from "../utils";
import { connect } from "react-redux";
import { setMoviesByGenres } from "../actions/movies";

class Genres extends React.Component {
  fetchFilmsInfoByGenres() {
    Fetch(
      `https://api.themoviedb.org/3/discover/movie?api_key=6ed6e56030be8bc7d1821d5b302e302e&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=${this.props.match.params.id}`
    ).then((moviesByGenres) => this.props.setMoviesByGenres(moviesByGenres));
  }

  componentDidMount() {
    this.fetchFilmsInfoByGenres();
  }

  componentDidUpdate(prevProps) {
    if (this.props.match.params.id !== prevProps.match.params.id) {
      this.fetchFilmsInfoByGenres(this.props.match.params.id);
    }
  }

  render() {
    if (this.props.moviesByGenresLoading)
      return (
        <div className={"Container"}>
          <div className={"KnownForItems"} style={{ flexDirection: "column" }}>
            {this.props.moviesByGenres.results.map(
              (result) => (
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
              )
            )}
          </div>
        </div>
      );
    return <Load />;
  }
}

const mapStateToProps = (state) => ({
  moviesByGenres: state.movies.moviesByGenres,
  moviesByGenresLoading: state.movies.moviesByGenresLoading
});
const mapDispatchToProps = (dispatch) => ({
  setMoviesByGenres: (moviesByGenres) =>
    dispatch(setMoviesByGenres(moviesByGenres))
});

export default connect(mapStateToProps, mapDispatchToProps)(Genres);
