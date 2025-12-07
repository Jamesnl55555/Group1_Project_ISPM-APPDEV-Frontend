import React from "react";

export default function ActionButton({ color, hover, children, onClick }) {
  return (
    <button
      onClick={onClick}
      className="p-1 rounded transition-colors flex items-center justify-center text-white"
      style={{ backgroundColor: color }}
      onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = hover)}
      onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = color)}
    >
      {children}
    </button>
  );
}
