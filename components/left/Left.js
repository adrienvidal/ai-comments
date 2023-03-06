import React from 'react'
import styles from './left.module.scss'

export default function Left({ onSubmit, animalInput, setAnimalInput }) {
  return (
    <section className={styles.left}>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          name="animal"
          placeholder="Subject"
          value={animalInput}
          onChange={(e) => setAnimalInput(e.target.value)}
        />
        <input type="submit" value="Generate names" />
      </form>
    </section>
  )
}
