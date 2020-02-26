const initialState = {
  personInformation: [],
  worksOfThisPerson: [],
  namePageLoading: false
};
const personInformation = (state = initialState, action) => {
  switch (action.type) {
    case "SET_PERSON_INFORMATION":
      return {
        ...state,
        personInformation: action.personInformation
      };
    case "SET_WORKS_OF_THIS_PERSON":
      return {
        ...state,
        worksOfThisPerson: action.worksOfThisPerson,
        namePageLoading: false
      };
    case "SET_NAME_PAGE_LOADING":
      return {
        ...state,
        namePageLoading: action.namePageLoading
      };
    default:
      return state;
  }
};
export default personInformation;
