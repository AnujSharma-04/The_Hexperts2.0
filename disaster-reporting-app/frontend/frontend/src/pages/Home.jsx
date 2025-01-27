// Home.jsx
import React, { useState } from "react";
import NewsCard from "../components/NewsCard";
import { Button } from "../components/ui/button";
import FormPopup from "../components/FormPopup";
// import { Carousel } from "react-responsive-carousel";

const Home = () => {
  const [formPopup, setFormPopup] = useState(false);
  // Add state for number inputs
  const [casualties, setCasualties] = useState(0);
  const [injuries, setInjuries] = useState(0);
  const [missingPersons, setMissingPersons] = useState(0);
  const [selectedFiles, setSelectedFiles] = useState([]);

  const toggleFormPopup = () => setFormPopup(!formPopup);

  // Handler functions for number inputs
  const handleIncrement = (setter, value) => {
    setter(prev => Math.max(0, prev + 1));
  };

  const handleDecrement = (setter, value) => {
    setter(prev => Math.max(0, prev - 1));
  };

  const handleInputChange = (setter, value) => {
    const numValue = parseInt(value) || 0;
    setter(Math.max(0, numValue));
  };

  const handleFileChange = (e) => {
    const newFiles = Array.from(e.target.files);
    const totalFiles = [...selectedFiles, ...newFiles];
    
    if (totalFiles.length > 5) {
      alert('Maximum 5 files can be uploaded. Please remove some files first.');
      return;
    }
    
    setSelectedFiles(totalFiles);
    // Reset input value to allow selecting the same file again
    e.target.value = '';
  };

  return (
    <div className="container mx-auto px-4">
      {/* Hero Section */}
      <section className="text-center py-20 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg mt-8 text-white">
        <h1 className="text-4xl font-bold mb-4">Welcome to Disaster Insights</h1>
        <p className="text-xl mb-8 max-w-2xl mx-auto">
          A platform to share insights and challenges during disasters and request necessary resources.
        </p>
        <Button 
          className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-blue-600 text-lg px-8 py-3 font-semibold shadow-md transition-all duration-200" 
          onClick={toggleFormPopup}
        >
          Report Disaster
        </Button>
      </section>

      {/* Form Popup */}
      <FormPopup 
        isOpen={formPopup} 
        onClose={() => setFormPopup(false)} 
      />

      {/* News Section */}
      <section className="mt-16">
        <h2 className="text-3xl font-bold text-center mb-12">Latest Updates</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <NewsCard 
            className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow" 
            title="Recent Earthquake Impact" 
            description="Latest updates on the earthquake impact and recovery efforts in affected regions."
          />
          <NewsCard 
            className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow" 
            title="Flood Warning Alert" 
            description="Important information about potential flood risks and preventive measures."
          />
          <NewsCard 
            className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow" 
            title="Emergency Response" 
            description="Updates on emergency response teams and their current operations."
          />
        </div>
      </section>
    </div>
  );
};

export default Home;