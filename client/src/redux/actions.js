const GET_ALL_COUNTRIES = "GET_ALL_COUNTRIES"
const GET_TEN_COUNTRIES = "GET_TEN_COUNTRIES"
const INCREASE_PAGE = "INCREASE_PAGE"
const DECREASE_PAGE = "DECREASE_PAGE"

export const getAllCoutries = () => {
  return async function (dispatch) {
    return fetch("http://localhost:3001/countries")
    .then(response => response.json())
    .then(json => {dispatch(
        {
          type: GET_ALL_COUNTRIES,
          payload: {
            list: json,
            maxPage: Math.floor(json.length / 10)
          }
        }
      )})
    };
};

export const getTenCoutries = () => { 
  return {type: GET_TEN_COUNTRIES}
};

export const increasePage = () => {
  return {type: INCREASE_PAGE}
};

export const decreasePage = () => {
  return {type: DECREASE_PAGE}
};