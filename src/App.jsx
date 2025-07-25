import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import Slider from "./Slider.jsx";
import Game from "./Game.jsx";
import SplashScreen from "./SplashScreen.jsx";
import SplashScreenVideo from "./SplashScreenVideo.jsx";
import { useState, useEffect } from "react";

function Home() {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <Slider>
        <button
          onClick={() => navigate("/themes")}
          className="px-6 py-3 bg-pink-500 text-white text-lg rounded hover:bg-pink-600 transition font-bold"
        >
          Game Time 🎮
        </button>
      </Slider>
    </div>
  );
}

function GameWithSplash() {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 750);

    return () => clearTimeout(timer);
  }, []);

  return showSplash ? <SplashScreen /> : <Game />;
}

function ThemeSelect() {
  const navigate = useNavigate();

  const startGameWithTheme = (theme) => {
    navigate(`/game?theme=${theme}`);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-200 p-4 press-start-2p-regular">
      <h1 className="text-2xl font-bold mb-6 text-pink-600">Choose a Theme</h1>
      <div className="flex gap-4 flex-wrap justify-center">
        <button
          onClick={() => startGameWithTheme("animals")}
          className="px-4 py-2 bg-pink-500 text-white rounded hover:bg-pink-600"
        >
          🐶 Animal Theme
        </button>
        <button
          onClick={() => startGameWithTheme("daph")}
          className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600"
        >
          👧 Daph Theme
        </button>
        <button
          onClick={() => startGameWithTheme("mints")}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          🍃 Mints Theme
        </button>
        <button
          onClick={() => startGameWithTheme("1234")}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          🔢 1234 Theme
        </button>
      </div>
    </div>
  );
}

function App() {
  const [showSplash, setShowSplash] = useState(true);

 /* useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), 2000);
    return () => clearTimeout(timer);
  }, []);*/

  if (showSplash) return <SplashScreenVideo onEnd={() => setShowSplash(false)} />;

  return (
    <Router basename="/dodo-app">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/themes" element={<ThemeSelect />} />
        <Route path="/game" element={<GameWithSplash />} />
      </Routes>
    </Router>
  );
}

export default App;
