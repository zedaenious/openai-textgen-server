const express = require('express');
const OpenAI = require('openai');
const cors = require('cors');

require('dotenv').config();

const app = express();
const openAI = new OpenAI();

app.use(cors());
app.use(express.json());

app.get('/api', async (res) => {
  res.status(200);
});

app.post('/api/', async (req, res) => {
  try {
    console.log('about to make create request to openai');
    const completion = await openAI.completions.create({
      model: 'gpt-3.5-turbo',
      prompt: 'all pie is good pie',
      max_tokens: 7,
      temperature: 0,
    });

    console.log(`${prompt} response from OpenAI servers: ${completion.choices[0]}`);

    res.status(200).send({
      openAiResponse: completion.choices[0]  
    });
  } catch(error) {
    console.log('error occurred: ', error);
    res.status(500).send(error)
  }
});

app.listen(5170, () => console.log('Server is running on port http://localhost:5170'));

module.exports = app;