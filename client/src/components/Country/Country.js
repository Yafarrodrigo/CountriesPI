import React from 'react'
import styles from './Country.module.css'

export default function Country({country}) {
  return (
    <div 
      className={styles.card}
      style={{backgroundImage: `url(${country.flagImg})`}}> 
      
        <div>
          <h1>{country.name}</h1>
          <h3>({country.continent})</h3>
        </div>

      </div>
  )
}
