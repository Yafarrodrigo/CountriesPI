const initialState = {
  countries: [],
  tenCountries :[],
  page: 1,
  maxPage: 1
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_ALL_COUNTRIES": 
      return {
        ...state,
        countries: action.payload.list,
        maxPage: action.payload.maxPage,
        tenCountries: action.payload.list.slice((state.page-1)*10 ,((state.page-1)*10+10))
      }

    case "GET_TEN_COUNTRIES": 
      return {
        ...state,
        tenCountries: state.countries.slice((state.page-1)*10 ,((state.page-1)*10+10))
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

      default: return state
    }
}
export default reducer;
