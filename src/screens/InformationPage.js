import React from "react";
import moment from "moment/moment";
import "moment-duration-format";
import Loading from "../components/Loading";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import {
  addToWatchList,
  removeFromWatchList,
  isMovieInWatchList
} from "../utils";
import { getInformationForInformationPage } from "../actions/informationAboutFilm";

class InformationPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isMovieInWatchList: isMovieInWatchList(this.props.match.params.id)
    };
  }

  // fetchMovieInfo() {
  //   Fetch(
  //     `https://api.themoviedb.org/3/movie/${this.props.match.params.id}?api_key=6ed6e56030be8bc7d1821d5b302e302e&language=en-US`
  //   ).then((informationAboutFilm) =>
  //     this.props.setInformationAboutFilm(informationAboutFilm)
  //   );
  //   Fetch(
  //     `https://api.themoviedb.org/3/movie/${this.props.match.params.id}/videos?api_key=6ed6e56030be8bc7d1821d5b302e302e&language=en-US`
  //   ).then((trailers) => this.props.setTrailers(trailers));
  //   Fetch(
  //     `https://api.themoviedb.org/3/movie/${this.props.match.params.id}/credits?api_key=6ed6e56030be8bc7d1821d5b302e302e`
  //   ).then((castAndCrew) => this.props.setCastAndCrew(castAndCrew));
  // }
  // fetchRecommendation() {
  //   Fetch(
  //     `https://api.themoviedb.org/3/movie/${this.props.match.params.id}/recommendations?api_key=6ed6e56030be8bc7d1821d5b302e302e&language=en-US&page=1`
  //   ).then((recommendations) => this.props.setRecommendations(recommendations));
  // }

  componentDidMount() {
    this.props.getInformationForInformationPage(this.props.match.params.id);
  }

  componentDidUpdate(prevProps) {
    if (this.props.match.params.id !== prevProps.match.params.id) {
      this.setState({
        isMovieInWatchList: isMovieInWatchList(this.props.match.params.id)
      });
      this.componentDidMount(this.props.match.params.id);
    }
  }

  render() {
    const genres = this.props.informationAboutFilm.genres || [];
    const production_countries =
      this.props.informationAboutFilm.production_countries || [];
    const crew = this.props.castAndCrew.crew || [];
    const cast = this.props.castAndCrew.cast || [];
    const directors =
      crew.filter((element) => element.job === "Director") || [];
    const writers = crew.filter((element) => element.job === "Writer") || [];

    if (this.props.informationPageLoading) {
      return <Loading />;
    }
    return (
      <div className={"Container"}>
        <div className={"TitleBlock"}>
          {this.state.isMovieInWatchList ? (
            <button
              id={"remove"}
              onClick={() => {
                removeFromWatchList(this.props.match.informationAboutFilm.id);
                this.setState({ isMovieInWatchList: false });
              }}
            >
              <p>
                remove from
                <br />
                WatchList
              </p>
            </button>
          ) : (
            <button
              id={"add"}
              onClick={() => {
                addToWatchList(this.props.informationAboutFilm);
                this.setState({ isMovieInWatchList: true });
              }}
            >
              <p>
                add to
                <br />
                WatchList
              </p>
            </button>
          )}
          <div className={"TitleBar"}>
            <h1>
              {this.props.informationAboutFilm.original_title + " "}
              <span>
                (
                <Link
                  to={`/Year/${moment(
                    this.props.informationAboutFilm.release_date
                  ).format("YYYY")}`}
                >
                  {moment(this.props.informationAboutFilm.release_date).format(
                    "YYYY"
                  )}
                </Link>
                )
              </span>
            </h1>

            <div className={"Subtext"}>
              <div>
                {moment
                  .duration(this.props.informationAboutFilm.runtime, "minutes")
                  .format("h:mm")
                  .replace(":", "h ") + "min"}
              </div>

              <div>
                {genres.map((el, index) => {
                  const name =
                    index === this.props.informationAboutFilm.genres.length - 1
                      ? el.name
                      : `${el.name}, `;
                  return (
                    <Link to={`/Genres/${el.id}`} key={el.id}>
                      {name}
                    </Link>
                  );
                })}
              </div>
              <div>
                {moment(this.props.informationAboutFilm.release_date).format(
                  "Do/MMM/YYYY"
                )}
              </div>

              <div>
                (
                {production_countries.map((el, index) => {
                  const name =
                    index ===
                    this.props.informationAboutFilm.production_countries
                      .length -
                      1
                      ? el.name
                      : `${el.name}, `;
                  return <span key={el.iso_3166_1}>{name}</span>;
                })}
                )
              </div>
            </div>
          </div>
          <div className={"RatingsWrapper"}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="50"
              height="50"
              stroke="gold"
              fill="gold"
              viewBox="0 0 35 35"
            >
              <path d="M12 6.76l1.379 4.246h4.465l-3.612 2.625 1.379 4.246-3.611-2.625-3.612 2.625 1.379-4.246-3.612-2.625h4.465l1.38-4.246zm0-6.472l-2.833 8.718h-9.167l7.416 5.389-2.833 8.718 7.417-5.388 7.416 5.388-2.833-8.718 7.417-5.389h-9.167l-2.833-8.718z" />
            </svg>
            <div>
              <div>
                <p>{this.props.informationAboutFilm.vote_average}</p>
                <p>/10</p>
              </div>
              <p>{this.props.informationAboutFilm.vote_count}</p>
            </div>
          </div>
        </div>
        <div className={"SlateWrapper"}>
          <img
            src={`https://image.tmdb.org/t/p/w200${this.props.informationAboutFilm.poster_path}`}
            alt={this.props.informationAboutFilm.original_title}
          />
          {this.props.trailers && (
            <iframe
              src={`https://www.youtube.com/embed/${this.props.trailers.key}`}
              frameBorder={"0"}
              allow={
                "accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
              }
              allowFullScreen
              title={this.props.trailers.id}
            />
          )}
        </div>

        <div className={"Overview"}>
          <h1>{this.props.informationAboutFilm.overview}</h1>
          <div className={"CastCrew"}>
            {directors.length !== 0 && (
              <div>
                <b>Director: </b>
                {directors.map((el, index) => {
                  const name =
                    index === directors.length - 1 ? el.name : `${el.name}, `;
                  return (
                    <Link key={el.id} to={`/Name/${el.id}`}>
                      {name}
                    </Link>
                  );
                })}
              </div>
            )}

            {writers.length !== 0 && (
              <div>
                <b>Writers: </b>
                {writers.map((el, index) => {
                  const name =
                    index === writers.length - 1 ? el.name : `${el.name}, `;
                  return (
                    <Link key={el.id} to={`/Name/${el.id}`}>
                      {name}
                    </Link>
                  );
                })}
              </div>
            )}

            {cast.length !== 0 && (
              <div>
                <b>Stars: </b>
                {this.props.castAndCrew.cast.map((el, index) => {
                  const name =
                    index === this.props.castAndCrew.cast.length - 1
                      ? el.name
                      : `${el.name}, `;
                  return (
                    <Link key={el.id} to={`/Name/${el.id}`}>
                      {name}
                    </Link>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {this.props.recommendations.length !== 0 && (
          <div className={"KnownFor"} style={{ marginLeft: "60px" }}>
            <h3>
              <b>Recommendations</b>
            </h3>
            <div className={"KnownForItems"}>
              {this.props.recommendations.slice(0, 4).map((result) => (
                <div key={result.id}>
                  <Link key={result.id} to={`/InformationPage/${result.id}`}>
                    <img
                      src={`https://image.tmdb.org/t/p/w200${result.poster_path}`}
                      alt={result.id}
                    />
                    {result.title}
                  </Link>
                  <h5>({moment(result.release_date).format("YYYY")})</h5>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  informationAboutFilm: state.informationAboutFilm.informationAboutFilm,
  trailers: state.informationAboutFilm.trailers,
  castAndCrew: state.informationAboutFilm.castAndCrew,
  recommendations: state.informationAboutFilm.recommendations,
  informationPageLoading: state.informationAboutFilm.informationPageLoading
});

const mapDispatchToProps = (dispatch) => {
  return {
    getInformationForInformationPage: (movieId) =>
      dispatch(getInformationForInformationPage(movieId))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(InformationPage);
