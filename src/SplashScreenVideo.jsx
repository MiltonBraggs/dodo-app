// SplashScreen.jsx
import { useEffect, useRef } from "react";

export default function SplashScreen({ onEnd }) {
  const videoRef = useRef();

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.play();
      video.addEventListener("ended", handleEnd);
    }

    function handleEnd() {
      if (onEnd) onEnd();
    }

    return () => {
      video?.removeEventListener("ended", handleEnd);
    };
  }, [onEnd]);

  return (
    <div className="fixed inset-0 bg-pink-300 z-50 flex items-center justify-center animate-pulse">
      <video
        ref={videoRef}
        src="./1234-1.mp4"
        className="w-70 h-70 object-cover"
        autoPlay
        playsInline
        muted
      />
    </div>
  );
}
