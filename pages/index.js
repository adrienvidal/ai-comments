import Head from 'next/head'
import { useState } from 'react'
import styles from './index.module.scss'

// components
import Left from '../components/left/Left'
import Right from '../components/right/Right'

// Write 1500 words review of casinowhizz.com with 10 paragraph of 150 words each

function getWordCount(str) {
  return str.split(' ').filter(function (n) {
    return n != ''
  }).length
}

export default function Home() {
  const [wordsCount, setWordsCount] = useState('')
  const [subject, setSubject] = useState('')
  const [result, setResult] = useState([])
  const [totalWords, setTotalWords] = useState(0)
  const [isLoading, setIsLoading] = useState(false)

  async function onSubmit(event) {
    event.preventDefault()

    setIsLoading(true)

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          wordsCount: wordsCount,
          subject: subject,
          previousResult: result,
        }),
      })

      const data = await response.json()
      if (response.status !== 200) {
        throw (
          data.error ||
          new Error(`Request failed with status ${response.status}`)
        )
      }

      setIsLoading(false)
      setResult([...result, data.result])
      setTotalWords(getWordCount([...result, data.result].join(' ')))
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
        <h3>Generate Comments !!</h3>

        <div className={styles.wrapper}>
          <Left
            onSubmit={onSubmit}
            wordsCount={wordsCount}
            setWordsCount={setWordsCount}
            subject={subject}
            setSubject={setSubject}
            isLoading={isLoading}
            isPreviousResult={result.length}
            setResult={setResult}
          />
          <Right result={result} totalWords={totalWords} />
        </div>
      </main>
    </div>
  )
}
