import React from 'react'
import { useDispatch } from 'react-redux'
import { selectCountry } from '../../redux/actions'
import styles from './Country.module.css'

export default function Country({country}) {

  const dispatch = useDispatch()

  const handleClick = async () =>{
    dispatch(selectCountry(country.id))
  }

  return (
    <div 
      className={styles.card}
      style={{backgroundImage: `url(${country.flagImg})`}}
      onClick={handleClick}
      > 
      
        <div>
          <h1>{country.name}</h1>
          <h3>({country.continent})</h3>
        </div>

      </div>
  )
}
