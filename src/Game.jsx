import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Card from "./Card";

export default function Game() {
  const location = useLocation();
  const navigate = useNavigate();
  const audioRef = useRef(null);

  const theme = new URLSearchParams(location.search).get("theme") || "animals";

  const themeCards = {
    animals: [
      "Cat.jpg",
      "Dog.jpg",
      "Fish.jpg",
      "Fox.jpg",
      "Lion.jpg",
      "Tiger.jpg",
    ],
    daph: [
      "girl1.jpg",
      "girl2.jpg",
      "girl3.jpg",
      "girl4.jpg",
      "girl5.jpg",
      "girl6.jpg",
    ],
    mints: [
      "mint1.jpg",
      "mint2.jpg",
      "mint3.jpg",
      "mint4.jpg",
      "mint5.jpg",
      "mint6.jpg",
    ],
    1234: [
      "1234-1.jpg",
      "1234-2.jpg",
      "1234-3.jpg",
      "1234-4.jpg",
      "1234-5.jpg",
      "1234-6.jpg",
    ],
  };

  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [points, setPoints] = useState(0);
  const [timer, setTimer] = useState(60);
  const [gameOver, setGameOver] = useState(false);
  const [isChecking, setIsChecking] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [allMatched, setAllMatched] = useState(false);

  useEffect(() => {
  Object.values(themeCards).flat().forEach((img) => {
    const preloadImg = new Image();
    preloadImg.src = `${import.meta.env.BASE_URL}images/${img}`;
  });
}, []);

  // Background Music
  useEffect(() => {
    const audio = new Audio(`${import.meta.env.BASE_URL}bg-music.mp3`);

    audio.loop = true;
    audio.volume = 0.5;
    audioRef.current = audio;

    audio.play().catch((err) => console.log("Autoplay blocked", err));

    return () => {
      audio.pause();
      audio.currentTime = 0;
    };
  }, []);

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  useEffect(() => {
    const values = themeCards[theme] || themeCards["animals"];
    const doubled = [...values, ...values];
    const shuffled = doubled
      .sort(() => Math.random() - 0.5)
      .map((value, index) => ({
        id: index,
        value,
        flipped: false,
        matched: false,
      }));
    setCards(shuffled);
    setFlipped([]);
    setPoints(0);
    setTimer(60);
    setGameOver(false);
    setAllMatched(false);
  }, [theme]);

  useEffect(() => {
    if (gameOver) return;

    const countdown = setInterval(() => {
      setTimer((t) => {
        if (t <= 1) {
          clearInterval(countdown);
          setGameOver(true);
          return 0;
        }
        return t - 1;
      });
    }, 1000);

    return () => clearInterval(countdown);
  }, [gameOver]);

  useEffect(() => {
    if (flipped.length === 2) {
      setIsChecking(true);
      const [first, second] = flipped;

      if (cards[first].value === cards[second].value) {
        setPoints((p) => p + 100);
        const updated = cards.map((card, idx) =>
          idx === first || idx === second ? { ...card, matched: true } : card
        );
        setTimeout(() => {
          setCards(updated);
          setFlipped([]);
          setIsChecking(false);
        }, 800);
      } else {
        setTimeout(() => {
          const updated = cards.map((card, idx) =>
            idx === first || idx === second ? { ...card, flipped: false } : card
          );
          setCards(updated);
          setFlipped([]);
          setIsChecking(false);
        }, 800);
      }
    }
  }, [flipped]);

  useEffect(() => {
    if (cards.length > 0 && cards.every((card) => card.matched)) {
      setGameOver(true);
      setAllMatched(true);
      setPoints((prev) => prev + timer * 10);
    }
  }, [cards]);

  const handleFlip = (index) => {
    if (flipped.length >= 2 || cards[index].flipped || gameOver || isChecking)
      return;

    const updated = [...cards];
    updated[index].flipped = true;
    setCards(updated);
    setFlipped((prev) => [...prev, index]);
  };

  const handleRestart = () => {
    const values = themeCards[theme] || themeCards["animals"];
    const doubled = [...values, ...values];
    const shuffled = doubled
      .sort(() => Math.random() - 0.5)
      .map((value, index) => ({
        id: index,
        value,
        flipped: false,
        matched: false,
      }));
    setCards(shuffled);
    setFlipped([]);
    setPoints(0);
    setTimer(60);
    setGameOver(false);
    setAllMatched(false);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <h1 className="text-3xl font-bold mb-2">🧠 Memory Game</h1>
      <h2 className="text-lg text-gray-600 mb-2 capitalize">Theme: {theme}</h2>
      <p className="text-lg mb-1">Time Left: {timer}s</p>
      <p className="text-lg mb-4">Points: {points}</p>

      <button
        onClick={toggleMute}
        className="mb-4 px-3 py-1 bg-gray-300 rounded hover:bg-gray-400"
      >
        {isMuted ? "🔇 Muted" : "🔊 Playing"}
      </button>

      <div
        className={`grid grid-cols-4 gap-4 mb-6 transition-all duration-500 ${
          allMatched
            ? "border-4 border-pink-500 p-4 rounded-xl shadow-xl animate-pulse"
            : ""
        }`}
      >
        {cards.map((card, index) => (
          <Card
            key={card.id}
            value={card.value}
            flipped={card.flipped || card.matched}
            onClick={() => handleFlip(index)}
          />
        ))}
      </div>

      {gameOver && (
        <div className="text-xl font-semibold text-green-600 mb-4 animate-pulse text-center">
          Yaaaaay!! {allMatched ? "You matched all the cards!" : "Time's up!"}{" "}
          <br />
          You scored <span className="font-bold">{points}</span> point
          {points !== 1 ? "s" : ""}.
        </div>
      )}

      <div className="flex gap-4">
        <button
          onClick={handleRestart}
          className="px-4 py-2 bg-pink-500 text-white rounded hover:bg-pink-600"
        >
          🔁 Reset Game
        </button>
        <button
          onClick={() => navigate("/themes")}
          className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
        >
          ⬅ Go Back
        </button>
      </div>
    </div>
  );
}
