export default function Menu({ toggleMenu }) {
  return (
    <button
      onClick={toggleMenu}
      title="Menu"
      aria-label="Toggle menu"
      className="cursor-pointer p-2 rounded bg-transparent border-none relative z-[50]"
    >
      <div className="flex flex-col justify-center items-center gap-[4px]">
        <span className="block w-[20px] h-[2px] bg-[#374151] rounded"></span>
        <span className="block w-[20px] h-[2px] bg-[#374151] rounded"></span>
        <span className="block w-[20px] h-[2px] bg-[#374151] rounded"></span>
      </div>
    </button>
  );
}
