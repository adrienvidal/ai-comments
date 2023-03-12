import React from 'react'
import styles from './left.module.scss'

export default function Left({
  wordsCount,
  setWordsCount,
  onSubmit,
  subject,
  setSubject,
  isLoading,
  isPreviousResult,
  setResult,
}) {
  return (
    <section className={styles.left}>
      <form onSubmit={onSubmit}>
        <input
          type="number"
          name="counter"
          placeholder="Number of words"
          value={wordsCount}
          onChange={(e) => setWordsCount(e.target.value)}
        />
        {!isPreviousResult && (
          <input
            type="text"
            name="subject"
            placeholder="Your subject here"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          />
        )}
        {isPreviousResult ? (
          <input
            type="submit"
            data-loading={`${isLoading ? 'true' : 'false'}`}
            value={isLoading ? 'Loading ...' : 'Continue'}
          />
        ) : (
          <input
            type="submit"
            data-loading={`${isLoading ? 'true' : 'false'}`}
            value={isLoading ? 'Loading ...' : 'Generate comments'}
          />
        )}
        {isPreviousResult ? (
          <button type="button" onClick={() => setResult([])}>
            Clear
          </button>
        ) : (
          ''
        )}
      </form>
    </section>
  )
}
