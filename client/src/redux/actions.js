const GET_COUNTRIES = "GET_COUNTRIES"
const GET_FILTERED_COUNTRIES = "GET_FILTERED_COUNTRIES"
const INCREASE_PAGE = "INCREASE_PAGE"
const DECREASE_PAGE = "DECREASE_PAGE"
const SELECT_COUNTRY = "SELECT_COUNTRY"
const CHANGE_CONTINENT_FILTER = "CHANGE_CONTINENT_FILTER"
const CHANGE_ORDER = "CHANGE_ORDER"
const GET_COUNTRIES_BY_NAME = "GET_COUNTRIES_BY_NAME"
const CHANGE_COUNTRY_NAME = "CHANGE_COUNTRY_NAME"
const CHANGE_ACTIVITY_NAME = "CHANGE_ACTIVITY_NAME"
const RESET_FILTERS = "RESET_FILTERS"

export const getAllCoutries = () => {
  return async function (dispatch) {
    return fetch("http://localhost:3001/countries")
    .then(response => response.json())
    .then(json => {dispatch(
        {
          type: GET_COUNTRIES,
          payload: {
            list: json,
            maxPage: json.length / 10 > 1 ? Math.floor(json.length / 10) : 1
          }
        }
      )
    })
    };
};

export const changeCountryName = (countryName) => {
  return {type: CHANGE_COUNTRY_NAME, payload: countryName}
}

export const changeActivityName = (activityName) => {
  return {type: CHANGE_ACTIVITY_NAME, payload: activityName}
}

export const getFilteredCountries = () => {
  return {type: GET_FILTERED_COUNTRIES}
}

export const getCountriesByName = (countryName) => {
  return {type: GET_COUNTRIES_BY_NAME, payload: countryName} 
}
 
export const selectCountry = (countryId) =>
  async function (dispatch) {
  await fetch(`http://localhost:3001/countries/${countryId}`)
      .then(response => response.json())
      .then(json => dispatch(
        {
          type: SELECT_COUNTRY,
          payload: json[0]
        }
      ))
};

export const changeContinentFilter = (filter) => {
  return {type: CHANGE_CONTINENT_FILTER, payload: filter}
}

export const changeOrder = (order) => {
  return { type : CHANGE_ORDER, payload: order}
}

export const resetFilters = () => {
  return {type: RESET_FILTERS}
}

export const increasePage = () => {
  return {type: INCREASE_PAGE}
};

export const decreasePage = () => {
  return {type: DECREASE_PAGE}
};