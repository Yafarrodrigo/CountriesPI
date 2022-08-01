import React from 'react'
import styles from './Filters.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { changeContinentFilter, changeOrder, changeCountryName, changeActivityName } from '../../redux/actions'

export default function Filters() {

    const dispatch = useDispatch()
    const countryName = useSelector( state => state.countryName)
    const activityName = useSelector( state => state.activityName)
    const filter = useSelector(state => state.continentFilter)
    const order = useSelector( state => state.order)
  
    const handleCountryChange = (e)=>{
      dispatch(changeCountryName(e.target.value))
    }
  
    const handleActivityChange = (e)=>{
      dispatch(changeActivityName(e.target.value))
    }
  
    const handleChangeFilter = (e) => {
      dispatch(changeContinentFilter(e.target.value))
    }
  
    const handleChangeOrder = (e) => {
      dispatch(changeOrder(e.target.value))
    }

  return (
    <div className={styles.filters}>
        <select name="filter" id="filter" value={filter} onChange={handleChangeFilter}>
          <option value="all">All continents </option>
          <option value="Europe">Europe</option>
          <option value="North America">North America</option>
          <option value="South America">South America</option>
          <option value="Oceania">Oceania</option>
          <option value="Africa">Africa</option>
          <option value="Asia">Asia</option>
          <option value="Antarctica">Antarctica</option>
        </select>
        <select name="order" id="order" value={order} onChange={handleChangeOrder}>
          <option value="a-z">a-z</option>
          <option value="z-a">z-a</option>
          <option value="pop">population</option>
          <option value="pop-rev">population-reversed</option>
        </select>
      
        <input 
          autoFocus 
          className={styles.filterTextInput}  
          type="text"
          name="countryName" 
          id="countryName" 
          placeholder='country name...'
          value={countryName}
          onChange={handleCountryChange}
        />

        <input  
          className={styles.filterTextInput}
          type="text"
          name="activityName" 
          id="activityName" 
          placeholder='activity name...'
          value={activityName}
          onChange={handleActivityChange}
        />
        </div>
  )
}
