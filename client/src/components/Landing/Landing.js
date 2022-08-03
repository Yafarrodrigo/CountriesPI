import React from 'react'
import styles from './Landing.module.css'
import { Link } from 'react-router-dom'
import htmlImg from '../../Imgs/html.png'
import cssImg from '../../Imgs/css.png'
import javascriptImg from '../../Imgs/js.png'
import reactImg from '../../Imgs/react.png'
import reduxImg from '../../Imgs/redux.png'
import nodeImg from '../../Imgs/node.png'
import sequelizeImg from '../../Imgs/sequelize.png'
import postgreImg from '../../Imgs/postgreSQL.png'

export default function Landing() {
  return (
    <div className={styles.container}>
      <div className={styles.infoCointainer}>
        <h1>About this app</h1>
        <p>The future is now... it's 2049 and the world has been ravaged by the forces of nature.
           With this app you'll be able to organize you or your team to try and survive.</p>
           <p>features:</p>
           <ul>
            <li>Search for countries and their info</li>
            <li>Filter countries by name, activities, continents</li>
            <li>Sort countries in different ways </li>
            <li>Create activities and see them in the country info</li>
           </ul>
           <p>Technologies used:</p>
           <ul>
            <li>HTML, CSS, Javascript 
                <img src={htmlImg} alt="html icon" />
                <img src={cssImg} alt="css icon" />
                <img src={javascriptImg} alt="javascript icon" />
            </li>
            <li>React, Redux 
              <img src={reactImg} alt="react icon" />
              <img src={reduxImg} alt="redux icon" />
            </li>
            <li>Node, Express
              <img src={nodeImg} alt="node icon" />
            </li>
            <li>Sequelize, PostgreSQL 
              <img src={sequelizeImg} alt="sequelize icon" />
              <img src={postgreImg} alt="postgreSQL icon" />
              </li>
           </ul>
        <Link to="/home" style={{display:'flex', margin:"25px 0"}}>
          <button className={styles.start} href='./home'>Enter App !</button>
        </Link>
      </div>
    </div>
  )
}
