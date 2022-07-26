import styles from './Header.module.css'
import { Link, useParams } from 'react-router-dom'
import Filters from '../Filters/Filters'


export default function Header() {

  const params = useParams()

  return (
    <div className={styles.header}>
      <Link to="/home">
        <div className={styles.logo}>
          <div></div>
          <h1>Countries</h1>
        </div>
      </Link>
      {!params.idPais ? 
        <Filters /> 
      : 
      <Link to="/home">
        <button className={styles.backButton}> ← Volver</button>
        </Link>}
    </div>
  )
}
