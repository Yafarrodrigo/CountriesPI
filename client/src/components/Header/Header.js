import React from 'react'
import styles from './Header.module.css'
import { Link } from 'react-router-dom'

export default function Header() {
  return (
    <div className={styles.header}>
      <Link to="/">
        <div className={styles.logo}>
          <div></div>
          <h1>Countries</h1>
        </div>
      </Link>
      <form>
        <input type="text" name="countryName" id="countryName" autoFocus placeholder='country name...'/>
        <button>Search</button>
      </form>
    </div>
  )
}
