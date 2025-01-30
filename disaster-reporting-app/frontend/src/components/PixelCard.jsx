import React from "react";

const PixelCard = ({ variant = "default", className, children }) => {
  const baseStyles = "shadow-lg p-4 rounded-lg overflow-hidden transition-all duration-200";
  const variantStyles = {
    default: "bg-[#20818e] text-white hover:shadow-xl",
    blue: "bg-[#CAF0F8] text-[#03045E] hover:bg-[#ADE8F4]",
    yellow: "bg-[#FFB703] text-white hover:bg-[#FB8500]",
    pink: "bg-[#F07167] text-white hover:bg-[#D64B47]",
  };

  return (
    <div className={`${baseStyles} ${variantStyles[variant]} ${className}`}>
      {children}
    </div>
  );
};

export default PixelCard;
