import { Configuration, OpenAIApi } from 'openai'

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
})
const openai = new OpenAIApi(configuration)

export default async function (req, res) {
  if (!configuration.apiKey) {
    res.status(500).json({
      error: {
        message:
          'OpenAI API key not configured, please follow instructions in README.md',
      },
    })
    return
  }

  const wordsCount = req.body.wordsCount || ''
  const subject = req.body.subject || ''
  const previousResult = req.body.previousResult || ''

  try {
    const completion = await openai.createCompletion({
      model: 'text-davinci-003',
      prompt: generatePrompt(wordsCount, subject, previousResult),
      temperature: 0.7,
      top_p: 1,
      max_tokens: 500,
      // stream: true,
      n: 1,
    })
    res.status(200).json({ result: completion.data.choices[0].text })
  } catch (error) {
    // Consider adjusting the error handling logic for your use case
    if (error.response) {
      console.error(error.response.status, error.response.data)
      res.status(error.response.status).json(error.response.data)
    } else {
      console.error(`Error with OpenAI API request: ${error.message}`)
      res.status(500).json({
        error: {
          message: 'An error occurred during your request.',
        },
      })
    }
  }
}

// Write a 1500-word essay on climate change
// Continue after your last sentence with 1500-word

/* `
Subject: Restaurent
Words: 150

Write 10 paragraphs with the informations above about a restaurent one by one
` */

function generatePrompt(wordsCount, subject, previousResult) {
  const firstPrompt = `
  Can you write a ${wordsCount}-word review about a ${subject}
  `

  const promptIfPreviousPrompt = `
  Remember my last question: "${firstPrompt}".
  Remember your last answer: "${previousResult.join(' ')}".
  Continue after the last sentence of your last answer.
  Avoid identicals sentences.
  `

  return previousResult.length ? promptIfPreviousPrompt : firstPrompt
  // return `Can you write a 1500-word review about a restaurent`
  // return `Write ${wordsCount} words review for a ${subject}`
  // Write a 1500-word essay on climate change
  // return `${subject}`
  // return `Write 300 names for restaurants`
  // return `Write 1500 words review for a fancy restaurant`
  // return `Write 10 reviews of 150 words for a fancy restaurant`
  // return "Write a 1500 words restaurant review based on these notes:\n\nName: The Blue Wharf\nLobster great, noisy, service polite, prices good.\n\nReview:"
}
