import React from "react";
import Load from "../components/Load";
import { Link } from "react-router-dom";
import { Fetch } from "../utils";
import { connect } from "react-redux";
import {setMoviesAboutGenres} from "../actions/moviesAboutGenres"

class Genres extends React.Component {
  
  fetchFilmsInfoAboutGenres() {
    Fetch(
      `https://api.themoviedb.org/3/discover/movie?api_key=6ed6e56030be8bc7d1821d5b302e302e&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=${this.props.match.params.id}`
    )
    .then( moviesAboutGenres => this.props.setMoviesAboutGenres(moviesAboutGenres));
  }

  componentDidMount() {
    this.fetchFilmsInfoAboutGenres();
  }

  componentDidUpdate(prevProps) {
    if (this.props.match.params.id !== prevProps.match.params.id) {
      this.fetchFilmsInfoAboutGenres(this.props.match.params.id);
    }
  }

  render() {
    console.log(this.props)
    if (this.props.moviesAboutGenres.loading)
    return (
      <div className={"Container"}>
        <div className={"KnownForItems"} style={{ flexDirection: "column" }}>
          {this.props.moviesAboutGenres.moviesAboutGenres.results.map(result => (
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

const mapStateToProps = state => ({
  moviesAboutGenres: state.moviesAboutGenres
})
const mapDispatchToProps =dispatch=> ({
  setMoviesAboutGenres: moviesAboutGenres=> dispatch(setMoviesAboutGenres(moviesAboutGenres))
})

export default connect(mapStateToProps, mapDispatchToProps)(Genres);
