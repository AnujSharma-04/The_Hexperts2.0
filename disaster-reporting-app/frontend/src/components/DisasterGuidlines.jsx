import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Button } from "./ui/button";

const disasterTypes = {
  Earthquake: {
    Indoors: [
      "Drop, Cover, and Hold On.",
      "Stay away from windows and heavy objects.",
      "Do not use elevators."
    ],
    Outdoors: [
      "Move away from buildings, streetlights, and utility wires.",
      "Find an open area and stay there.",
      "Do not run inside buildings."],
  },
  Flood: {
    Indoors: [
      "Move to higher ground immediately.",
      "Turn off utilities if instructed.",
      "Avoid contact with floodwater."],
    Outdoors: [
      "Do not walk or drive through floodwaters.",
      "Move to higher ground away from water sources.",
      "Stay away from electrical equipment."],
  },
};

const DisasterGuidelines = () => {
  const [selectedDisaster, setSelectedDisaster] = useState("Earthquake");
  const [selectedScenario, setSelectedScenario] = useState("Indoors");

  return (
    <div className="text-center py-10">
      <h2 className="text-4xl font-bold text-[#051650] mb-6">Disaster Guidelines</h2>
      <div className="flex justify-center gap-4 mb-6">
        {Object.keys(disasterTypes).map((disaster) => (
          <Button
            key={disaster}
            className={`px-6 py-2 rounded-lg transition-all duration-300 ${
              selectedDisaster === disaster ? "bg-[#0077B6] text-white" : "bg-gray-200"
            }`}
            onClick={() => setSelectedDisaster(disaster)}
          >
            {disaster}
          </Button>
        ))}
      </div>
      
      <div className="flex justify-center gap-4 mb-6">
        {Object.keys(disasterTypes[selectedDisaster]).map((scenario) => (
          <Button
            key={scenario}
            className={`px-6 py-2 rounded-lg transition-all duration-300 ${
              selectedScenario === scenario ? "bg-[#FF5733] text-white" : "bg-gray-200"
            }`}
            onClick={() => setSelectedScenario(scenario)}
          >
            {scenario}
          </Button>
        ))}
      </div>

      <Swiper
        modules={[Navigation, Pagination]}
        navigation
        pagination={{ clickable: true }}
        className="w-full max-w-lg mx-auto bg-white p-6 rounded-lg shadow-lg"
      >
        {disasterTypes[selectedDisaster][selectedScenario].map((tip, index) => (
          <SwiperSlide key={index} className="p-4">
            <p className="text-lg font-medium">{tip}</p>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default DisasterGuidelines;