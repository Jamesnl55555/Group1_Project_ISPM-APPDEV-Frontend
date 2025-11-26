export default function Menu({ toggleMenu }) {
  return (
    <button
      onClick={toggleMenu}
      title="Menu"
      aria-label="Toggle menu"
      className="cursor-pointer p-2 rounded bg-transparent border-none relative z-50"
    >
      <div className="flex flex-col justify-center items-center gap-1">
        <span className="block w-5 h-0.5 bg-gray-700 rounded-sm"></span>
        <span className="block w-5 h-0.5 bg-gray-700 rounded-sm"></span>
        <span className="block w-5 h-0.5 bg-gray-700 rounded-sm"></span>
      </div>
    </button>
  );
}
