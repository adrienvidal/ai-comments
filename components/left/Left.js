import React from 'react'
import styles from './left.module.scss'

// Write 1500 words review of casinowhizz.com with 10 paragraph of 150 words each

export default function Left({ onSubmit, questionInput, setQuestionInput }) {
  return (
    <section className={styles.left}>
      <form onSubmit={onSubmit}>
        <textarea
          name="question"
          rows="5"
          cols="30"
          placeholder='Your question here'
          value={questionInput}
          onChange={(e) => setQuestionInput(e.target.value)}
        />
        <input type="submit" value="Generate comments" />
      </form>
    </section>
  )
}
