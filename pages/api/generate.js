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

  try {
    const completion = await openai.createCompletion({
      // model: 'code-davinci-002',
      model: 'text-davinci-003',
      prompt: generatePrompt(wordsCount, subject),
      temperature: 1,
      max_tokens: 4000,
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

function generatePrompt(wordsCount, subject) {
  return `Write ${wordsCount} words review for a ${subject}`
  // return `${subject}`
  // return `Write 300 names for restaurants`
  // return `Write 1500 words review for a fancy restaurant`
  // return `Write 10 reviews of 150 words for a fancy restaurant`
}
