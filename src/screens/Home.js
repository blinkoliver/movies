import React from "react";
import Loading from "../components/Loading";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Home = (props) => {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [trendingMoviesLoading, setTrendingMoviesLoading] = useState(false);

  const fetchTrendingMovies = async () => {
    setTrendingMoviesLoading(true);
    const res = await fetch(
      `https://api.themoviedb.org/3/trending/movie/week?api_key=6ed6e56030be8bc7d1821d5b302e302e`
    );
    const trendingMovies = await res.json();
    setTrendingMovies(trendingMovies.results);
    setTrendingMoviesLoading(false);
  };

  useEffect(() => {
    fetchTrendingMovies();
  }, []);

  console.log(props, trendingMovies, trendingMoviesLoading);

  return trendingMoviesLoading ? (
    <Loading />
  ) : (
    <div className={"Container"}>
      <div>
        <h1 style={{ color: "darkslategray" }}>Trending movies this week</h1>
      </div>
      <div className={"KnownForItems"} style={{ flexDirection: "column" }}>
        {trendingMovies.slice(0, 6).map((result) => (
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
};
export default Home;
