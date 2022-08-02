import React from 'react'
import skullIcon from './skull.png'
import { useDispatch, useSelector } from 'react-redux'
import styles from './CountryDetails.module.css'
import { Redirect, useParams } from 'react-router-dom'
import { selectCountry } from '../../redux/actions'
import { useEffect } from 'react'
import { useState } from 'react'

export default function CountryDetails() {

  const dispatch = useDispatch()
  const countryData = useSelector(state => state.selectedCountry)
  const params = useParams()
  const [willRender, setWillRender] = useState(true)

  useEffect(()=>{
    if(!countryData.id){
      if(params.idPais.length && params.idPais.length === 3){
        dispatch(selectCountry(params.idPais.toUpperCase()))
      }else{
        setWillRender(false)
      }
    }

    if(countryData.id === "error") setWillRender(false)

  },[dispatch,countryData,params])

  if(!willRender) return (<Redirect to="/home" />)
  else
    return (
      <div className={styles.flexContainer}>
        <div className={styles.container}>
          <img src={countryData.flagImg} alt={`${countryData.name} flag`} />
          <h1 className={styles.detail}> {countryData.name} ({countryData.continent}) </h1>
          <h1 className={styles.detail}> {countryData.id} </h1>
          <h1 className={styles.detail}> <span>capital:</span> {countryData.capital} </h1>
          <h1 className={styles.detail}> <span>subRegion:</span> {countryData.subRegion} </h1>
          <h1 className={styles.detail}> <span>area:</span> {countryData.area} </h1>
          <h1 className={styles.detail}> <span>population:</span> {countryData.population} </h1>
          <h5 id={styles.extraInfo}>(* before apocalypse)</h5>      
      </div>

      <div className={styles.activities}>
        <h2>Activities:</h2>
        <div className={styles.activitiesContainer}>
        {countryData.activities && countryData.activities.length ?
        countryData.activities.map( (act, index) => (
          <div key={index} className={styles.activityCard}> 
              <h3><span>{act.name}</span></h3>
              <h5 id={styles.difficulty}>difficulty: 
                <div id={styles.skullsContainer}>
                {[...Array(act.difficulty)].map((x, index) =>
                  <img src={skullIcon} key={index} alt="skullIcon" />
                )}
                  </div>
              </h5>
              <h5>duration: <span>{act.duration}</span> hours </h5>
              <h5>season: <span>{act.season}</span></h5>
          </div>
        ))
        :
          <h2 className={styles.noActivities}>None</h2>
        }
        </div>
          
      </div>
        
      </div>
   )
}
