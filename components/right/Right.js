import React from 'react'
import styles from './right.module.scss'

export default function Right({ result, totalWords }) {
  return (
    <section className={styles.right}>
      <div className={styles.totalWords}>Total Words: {totalWords}</div>
      <div className={styles.result}>
        {result.map((res) => (
          <p>{res}</p>
        ))}
      </div>
    </section>
  )
}
