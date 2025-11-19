export default function Menu({ toggleMenu }) {
    return (
        <button 
            className="menu-icon cursor-pointer p-3 rounded hover:bg-gray-200 transition z-50 relative" 
            onClick={toggleMenu} 
            title="Menu"
            aria-label="Toggle menu"
        >
            <div className="flex flex-col justify-center items-center space-y-1.5">
                <span className="block w-6 h-0.5 bg-gray-700"></span>
                <span className="block w-6 h-0.5 bg-gray-700"></span>
                <span className="block w-6 h-0.5 bg-gray-700"></span>
            </div>
        </button>
    );
}
