export default function SplashScreen() {
  const randomImage = Math.floor(Math.random() * 6) + 1; // Random number between 1 and 6
  const imagePath = `./images/1234-${randomImage}.jpg`; // Construct

  return (
    <div className="flex items-center justify-center h-screen bg-white">
      <img src={imagePath} alt="Logo" className="w-40 h-40 animate-pulse" />
    </div>
  );
}