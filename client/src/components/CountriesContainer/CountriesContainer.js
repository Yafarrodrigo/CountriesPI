import React from 'react'
import styles from './CountriesContainer.module.css'
import Country from '../Country/Country'
import Pagination from '../Pagination/Pagination'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getTenCoutries, increasePage, decreasePage, getAllCoutries } from '../../redux/actions'


export default function CountriesContainer() {
  const dispatch = useDispatch()

  const pageNumber = useSelector( state => state.page)
  const listOfCountries = useSelector(state => state.tenCountries)

  useEffect(()=>{
    dispatch(getTenCoutries())
  },[dispatch, pageNumber])

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
                <Link key={index} to={`/countries/${country.name}`}>
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
