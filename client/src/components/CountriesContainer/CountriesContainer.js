import React from 'react'
import styles from './CountriesContainer.module.css'
import Country from '../Country/Country'
import Pagination from '../Pagination/Pagination'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import {increasePage, decreasePage,getFilteredCountries, resetFilters, getAllCoutries} from '../../redux/actions'


export default function CountriesContainer() {
  const dispatch = useDispatch()

  const pageNumber = useSelector( state => state.page)
  const allCountries = useSelector( state => state.countries)
  const listOfCountries = useSelector(state => state.tenCountries)
  const filter = useSelector( state => state.continentFilter)
  const order = useSelector( state => state.order)
  const countryName = useSelector( state => state.countryName)
  const activityName = useSelector( state => state.activityName)
  

  useEffect(()=>{
    dispatch(resetFilters())
    dispatch(getAllCoutries())
  },[dispatch])

  useEffect(()=>{
    dispatch(getFilteredCountries())
   
  },[dispatch, pageNumber, filter, order, countryName, activityName])


  const handleDecreasePage = () =>{
      return dispatch(decreasePage())
    }

  const handleIncrementPage = () =>{
      return dispatch(increasePage())
  }

  return (
    <>
      <Pagination />
      <div className={styles.countriesContainer}>
          <button className={styles.back} onClick={handleDecreasePage}> ← </button>
          {allCountries.length ?
          <div className={styles.container}>
            {
              listOfCountries.length ? listOfCountries.map( (country, index) => (
                <Link key={index} to={`/countries/${country.id}`}>
                  <Country country={country}/>
                </Link>
              ))
              :
              <h1 style={{visibility:"hidden"}}> none </h1>
            }
          </div>
          :
            <h1 className={styles.loading}>Loading...</h1>
          }
          <button className={styles.forward} onClick={handleIncrementPage}> → </button>
      </div>
    </>
  )
}
