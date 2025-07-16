import React, { useEffect, useState } from "react";

function Slider({ children }) {
  const [message, setMessage] = useState("How much do you love me?");
  const [value, setValue] = useState(0);
  const [glow, setGlow] = useState(false);

  useEffect(() => {
    if (value === 100) {
      setMessage("Hmmmmm...");
      const timeout = setTimeout(() => {
        setMessage("NO I LOVE YOU MORE!!!! ❤️😤");
        setGlow(true);
      }, 1000);
      return () => clearTimeout(timeout);
    } else {
      updateMessage(value);
      setGlow(false);
    }
  }, [value]);

  const updateMessage = (val) => {
    if (val === 0) "";
    else if (val < 20) setMessage("Just a lil bit? 🥹");
    else if (val < 40) setMessage("Okay that's cute 😚");
    else if (val < 60) setMessage("Aww we're getting warmer 💖");
    else if (val < 80) setMessage("You're almost there! 🥰");
    else if (val < 100) setMessage("Sooo much love 💞");
  };

  return (
    <div className="min-h-screen min-w-screen bg-pink-50 flex items-center justify-center px-4">
      <div
        className={`bg-white p-8 rounded-2xl text-center w-full max-w-md transition-shadow duration-500 ${
          glow ? "shadow-pink-400 shadow-2xl" : "shadow-lg"
        }`}
      >
        <h1 className="text-2xl md:text-3xl font-bold text-pink-600 mb-6">
          {message}
        </h1>

        <input
          type="range"
          min="0"
          max="100"
          value={value}
          onChange={(e) => setValue(Number(e.target.value))}
          className="w-full accent-pink-500 h-2 rounded-lg mb-4"
        />

        <p className="text-lg text-gray-700 font-medium">{value}% 💗</p>

        {/* Button will appear here */}
        <div className="mt-6">{children}</div>
      </div>
    </div>
  );
}

export default Slider;
