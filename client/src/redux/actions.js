const GET_COUNTRIES = "GET_ALL_COUNTRIES"
const GET_TEN_COUNTRIES = "GET_TEN_COUNTRIES"
const INCREASE_PAGE = "INCREASE_PAGE"
const DECREASE_PAGE = "DECREASE_PAGE"
const SELECT_COUNTRY = "SELECT_COUNTRY"

export const getAllCoutries = () => {
  return async function (dispatch) {
    return fetch("http://localhost:3001/countries")
    .then(response => response.json())
    .then(json => {dispatch(
        {
          type: GET_COUNTRIES,
          payload: {
            list: json,
            maxPage: json.length / 10 >= 1 ? Math.floor(json.length / 10) : 1
          }
        }
      )
    })
    };
};

export const getCountriesByName = (countryName) => {
  return async function (dispatch) {
    return fetch(`http://localhost:3001/countries?name=${countryName}`)
    .then(response => response.json())
    .then(json => {dispatch(
        {
          type: GET_COUNTRIES,
          payload: {
            list: json,
            maxPage: json.length / 10 >= 1 ? Math.floor(json.length / 10) : 1
          }
        }
      )})
    };
};

export const selectCountry = (countryId) =>
  async function (dispatch) {
  await fetch(`http://localhost:3001/countries/${countryId}`)
      .then(response => response.json())
      .then(json => dispatch(
        {
        type: SELECT_COUNTRY, payload: json
        }
      ))
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