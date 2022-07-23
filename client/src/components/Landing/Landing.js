import React from 'react'
import styles from './Landing.module.css'
import { Link } from 'react-router-dom'

export default function Landing() {
  return (
    <div className={styles.container}>
      <Link to="/home">
        <button className={styles.start} href='./home'>Enter App !</button>
      </Link>
    </div>
  )
}
