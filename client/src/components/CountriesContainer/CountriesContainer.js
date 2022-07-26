import React from 'react'
import styles from './CountriesContainer.module.css'
import Country from '../Country/Country'
import Pagination from '../Pagination/Pagination'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import {increasePage, decreasePage,getFilteredCountries, getAllCoutries } from '../../redux/actions'


export default function CountriesContainer() {
  const dispatch = useDispatch()

  const pageNumber = useSelector( state => state.page)
  const listOfCountries = useSelector(state => state.tenCountries)
  const filter = useSelector( state => state.continentFilter)
  const order = useSelector( state => state.order)
  const countryName = useSelector( state => state.countryName)
  

  useEffect(()=>{
    dispatch(getAllCoutries())
  },[dispatch])

  useEffect(()=>{
    dispatch(getFilteredCountries())
   
  },[dispatch, pageNumber, filter, order, countryName])


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
          <div className={styles.container}>
            {
              listOfCountries.map( (country, index) => (
                <Link key={index} to={`/countries/${country.id}`}>
                  <Country country={country}/>
                </Link>
              ))
            }
          </div>
          <button className={styles.forward} onClick={handleIncrementPage}> → </button>
      </div>
    </>
  )
}
