import React, { useState } from "react";
import NewsCard from "../components/NewsCard";
import { Button } from "../components/ui/button";
import FormPopup from "../components/FormPopup";

const Home = () => {
  const [formPopup, setFormPopup] = useState(false);

  const toggleFormPopup = () => setFormPopup(!formPopup);

  return (
    <div className="container mx-auto px-4">
      {/* Hero Section */}
      <section className="text-center py-20 bg-gradient-to-r from-[#03045E] to-[#023E8A] rounded-lg mt-8 text-[#CAF0F8]">
        <h1 className="text-4xl font-bold mb-4">Welcome to Disaster Insights</h1>
        <p className="text-xl mb-8 max-w-2xl mx-auto">
          A platform to share insights and challenges during disasters and request necessary resources.
        </p>
        <Button 
          className="bg-transparent border-2 border-[#CAF0F8] text-[#CAF0F8] hover:bg-[#CAF0F8] hover:text-[#03045E] text-lg px-8 py-3 font-semibold shadow-md transition-all duration-200" 
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
        <h2 className="text-3xl font-bold text-center text-[#023E8A] mb-12">Latest Updates</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <NewsCard 
            className="bg-[#90E0EF] shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow" 
            title="Recent Earthquake Impact" 
            description="Latest updates on the earthquake impact and recovery efforts in affected regions."
          />
          <NewsCard 
            className="bg-[#ADE8F4] shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow" 
            title="Flood Warning Alert" 
            description="Important information about potential flood risks and preventive measures."
          />
          <NewsCard 
            className="bg-[#CAF0F8] shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow" 
            title="Emergency Response" 
            description="Updates on emergency response teams and their current operations."
          />
        </div>
      </section>
    </div>
  );
};

export default Home;
