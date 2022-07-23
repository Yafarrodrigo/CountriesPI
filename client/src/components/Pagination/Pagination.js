import React from 'react'
import { useSelector } from 'react-redux'
import styles from './Pagination.module.css'

export default function Pagination() {

  const pageNumber = useSelector( state => state.page)
  const maxPageNumber = useSelector( state => state.maxPage)


  return (
    <div className={styles.indicator}>
        <div> {pageNumber} / {maxPageNumber}</div>
    </div>
  )
}
