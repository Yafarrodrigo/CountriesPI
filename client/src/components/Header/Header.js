import styles from './Header.module.css'
import { Link, useLocation } from 'react-router-dom'
import Filters from '../Filters/Filters'


export default function Header() {

  const location = useLocation()

  return (
    <div className={styles.header}>
      <Link to="/home">
        <div className={styles.logo}>
          <div></div>
          <h1>Countries</h1>
        </div>
      </Link>

      {location.pathname === "/home" && <Filters />}

      {location.pathname === "/activities/create" || location.pathname.includes("/countries") ?
      (<Link to="/home">
        <button className={styles.backButton}> ← Go back</button>
      </Link>)
      :
      (
        <Link to="/activities/create">
          <button className={styles.createActButton}> Create activity</button>
        </Link>
      )}
    </div>
  )
}