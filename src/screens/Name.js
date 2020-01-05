import React from "react";
import Load from "../components/Load";
import moment from "moment/moment";
import { Link } from "react-router-dom";

class Name extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      post: [],
      loading: true,
      movies: [],
      works: []
    };
  }

  fetchPeopleInfo() {
    fetch(
      `https://api.themoviedb.org/3/person/${this.props.match.params.id}?api_key=6ed6e56030be8bc7d1821d5b302e302e&language=en-US`
    )
      .then(information => information.json())
      .then(post => {
        this.setState({ post: post }, () => this.setState({ loading: false }));
        // console.log(this.state.post)
      });
  }

  fetchMovieInfo() {
    fetch(
      `https://api.themoviedb.org/3/person/${this.props.match.params.id}/movie_credits?api_key=6ed6e56030be8bc7d1821d5b302e302e&language=en-US`
    )
      .then(information => information.json())
      .then(post => {
        this.setState({ movies: post.cast.slice(0, 4) }, () =>
          this.setState({ loading: false })
        );
        this.setState({ works: post.crew.slice(0, 4) }, () =>
          this.setState({ loading: false })
        );

        // console.log(this.state.works)
      });
  }

  componentDidMount() {
    this.fetchPeopleInfo();
    this.fetchMovieInfo();
  }

  componentDidUpdate(prevProps) {
    if (this.props.match.params.id !== prevProps.match.params.id) {
      this.fetchPeopleInfo(this.props.match.params.id);
      this.fetchMovieInfo(this.props.match.params.id);
    }
  }

  render() {
    if (this.state.loading) {
      return <Load />;
    }

    return (
      <div className={"Container"}>
        <div className={"TitleBar"}>
          <h1>{this.state.post.name}</h1>
          <h5>{this.state.post.known_for_department}</h5>
        </div>
        {this.state.post.profile_path && (
          <img
            src={`https://image.tmdb.org/t/p/w200${this.state.post.profile_path}`}
            alt={this.state.post.name}
          />
        )}
        <div className={"Bio"}>{this.state.post.biography}</div>
        {this.state.post.birthday && (
          <div className={"Born"}>
            <b>Born: </b>
            <span>
              {moment(this.state.post.birthday).format("MMMM D, YYYY")}{" "}
            </span>
            in
            <span> {this.state.post.place_of_birth}</span>
          </div>
        )}

        {this.state.movies.length !== 0 && (
          <div className={"KnownFor"}>
            <h3>
              <b>Known For</b>
            </h3>
            <div className={"KnownForItems"}>
              {this.state.movies.map(result => (
                <div key={result.id}>
                  <Link key={result.id} to={`/InformationPage/${result.id}`}>
                    <img
                      src={`https://image.tmdb.org/t/p/w200${result.poster_path}`}
                      alt={result.id}
                    />
                    {result.title}
                  </Link>
                  <h5>{result.character}</h5>
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

export default Name;
