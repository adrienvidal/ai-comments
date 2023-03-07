import Head from 'next/head'
import { useState } from 'react'
import styles from './index.module.scss'

// components
import Left from '../components/left/Left'
import Right from '../components/right/Right'

export default function Home() {
  const [questionInput, setQuestionInput] = useState('')
  const [result, setResult] = useState()

  async function onSubmit(event) {
    event.preventDefault()

    setResult('Loading...')

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ myQuestion: questionInput }),
      })

      const data = await response.json()
      if (response.status !== 200) {
        throw (
          data.error ||
          new Error(`Request failed with status ${response.status}`)
        )
      }

      setResult(data.result)
      setQuestionInput('')
    } catch (error) {
      // Consider implementing your own error handling logic here
      console.error(error)
      alert(error.message)
    }
  }

  return (
    <div>
      <Head>
        <title>Ai Comments</title>
        <link rel="icon" href="/dog.png" />
      </Head>
      <main className={styles.main}>
        <h3>Generate Comments</h3>

        <div className={styles.wrapper}>
          <Left
            onSubmit={onSubmit}
            questionInput={questionInput}
            setQuestionInput={setQuestionInput}
          />
          <Right result={result} />
        </div>
      </main>
    </div>
  )
}
