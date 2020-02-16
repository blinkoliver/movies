import React from "react";
import Load from "../components/Load";
import moment from "moment/moment";
import { Link } from "react-router-dom";
import { Fetch } from "../utils";
import { connect } from "react-redux";
import {
  setPersonInformation,
  setWorksOfThisPerson
} from "../actions/personInformation";

class Name extends React.Component {
  // fetchPeopleInfo() {
  //   Fetch(
  //     `https://api.themoviedb.org/3/person/${this.props.match.params.id}?api_key=6ed6e56030be8bc7d1821d5b302e302e&language=en-US`
  //   ).then((personInformation) => {
  //     this.setState({ personInformation: personInformation }, () =>
  //       Fetch(
  //         `https://api.themoviedb.org/3/person/${this.props.match.params.id}/movie_credits?api_key=6ed6e56030be8bc7d1821d5b302e302e&language=en-US`
  //       ).then((worksOfThisPerson) => {
  //         this.setState({ worksOfThisPerson: worksOfThisPerson }, () =>
  //           this.setState({ personInformationLoading: true })
  //         );
  //       })
  //     );
  //   });
  // }

  fetchPeopleInfo() {
    Fetch(
      `https://api.themoviedb.org/3/person/${this.props.match.params.id}?api_key=6ed6e56030be8bc7d1821d5b302e302e&language=en-US`
    ).then((personInformation) =>
      this.props.setPersonInformation(personInformation)
    );
    Fetch(
      `https://api.themoviedb.org/3/person/${this.props.match.params.id}/movie_credits?api_key=6ed6e56030be8bc7d1821d5b302e302e&language=en-US`
    ).then((worksOfThisPerson) =>
      this.props.setWorksOfThisPerson(worksOfThisPerson)
    );
  }

  componentDidMount() {
    this.fetchPeopleInfo();
  }

  componentDidUpdate(prevProps) {
    if (this.props.match.params.id !== prevProps.match.params.id) {
      this.fetchPeopleInfo(this.props.match.params.id);
    }
  }

  render() {
    console.log(this.props);
    if (this.props.personInformationLoading)
      return (
        <div className={"Container"}>
          <div className={"TitleBar"}>
            <h1>{this.props.personInformation.name}</h1>
            <h5>{this.props.personInformation.known_for_department}</h5>
          </div>
          {this.props.personInformation.profile_path && (
            <img
              src={`https://image.tmdb.org/t/p/w200${this.props.personInformation.profile_path}`}
              alt={this.props.personInformation.name}
            />
          )}
          <div className={"Bio"}>{this.props.personInformation.biography}</div>
          {this.props.personInformation.birthday && (
            <div className={"Born"}>
              <b>Born: </b>
              <span>
                {moment(this.props.personInformation.birthday).format(
                  "MMMM D, YYYY"
                )}{" "}
              </span>
              in
              <span> {this.props.personInformation.place_of_birth}</span>
            </div>
          )}

          {this.props.worksOfThisPerson.cast.length !== 0 && (
            <div className={"KnownFor"}>
              <h3>
                <b>Known For</b>
              </h3>
              <div className={"KnownForItems"}>
                {this.props.worksOfThisPerson.cast.slice(0, 5).map((result) => (
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

          {this.props.worksOfThisPerson.crew.length !== 0 && (
            <div className={"KnownFor"}>
              <div className={"KnownForItems"}>
                {this.props.worksOfThisPerson.crew.slice(0, 5).map((result) => (
                  <div key={result.id}>
                    <Link key={result.id} to={`/InformationPage/${result.id}`}>
                      <img
                        src={`https://image.tmdb.org/t/p/w200${result.poster_path}`}
                        alt={result.id}
                      />
                      {result.title}
                    </Link>
                    <h5>{result.job}</h5>
                    <h5>({moment(result.release_date).format("YYYY")})</h5>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      );
    return <Load />;
  }
}

const mapStateToProps = (props) => ({
  personInformation: props.personInformation.personInformation,
  worksOfThisPerson: props.personInformation.worksOfThisPerson,
  personInformationLoading: props.personInformation.personInformationLoading
});

const mapDispatchToProps = (dispatch) => ({
  setPersonInformation: (personInformation) =>
    dispatch(setPersonInformation(personInformation)),
  setWorksOfThisPerson: (worksOfThisPerson) =>
    dispatch(setWorksOfThisPerson(worksOfThisPerson))
});

export default connect(mapStateToProps, mapDispatchToProps)(Name);
