import React from 'react'
import { useSelector } from 'react-redux'
import styles from './CountryDetails.module.css'

export default function CountryDetails() {

    const countryData = useSelector(state => state.selectedCountry)

  return (
    <div className={styles.container}>
        <img src={countryData.flagImg} alt={`${countryData.name} flag`} />
        <h1 className={styles.detail}> {countryData.name} ({countryData.continent}) </h1>
        <h1 className={styles.detail}> {countryData.id} </h1>
        <h1 className={styles.detail}> {countryData.capital} </h1>
        <h1 className={styles.detail}> {countryData.subRegion} </h1>
        <h1 className={styles.detail}> {countryData.area} </h1>
        <h1 className={styles.detail}> {countryData.population} </h1>
        {countryData.length && <h2>Activities:</h2>}
          {countryData.activities && countryData.activities.map( (act, index) => (
            <h3 key={index}>{act.name}</h3>
          ))}
    </div>
  )
}
