import React from 'react'
import styles from './right.module.scss'

export default function Right({ result }) {
  return (
    <section className={styles.right}>
      <div className={styles.result}>{result}</div>
    </section>
  )
}
