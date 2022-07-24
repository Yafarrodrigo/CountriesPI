import React from 'react'
import CountriesContainer from '../CountriesContainer/CountriesContainer'
import styles from './Home.module.css'

export default function Home() {

  return (
    <div className={styles.home}>
      <CountriesContainer />
    </div>
  )
}
