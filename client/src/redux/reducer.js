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

const reducer = (state = initialState, action) => {
  switch (action.type) {

    case "GET_COUNTRIES": 

      if(state.continentFilter !== "all"){
        const filteredList = action.payload.list
          .filter( el => el.continent === state.continentFilter)
          .sort(checkOrder(state))
        const newMaxPage = filteredList.length / 10 >= 1 ? Math.floor(filteredList.length / 10) : 1
        return {
          ...state,
          countries: action.payload.list,
          filteredCountries: filteredList,
          maxPage: newMaxPage,
          tenCountries: filteredList.slice((state.page-1)*10 ,((state.page-1)*10+10))
        }
      }else{
        const orderedList = action.payload.list.sort((checkOrder(state)))
        return {
          ...state,
          countries: action.payload.list,
          filteredCountries: orderedList,
          maxPage: action.payload.maxPage,
          tenCountries: orderedList.slice((state.page-1)*10 ,((state.page-1)*10+10))
        }
      }

    case "GET_FILTERED_COUNTRIES":
      if(state.continentFilter !== "all"){
        const appliedFilterList = state.countries
          .filter( el => el.continent === state.continentFilter)
          .sort(checkOrder(state))
          let nameFilterApplied = appliedFilterList
        if(state.countryName.length) nameFilterApplied = appliedFilterList.filter( el => el.name.toLowerCase().includes(state.countryName.toLowerCase()))
        return{
          ...state,
          filteredCountries: nameFilterApplied,
          tenCountries: nameFilterApplied.slice((state.page-1)*10 ,((state.page-1)*10+10)),
          maxPage: nameFilterApplied.length / 10 >= 1 ? Math.floor(nameFilterApplied.length / 10) : 1
        }
      }else{
        const orderedList = state.countries.sort(checkOrder(state))
        let nameFilterApplied = orderedList
        if(state.countryName.length) nameFilterApplied = orderedList.filter( el => el.name.toLowerCase().includes(state.countryName.toLowerCase()))
        return{
          ...state,
          filteredCountries: nameFilterApplied,
          tenCountries: nameFilterApplied.slice((state.page-1)*10 ,((state.page-1)*10+10)),
          maxPage: state.countries.length / 10 >= 1 ? Math.floor(state.countries.length / 10) : 1
        }
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
      selectedCountry: action.payload
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
