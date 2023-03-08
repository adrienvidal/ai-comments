import React from 'react'
import styles from './left.module.scss'

export default function Left({ wordsCount, setWordsCount, onSubmit, subject, setSubject }) {
  return (
    <section className={styles.left}>
      <form onSubmit={onSubmit}>
        <input type="number"
          name="counter"
          placeholder='Number of words'
          value={wordsCount}
          onChange={(e) => setWordsCount(e.target.value)}
        />
        <input type="text"
          name="subject"
          placeholder='Your subject here'
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        />
        <input type="submit" value="Generate comments" />
      </form>
    </section>
  )
}
