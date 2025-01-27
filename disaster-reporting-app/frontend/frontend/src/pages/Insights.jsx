import { useEffect, useState } from "react";
import NewsCard from "../components/NewsCard";

const Insights = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    fetch(`https://newsapi.org/v2/everything?q=disaster&apiKey=YOUR_API_KEY`)
      .then(response => response.json())
      .then(data => setArticles(data.articles));
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-6">Disaster News</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {articles.map((article, index) => (
          <NewsCard key={index} title={article.title} description={article.description} url={article.url} />
        ))}
      </div>
    </div>
  );
};

export default Insights;
