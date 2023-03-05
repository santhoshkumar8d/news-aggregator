const express = require('express');
const axios = require('axios');
const mongoose = require('mongoose');
const Article = require('./models/article');

const app = express();
const port = 3001;

mongoose.connect('mongodb://localhost:27017/news', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((error) => {
  console.error(error);
});

app.get('/api/articles', async (req, res) => {
  try {
    const response = await axios.get('https://newsapi.org/v2/top-headlines', {
      params: {
        country: 'us',
        apiKey: '1292875a664f4636b1979a6662f709a4'
      }
    });

    const articles = response.data.articles.map(article => ({
      title: article.title,
      description: article.description,
      url: article.url,
      urlToImage: article.urlToImage,
      publishedAt: article.publishedAt
    }));

    await Article.deleteMany();
    await Article.insertMany(articles);

    res.send(articles);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error fetching articles');
  }
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});