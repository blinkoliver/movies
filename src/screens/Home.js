import React from "react";
import Load from "../components/Load";
import { Link } from "react-router-dom";
import { Fetch } from "../utils";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      post: [],
      loading: true
    };
  }

  fetchTrendingFilm() {
    Fetch(
      `https://api.themoviedb.org/3/trending/movie/week?api_key=6ed6e56030be8bc7d1821d5b302e302e`
    ).then(post => {
      this.setState({ post: post.results.slice(0, 4) }, () =>
        this.setState({ loading: false })
      );
      // console.log(this.state.post)
    });
  }

  componentDidMount() {
    this.fetchTrendingFilm();
  }

  render() {
    if (this.state.loading) {
      return <Load />;
    }

    return (
      <div className={"Container"}>
        <div>
          <h1 style={{ color: "darkslategray" }}>Trending movies this week</h1>
        </div>
        <div className={"KnownForItems"} style={{ flexDirection: "column" }}>
          {this.state.post.map(result => (
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

export default Home;
