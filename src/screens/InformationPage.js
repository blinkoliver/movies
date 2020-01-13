import React from "react";
import moment from "moment/moment";
import "moment-duration-format";
import Load from "../components/Load";
import { Link } from "react-router-dom";
import { Fetch } from "../utils";
import { addToWatchList } from "../utils";

class InformationPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      post: {},
      loading: true,
      trailers: {},
      cast: [],
      directors: [],
      writers: [],
      recommendations: []
    };
  }

  fetchMovieInfo() {
    Fetch(
      `https://api.themoviedb.org/3/movie/${this.props.match.params.id}?api_key=6ed6e56030be8bc7d1821d5b302e302e&language=en-US`
    ).then(post => {
      this.setState({ post: post }, () => this.setState({ loading: false }));
      // console.log(this.state.post)
    });
  }

  fetchTrailerInfo() {
    Fetch(
      `https://api.themoviedb.org/3/movie/${this.props.match.params.id}/videos?api_key=6ed6e56030be8bc7d1821d5b302e302e&language=en-US`
    ).then(post => {
      let results = post.results;
      this.setState({ trailers: results[0] }, () =>
        this.setState({ loading: false })
      );
      // console.log(this.state.trailers)
    });
  }

  fetchCastCrew() {
    Fetch(
      `https://api.themoviedb.org/3/movie/${this.props.match.params.id}/credits?api_key=6ed6e56030be8bc7d1821d5b302e302e`
    ).then(post => {
      this.setState({
        directors: post.crew.filter(el => el.job === "Director")
      });
      this.setState({
        writers: post.crew.filter(el => el.department === "Writing").slice(0, 4)
      });
      this.setState({ cast: post.cast });
      // console.log(this.state.writers)
    });
  }
  fetchRecommendation() {
    Fetch(
      `https://api.themoviedb.org/3/movie/${this.props.match.params.id}/recommendations?api_key=6ed6e56030be8bc7d1821d5b302e302e&language=en-US&page=1`
    ).then(post => {
      let results = post.results;
      this.setState({ recommendations: results.slice(0, 4) }, () =>
        this.setState({ loading: false })
      );
      // console.log(this.state.recommendations)
    });
  }

  componentDidMount() {
    this.fetchMovieInfo();
    this.fetchTrailerInfo();
    this.fetchCastCrew();
    this.fetchRecommendation();
  }

  componentDidUpdate(prevProps) {
    if (this.props.match.params.id !== prevProps.match.params.id) {
      this.fetchMovieInfo(this.props.match.params.id);
      this.fetchTrailerInfo(this.props.match.params.id);
      this.fetchCastCrew(this.props.match.params.id);
      this.fetchRecommendation(this.props.match.params.id);
    }
  }

  render() {
    const genres = this.state.post.genres || [];
    const production_countries = this.state.post.production_countries || [];

    if (this.state.loading) {
      return <Load />;
    }
    return (
      <div className={"Container"}>
        <div className={"TitleBlock"}>
          <svg
            height="50px"
            viewBox="-64 0 512 512"
            width="50px"
            xmlns="http://www.w3.org/2000/svg"
            stroke="gold"
            fill="gold"
            onClick={() => addToWatchList(this.state.post)}
          >
            <path d="m324.070312 0h-264.058593c-33.089844 0-60.011719 26.882812-60.011719 59.929688v452.070312l192.066406-125.066406 192.015625 124.4375v-451.441406c0-33.046876-26.921875-59.929688-60.011719-59.929688zm20.003907 437.765625-152.058594-98.542969-152.007813 98.980469v-378.273437c0-10.984376 8.972657-19.921876 20.003907-19.921876h264.058593c11.027344 0 20.003907 8.9375 20.003907 19.921876zm-132.027344-267.730469h70.015625v40.011719h-70.015625v70.011719h-40.011719v-70.011719h-70.011718v-40.011719h70.011718v-70.011718h40.011719zm0 0" />
            <title>Click to add to watchlist</title>
          </svg>
          <div className={"TitleBar"}>
            <h1>
              {this.state.post.original_title + " "}
              <span>
                (
                <Link
                  to={`/Year/${moment(this.state.post.release_date).format(
                    "YYYY"
                  )}`}
                >
                  {moment(this.state.post.release_date).format("YYYY")}
                </Link>
                )
              </span>
            </h1>

            <div className={"Subtext"}>
              <div>
                {moment
                  .duration(this.state.post.runtime, "minutes")
                  .format("h:mm")
                  .replace(":", "h ") + "min"}
              </div>

              <div>
                {genres.map((el, index) => {
                  const name =
                    index === this.state.post.genres.length - 1
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
                {moment(this.state.post.release_date).format("Do/MMM/YYYY")}
              </div>

              <div>
                (
                {production_countries.map((el, index) => {
                  const name =
                    index === this.state.post.production_countries.length - 1
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
                <p>{this.state.post.vote_average}</p>
                <p>/10</p>
              </div>
              <p>{this.state.post.vote_count}</p>
            </div>
          </div>
        </div>
        <div className={"SlateWrapper"}>
          <img
            src={`https://image.tmdb.org/t/p/w200${this.state.post.poster_path}`}
            alt={this.state.post.original_title}
          />
          {this.state.trailers && (
            <iframe
              src={`https://www.youtube.com/embed/${this.state.trailers.key}`}
              frameBorder={"0"}
              allow={
                "accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
              }
              allowFullScreen
              title={this.state.trailers.id}
            />
          )}
        </div>
        <div className={"Overview"}>
          <h1>{this.state.post.overview}</h1>
          <div className={"CastCrew"}>
            {this.state.directors.length !== 0 && (
              <div>
                <b>Director: </b>
                {this.state.directors.map((el, index) => {
                  const name =
                    index === this.state.directors.length - 1
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

            {this.state.writers.length !== 0 && (
              <div>
                <b>Writers: </b>
                {this.state.writers.map((el, index) => {
                  const name =
                    index === this.state.writers.length - 1
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

            {this.state.cast.length !== 0 && (
              <div>
                <b>Stars: </b>
                {this.state.cast.map((el, index) => {
                  const name =
                    index === this.state.cast.length - 1
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

        {this.state.recommendations.length !== 0 && (
          <div className={"KnownFor"} style={{ marginLeft: "60px" }}>
            <h3>
              <b>Recommendations</b>
            </h3>
            <div className={"KnownForItems"}>
              {this.state.recommendations.map(result => (
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

export default InformationPage;
