import { twMerge } from "tailwind-merge";

const Button = ({ children, className = "", onClick, type = "button" }) => {
  return (
    <button
      type={type}
      className={`px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export { Button }; 