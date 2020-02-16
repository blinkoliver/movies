const initialState = {
  personInformation: [],
  worksOfThisPerson: [],
  personInformationLoading: false
};
const personInformation = (state = initialState, action) => {
  switch (action.type) {
    case "SET_PERSON_INFORMATION":
      return {
        ...state,
        personInformation: action.personInformation,
      };
    case "SET_WORKS_OF_THIS_PERSON":
      return {
        ...state,
        worksOfThisPerson: action.worksOfThisPerson,
        personInformationLoading: true
      };
    default:
      return state;
  }
};
export default personInformation;
