import React from "react";
import Load from "../components/Load";
import { Link } from "react-router-dom";
import { Fetch } from "../utils";
import { connect } from "react-redux";
import { setMoviesAboutYear } from "../actions/moviesAboutYear"

class Year extends React.Component {
  
  fetchFilmsInfoAboutYear() {
    Fetch(
      `https://api.themoviedb.org/3/discover/movie?api_key=6ed6e56030be8bc7d1821d5b302e302e&language=en-US&sort_by=popularity.desc&certification_country=RU&include_adult=false&include_video=false&page=1&year=${this.props.match.params.id}`
    )
    .then( moviesAboutYear => this.props.setMoviesAboutYear(moviesAboutYear))
  }

  componentDidMount() {
    this.fetchFilmsInfoAboutYear();
  }

  componentDidUpdate(prevProps) {
    if (this.props.match.params.id !== prevProps.match.params.id) {
      this.fetchFilmsInfoAboutYear(this.props.match.params.id);
    }
  }

  render() {
console.log(this.props)
    if (this.props.moviesAboutYear.loading)
    return (
      <div className={"Container"}>
        <h1>Films of {this.props.match.params.id}</h1>
        <div className={"KnownForItems"} style={{ flexDirection: "column" }}>
          {this.props.moviesAboutYear.moviesAboutYear.results.map(result => (
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

const mapStateToProps = state =>({
  moviesAboutYear: state.moviesAboutYear})

const mapDispatchToProps = dispatch => ({
  setMoviesAboutYear: moviesAboutYear => dispatch(setMoviesAboutYear(moviesAboutYear))
})

export default connect(mapStateToProps, mapDispatchToProps)(Year);
