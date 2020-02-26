import React from "react";
import Loading from "../components/Loading";
import moment from "moment/moment";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getInformationForNamePage } from "../actions/personInformation";

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

  componentDidMount() {
    this.props.getInformationForNamePage(this.props.match.params.id);
  }

  componentDidUpdate(prevProps) {
    if (this.props.match.params.id !== prevProps.match.params.id) {
      this.fetchPeopleInfo(this.props.match.params.id);
    }
  }

  render() {
    const cast = this.props.worksOfThisPerson.cast || [];
    const crew = this.props.worksOfThisPerson.crew || [];

    if (this.props.namePageLoading) {
      return <Loading />;
    }
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

        {cast.length !== 0 && (
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

        {crew.length !== 0 && (
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
  }
}

const mapStateToProps = (state) => ({
  personInformation: state.personInformation.personInformation,
  worksOfThisPerson: state.personInformation.worksOfThisPerson,
  namePageLoading: state.personInformation.namePageLoading
});

const mapDispatchToProps = (dispatch) => ({
  getInformationForNamePage: (personId) =>
    dispatch(getInformationForNamePage(personId))
});

export default connect(mapStateToProps, mapDispatchToProps)(Name);
