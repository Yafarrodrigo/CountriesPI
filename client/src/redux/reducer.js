const initialState = {
  countries: [],
  filteredCountries : [],
  tenCountries :[],
  selectedCountry: {},
  countryName: "",
  activityName: "",
  continentFilter: "all",
  activityFilter: "none",
  order: "a-z",
  page: 1,
  maxPage: 1
};

const checkOrder = (state) => {
  if      (state.order === "a-z") return (a,b) => a.name.localeCompare(b.name)
  else if (state.order === "z-a") return (a,b) => b.name.localeCompare(a.name)
  else if (state.order === "pop") return (a,b) => b.population - a.population
  else if (state.order === "pop-rev") return (a,b) => a.population - b.population
  else                    return (a,b) => a.name.localeCompare(b.name)
}

const fitlerByActivities = (state, arr) => {
  let resultArr = []
  let addedCountries = {}
  if(state.activityName.length){
    arr.forEach( country => {
      country.activities.forEach( act => {
        if(act.name.toLowerCase().includes(state.activityName.toLowerCase())){
          if(!addedCountries[country.id]){
            resultArr.push(country)
            addedCountries[country.id] = true
          }
        }
      })
    })
    return resultArr
  } 
  else return arr
}

const applyFiltersAndSort = (state, arr) => {
  let filteredArray = arr

  // continents
  if(state.continentFilter !== "all"){
    filteredArray = arr.filter( el => el.continent === state.continentFilter)
  }

  // sort
  filteredArray.sort(checkOrder(state))

  // fitler by name
  if(state.countryName.length){
    filteredArray = filteredArray.filter( el => el.name.toLowerCase().includes(state.countryName.toLowerCase()))
  }

  // filter activities
  if(state.activityName.length){
    filteredArray = fitlerByActivities(state,filteredArray)
  }

  return filteredArray
}


const reducer = (state = initialState, action) => {
  switch (action.type) {

    case "GET_COUNTRIES": 
        const finalList = action.payload.list.sort(checkOrder(state))
        const newMaxPage = finalList.length / 10 >= 1 ? Math.floor(finalList.length / 10) : 1
        return {
          ...state,
          countries: finalList,
          filteredCountries: finalList,
          maxPage: newMaxPage,
          tenCountries: finalList.slice((state.page-1)*10 ,((state.page-1)*10+10))
        }

    case "GET_FILTERED_COUNTRIES":
        const lastResult = applyFiltersAndSort(state, state.countries)
        return{
          ...state,
          filteredCountries: lastResult,
          tenCountries: lastResult.slice((state.page-1)*10 ,((state.page-1)*10+10)),
          maxPage: lastResult.length / 10 >= 1 ? Math.floor(lastResult.length / 10) : 1
        }

    case "RESET_FILTERS":
      return{
        ...state,
        order: "a-z",
        continent: "all",
        countryName: "",
        activityName: "",
        page: 1
      }

    case "CHANGE_COUNTRY_NAME":
      return{
        ...state,
        countryName: action.payload
      }
    
    case "CHANGE_ACTIVITY_NAME":
    return{
      ...state,
      activityName: action.payload
    }

    case "SELECT_COUNTRY":
    return {
      ...state,
      selectedCountry: action.payload ? action.payload : {id: "error"}
    }

    case "INCREASE_PAGE":
      if(state.page === state.maxPage){
        return {
          ...state,
          page: 1
        }
      }else{
        return {
          ...state,
          page: state.page += 1
        }
      }

    case "DECREASE_PAGE": 
      if(state.page === 1){
        return {
          ...state,
          page: state.maxPage
        }
      }else{
        return {
          ...state,
          page: state.page -= 1
        }
      }

    case "CHANGE_CONTINENT_FILTER":
      return{
        ...state,
        page: 1,
        continentFilter: action.payload
      }

    case "CHANGE_ORDER":
      return {
        ...state,
        page: 1,
        order: action.payload
      }

      default: return state
    }
}
export default reducer;
