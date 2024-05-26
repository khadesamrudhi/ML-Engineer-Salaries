const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 5000;
const OPENAI_API_KEY = ''; //add key

app.use(bodyParser.json());
app.use(cors());

app.post('/generate-insight', async (req, res) => {
  const { prompt } = req.body;

  try {
    const response = await axios.post(
      'https://api.openai.com/v1/completions',
      {
        model: 'gpt-3.5-turbo-instruct',
        prompt: `Based on the dataset of ML Engineer salaries from 2020 to 2024, provide insights for the following question: ${prompt}` , //kya karu?
        max_tokens: 150,
      },
      {
        headers: {
          'Authorization': `Bearer ${OPENAI_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );
    

    const { choices } = response.data;
    res.json({ insight: choices[0].text.trim() });
  } catch (error) {
    console.error('Error generating insight:', error.response ? error.response.data : error.message);
    res.status(500).send('Error generating insight');
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
