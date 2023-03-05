const Article = require('./models/article');

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

    await Article.deleteMany(); // Delete all existing articles
    await Article.insertMany(articles); // Insert the new articles

    res.send(articles);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error fetching articles');
  }
});