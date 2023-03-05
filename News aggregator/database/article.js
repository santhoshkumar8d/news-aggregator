const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
  title: String,
  description: String,
  url: String,
  urlToImage: String,
  publishedAt: Date
});

const Article = mongoose.model('Article', articleSchema);

module.exports = Article;