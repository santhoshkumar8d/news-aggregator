const express = require('express');
const axios = require('axios');

const app = express();
const port = 3001;

// Define a route to fetch the latest articles from the News API
app.get('/api/articles', async (req, res) => {
  try {
    const response = await axios.get('https://newsapi.org/v2/top-headlines', {
      params: {
        country: 'us',
        apiKey: '1292875a664f4636b1979a6662f709a4'
      }
    });
    res.send(response.data.articles);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error fetching articles');
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});