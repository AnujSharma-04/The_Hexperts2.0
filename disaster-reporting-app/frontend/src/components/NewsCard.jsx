import React from "react";

const NewsCard = ({ title, description, url, bgColor }) => {
  return (
    <div
      className="p-6 text-white rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300  "
      style={{
        background: `linear-gradient(135deg, ${bgColor} 30%, #105469 100%)`,
      }}
    >
      <h3 className="text-2xl font-bold mb-3">{title}</h3>
      <p className="text-lg mb-5 opacity-90">{description}</p>
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block bg-white text-[#0077B6] font-semibold px-6 py-3 rounded-full hover:bg-[#e3f2fd] transition-all duration-300 shadow-md hover:shadow-lg"
      >
        Read Full Article →
      </a>
    </div>
  );
};

export default NewsCard;
