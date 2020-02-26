import { Fetch } from "../utils";

export const getInformationForNamePage = (personId) => {
  return (dispatch) => {
    dispatch(setNamePageLoading(true));
    Fetch(
      `https://api.themoviedb.org/3/person/${personId}?api_key=6ed6e56030be8bc7d1821d5b302e302e&language=en-US`
    ).then((personInformation) =>
      dispatch(setPersonInformation(personInformation))
    );
    Fetch(
      `https://api.themoviedb.org/3/person/${personId}/movie_credits?api_key=6ed6e56030be8bc7d1821d5b302e302e&language=en-US`
    ).then((worksOfThisPerson) =>
      dispatch(setWorksOfThisPerson(worksOfThisPerson))
    );
  };
};

export const setPersonInformation = (personInformation) => ({
  type: "SET_PERSON_INFORMATION",
  personInformation
});
export const setWorksOfThisPerson = (worksOfThisPerson) => ({
  type: "SET_WORKS_OF_THIS_PERSON",
  worksOfThisPerson
});
export const setNamePageLoading = (namePageLoading) => ({
  type: "SET_NAME_PAGE_LOADING",
  namePageLoading: namePageLoading
});
