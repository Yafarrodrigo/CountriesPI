import React, { useEffect } from 'react'
import styles from './Header.module.css'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { getAllCoutries, getCountriesByName } from '../../redux/actions'

export default function Header() {

  const dispatch = useDispatch()
  const [countryName, setCountryName] = useState("")

  useEffect(()=>{
    if(countryName.length || countryName !== ""){
      dispatch(getCountriesByName(countryName))
    }
    else{
      dispatch(getAllCoutries())
    }
  },[dispatch, countryName])

  const handleChange = (e)=>{
    setCountryName(e.target.value)
  }


  return (
    <div className={styles.header}>
      <Link to="/home">
        <div className={styles.logo}>
          <div></div>
          <h1>Countries</h1>
        </div>
      </Link>
      <form onSubmit={(e)=> e.preventDefault()}>
        <input 
          autoFocus 
          type="text"
          name="countryName" 
          id="countryName" 
          placeholder='country name...'
          value={countryName}
          onChange={handleChange}
        />
      </form>
    </div>
  )
}
