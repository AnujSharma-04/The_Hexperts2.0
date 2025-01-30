import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import NewsCard from "../components/NewsCard";
import { Button } from "../components/ui/button";
import FormPopup from "../components/FormPopup";
import { getDisasterNews } from "../apiService"; // API call for news
import DisasterGuidelines from "../components/DisasterGuidlines";

const Home = () => {
  const [formPopup, setFormPopup] = useState(false);
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const fetchedArticles = await getDisasterNews();
        setArticles(fetchedArticles.slice(0, 9)); // Limit news to 9 articles
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch disaster news");
        setLoading(false);
      }
    };
    fetchNews();
  }, []);

  const toggleFormPopup = () => setFormPopup(!formPopup);

  return (
    <div className="container mx-auto px-4 relative">
      {/* Hero Section */}
      <section className="text-center py-20 bg-gradient-to-r from-[#FCFBFF] to-[#0077B6] rounded-lg mt-8 text-[#051650] shadow-lg transform transition-all duration-300 hover:scale-105">
        <h1 className="text-5xl font-extrabold text-white mb-4 transition-all duration-300 hover:text-yellow-400">
          Welcome to CatastroFix
        </h1>
        <p className="text-xl mb-8 max-w-2xl mx-auto text-white transition-all duration-300 hover:text-yellow-100">
          A platform to share insights and challenges during disasters and request necessary resources.
        </p>
        <Button
          className="bg-[#0077B6] hover:bg-[#005F8A] text-white text-lg px-8 py-3 font-semibold shadow-md rounded-lg transition-all duration-200 transform hover:scale-105"
          onClick={toggleFormPopup}
        >
          Report Disaster
        </Button>
      </section>

      {/* Form Popup (Appears Above Everything) */}
      {formPopup && (
        <div className="fixed inset-0 z-50 flex justify-center items-center bg-black bg-opacity-30 backdrop-blur-md">
          <div className="bg-white w-full max-w-lg h-[80%] rounded-t-3xl shadow-lg p-6 overflow-hidden">
            {/* Scrollable content inside the popup */}
            <div className="overflow-auto h-full">
              <FormPopup isOpen={formPopup} onClose={() => setFormPopup(false)} />
            </div>
          </div>
        </div>
      )}

      {/* News Section with Swiper Slider */}
      <section className="mt-16 text-center">
        <h2 className="text-4xl font-bold text-[#051650] mb-8">Latest Updates</h2>

        {loading && <p className="text-center text-gray-500">Loading...</p>}
        {error && <p className="text-center text-red-500">{error}</p>}

        <Swiper
          modules={[Autoplay, Pagination, Navigation]}
          spaceBetween={20}
          slidesPerView={1}
          autoplay={{ delay: 5000 }}
          pagination={{ clickable: true }}
          navigation
          className="w-full max-w-4xl mx-auto"
        >
          {articles.map((article, index) => (
            <SwiperSlide key={index}>
              <NewsCard
                className="shadow-lg rounded-lg overflow-hidden hover:scale-105 transition-transform duration-300"
                title={article.title || "No title available"}
                description={article.description || "No description available"}
                url={article.url || "#"}
                bgColor="#20818e"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      {/* Disaster Guidelines Section */}
      <section className="mt-16">
        <DisasterGuidelines />
      </section>
    </div>
  );
};

export default Home;
