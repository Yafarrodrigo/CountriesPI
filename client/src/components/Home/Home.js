import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { getAllCoutries } from '../../redux/actions'
import CountriesContainer from '../CountriesContainer/CountriesContainer'
import styles from './Home.module.css'

export default function Home() {
  const dispatch = useDispatch()

  useEffect(()=>{
    dispatch(getAllCoutries())  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  

  return (
    <div className={styles.home}>
      <CountriesContainer />
    </div>
  )
}
