const express = require('express');
const { Configuration, OpenAIApi } = require('openai');
const cors = require('cors');

require('dotenv').config();

const app = express();
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

app.use(cors());
app.use(express.json());

app.get('/api', async (req, res) => {
  res.status(200).send({
    message: 'Hello from codex code generator',
  });
});

app.post('/api', async (req, res) => {
  try {
    const prompt = req.body.prompt;
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `${prompt}`,
      temperature: 0, // refers to risk level taken
      max_tokens: 3000,
      top_p: 1,
      frequency_penalty: 0.5,
      presence_penalty: 0,
    });

    res.status(200).send({
      bot: response.data.choices[0].text,
    });
  } catch(err) {
    console.log('error from openai.createCompletion', error);
    res.status(500).send({ err });
  }
});

app.listen(5170, () => console.log('Server is running on port http://localhost:5170'));

module.exports = app;