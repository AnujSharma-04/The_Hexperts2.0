const NewsCard = ({ title, description, url, className = "" }) => {
  return (
    <div className={`p-6 ${className}`}>
      <h3 className="text-xl font-bold mb-3 text-gray-800">{title}</h3>
      <p className="text-gray-600 mb-4">{description}</p>
      {url && (
        <a 
          href={url} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="inline-block text-blue-600 hover:text-blue-800 font-medium"
        >
          Read More →
        </a>
      )}
    </div>
  );
};

export default NewsCard;
  