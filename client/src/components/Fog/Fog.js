import React from 'react'
import fog1 from './fog-1.png'
import fog2 from './fog-2.png'
import styles from './Fog.module.css'

export const Fog = React.memo(() => (
    <div className={styles.fog}>
        <div className={styles.fogContainer}>
            <div className={styles.fogImgFirst} style={{background:`Url(${fog1})`}}></div>
            <div className={styles.fogImgSecond} style={{background:`Url(${fog2})`}}></div>
        </div>
    </div>
  ), ()=> true)
