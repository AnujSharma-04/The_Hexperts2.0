const NewsCard = ({ title, description, url, className = "" }) => {
  return (
    <div className={`p-6 bg-light-cyan bg-opacity-50 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 ${className}`}>
      <h3 className="text-xl font-bold mb-3 text-federal">{title}</h3>
      <p className="text-marian mb-4">{description}</p>
      {url && (
        <a 
          href={url} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="inline-block text-honolulu hover:text-pacific font-medium transition-colors duration-200"
        >
          Read More →
        </a>
      )}
    </div>
  );
};

export default NewsCard;
  