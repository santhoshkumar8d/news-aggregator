import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchArticles() {
      try {
        const response = await axios.get('/api/articles');
        setArticles(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
      }
    }
    fetchArticles();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Latest Articles</h1>
      <ul>
        {articles.map((article, index) => (
          <li key={index}>
            <h