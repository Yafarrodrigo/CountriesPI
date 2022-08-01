import React, {useEffect} from 'react'
import { useDispatch} from 'react-redux'
import CountriesContainer from '../CountriesContainer/CountriesContainer'
import styles from './Home.module.css'
import { resetFilters, getAllCoutries } from '../../redux/actions'

export default function Home() {

  const dispatch = useDispatch()

  useEffect(()=>{
    dispatch(resetFilters())
    dispatch(getAllCoutries())
  },[dispatch])

  return (
    <div className={styles.home}>
      <CountriesContainer />
    </div>
  )
}
