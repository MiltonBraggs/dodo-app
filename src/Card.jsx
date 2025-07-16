const base = import.meta.env.BASE_URL;

export default function Card({ value, flipped, onClick }) {
  return (
    <div
      onClick={onClick}
      className="w-20 h-20 bg-white border rounded flex items-center justify-center cursor-pointer"
    >
      {flipped ? (
        <img
          src={`${base}images/${value}`}
          alt="card"
          className="w-full h-full object-contain"
        />
      ) : (
        <div className="w-full h-full bg-pink-200 rounded" />
      )}
    </div>
  );
}
