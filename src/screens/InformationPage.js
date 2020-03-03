import React from "react";
import { useState, useEffect } from "react";
import moment from "moment/moment";
import "moment-duration-format";
import Loading from "../components/Loading";
import { Link } from "react-router-dom";
import {
  addToWatchList,
  removeFromWatchList,
  isMovieInWatchListFunction
} from "../utils";

const InformationPage = (props) => {
  const [informationAboutFilm, setInformationAboutFilm] = useState([]);
  const [trailers, setTrailers] = useState([]);
  const [castAndCrew, setCastAndCrew] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [informationPageLoading, setInformationPageLoading] = useState(false);
  const [isMovieInWatchListState, setIsMovieInWatchListState] = useState(false);

  const fetchInfotmationForInformationPage = async (id) => {
    setInformationPageLoading(true);

    const res1 = await fetch(
      `https://api.themoviedb.org/3/movie/${id}?api_key=6ed6e56030be8bc7d1821d5b302e302e&language=en-US`
    );
    const informationAboutFilm = await res1.json();
    setInformationAboutFilm(informationAboutFilm);

    const res2 = await fetch(
      `https://api.themoviedb.org/3/movie/${id}}/credits?api_key=6ed6e56030be8bc7d1821d5b302e302e`
    );
    const castAndCrew = await res2.json();
    setCastAndCrew(castAndCrew);

    const res3 = await fetch(
      `https://api.themoviedb.org/3/movie/${id}/videos?api_key=6ed6e56030be8bc7d1821d5b302e302e&language=en-US`
    );
    const trailers = await res3.json();
    setTrailers(trailers.results[0]);

    const res4 = await fetch(
      `https://api.themoviedb.org/3/movie/${id}/recommendations?api_key=6ed6e56030be8bc7d1821d5b302e302e&language=en-US&page=1`
    );
    const recommendations = await res4.json();
    setRecommendations(recommendations.results);

    setIsMovieInWatchListState(
      isMovieInWatchListFunction(id)
    );

    setInformationPageLoading(false);
  };

  useEffect(() => {
    fetchInfotmationForInformationPage(props.match.params.id);
  }, [props.match.params.id]);

  const genres = informationAboutFilm.genres || [];
  const production_countries = informationAboutFilm.production_countries || [];
  const crew = castAndCrew.crew || [];
  const cast = castAndCrew.cast || [];
  const directors = crew.filter((element) => element.job === "Director") || [];
  const writers = crew.filter((element) => element.job === "Writer") || [];

  return informationPageLoading ? (
    <Loading />
  ) : (
    <div className={"Container"}>
      <div className={"TitleBlock"}>
        {isMovieInWatchListState ? (
          <button
            id={"remove"}
            onClick={() => {
              removeFromWatchList(informationAboutFilm.id);
              setIsMovieInWatchListState(false);
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
              addToWatchList(informationAboutFilm);
              setIsMovieInWatchListState(true);
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
            {informationAboutFilm.original_title + " "}
            <span>
              (
              <Link
                to={`/Year/${moment(informationAboutFilm.release_date).format(
                  "YYYY"
                )}`}
              >
                {moment(informationAboutFilm.release_date).format("YYYY")}
              </Link>
              )
            </span>
          </h1>

          <div className={"Subtext"}>
            <div>
              {moment
                .duration(informationAboutFilm.runtime, "minutes")
                .format("h:mm")
                .replace(":", "h ") + "min"}
            </div>

            <div>
              {genres.map((el, index) => {
                const name =
                  index === informationAboutFilm.genres.length - 1
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
              {moment(informationAboutFilm.release_date).format("Do/MMM/YYYY")}
            </div>

            <div>
              (
              {production_countries.map((el, index) => {
                const name =
                  index === informationAboutFilm.production_countries.length - 1
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
              <p>{informationAboutFilm.vote_average}</p>
              <p>/10</p>
            </div>
            <p>{informationAboutFilm.vote_count}</p>
          </div>
        </div>
      </div>
      <div className={"SlateWrapper"}>
        <img
          src={`https://image.tmdb.org/t/p/w200${informationAboutFilm.poster_path}`}
          alt={informationAboutFilm.original_title}
        />
        {trailers && (
          <iframe
            src={`https://www.youtube.com/embed/${trailers.key}`}
            frameBorder={"0"}
            allow={
              "accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            }
            allowFullScreen
            title={trailers.id}
          />
        )}
      </div>

      <div className={"Overview"}>
        <h1>{informationAboutFilm.overview}</h1>
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
              {castAndCrew.cast.map((el, index) => {
                const name =
                  index === castAndCrew.cast.length - 1
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

      {recommendations.length !== 0 && (
        <div className={"KnownFor"} style={{ marginLeft: "60px" }}>
          <h3>
            <b>Recommendations</b>
          </h3>
          <div className={"KnownForItems"}>
            {recommendations.slice(0, 4).map((result) => (
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
};

export default InformationPage;
