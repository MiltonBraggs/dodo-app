import React from "react";

export default function Card({ value, flipped, onClick }) {
  return (
    <div
      onClick={onClick}
      className={`w-20 h-20 md:w-28 md:h-28 border-2 rounded-lg shadow-md cursor-pointer transition-transform duration-300 flex items-center justify-center overflow-hidden ${
        flipped ? "bg-white" : "bg-pink-400"
      }`}
    >
      {flipped ? (
        <img
          src={`/images/${value}`}
          alt="card"
          className="w-full h-full object-cover"
        />
      ) : (
        <span className="text-2xl">❓</span>
      )}
    </div>
  );
}
