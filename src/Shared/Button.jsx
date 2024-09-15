// import React from 'react';

const Button = ({ name, onClick, type = "button", className = "" }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`px-4 py-2 bg-pink-400 text-white rounded-md hover:bg-white hover:text-black focus:outline-none focus:ring-2 focus:ring-pink-300 ${className}`}
    >
      {name}
    </button>
  );
};

export default Button;
