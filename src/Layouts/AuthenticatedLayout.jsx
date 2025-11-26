import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import Menu from "@/Components/Menu";
import ResponsiveNavLink from "@/Components/ResponsiveNavLink";
import axios from "@/api/axios";

export default function AuthenticatedLayout({ header, children }) {
  const [user, setUser] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(true); 
  const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);
  const sidebarRef = useRef(null);

  // Fetch user
  useEffect(() => {
    const fetchUser = async () => {
      try {
        await axios.get("/sanctum/csrf-cookie");
        const response = await axios.get("/api/user");
        setUser(response.data);
      } catch (error) {
        console.error("Failed to fetch user:", error);
      }
    };
    fetchUser();
  }, []);

  // Close sidebar on small screens when clicking outside
  useEffect(() => {
    const handleMouseMove = (event) => {
      if (!sidebarRef.current) return;
      if (window.innerWidth >= 1024) return; 
      const rect = sidebarRef.current.getBoundingClientRect();
      const outside =
        event.clientX < rect.left ||
        event.clientX > rect.right ||
        event.clientY < rect.top ||
        event.clientY > rect.bottom;
      if (outside) setSidebarOpen(false);
    };

    if (sidebarOpen) document.addEventListener("mousemove", handleMouseMove);
    else document.removeEventListener("mousemove", handleMouseMove);

    return () => document.removeEventListener("mousemove", handleMouseMove);
  }, [sidebarOpen]);

  if (!user) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="min-h-screen flex font-sans">
      {/* Sidebar overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        ref={sidebarRef}
        className={`fixed top-0 left-0 h-full w-56 bg-[#4b2e17] text-white flex flex-col justify-between transform transition-transform duration-300 z-40 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div>
          {/* Logo */}
          <div className="flex justify-center py-6">
            <img src="/images/2.png" alt="Logo" className="h-28 mt-12" />
          </div>

          {/* Sidebar links */}
          <nav className="mt-6 flex flex-col gap-2 text-base">
            {[
              { to: "/dashboard", label: "Dashboard", icon: "📊" },
              { to: "/inventory1", label: "Products", icon: "📦" },
              { to: "/transaction-record", label: "Transactions", icon: "💰" },
              { to: "/sales-report", label: "Reports", icon: "📑" },
            ].map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="flex items-center gap-3 px-6 py-2 rounded hover:bg-[#5a3c24] transition-colors duration-200"
              >
                {link.icon} {link.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Logout */}
        <div className="mb-6 px-6">
          <button
            onClick={async () => {
              try {
                await axios.post("/api/logout");
                window.location.href = "/login";
              } catch (error) {
                console.error("Logout failed:", error);
              }
            }}
            className="flex items-center gap-3 px-6 py-2 hover:bg-[#5a3c24] w-full text-left rounded"
          >
            ⏻ Log Out
          </button>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <nav className="bg-white border-b border-gray-100 h-28 flex items-center px-6">
          <div className="flex justify-between items-center w-full">
            {/* Left: Menu & Logo */}
            <div className="flex items-center gap-4">
              <div className="fixed top-4 left-4 z-50">
                {!sidebarOpen ? (
                  <Menu toggleMenu={() => setSidebarOpen(true)} />
                ) : (
                  <button
                    onClick={() => setSidebarOpen(false)}
                    className="p-2 bg-transparent text-white text-lg rounded"
                    title="Close menu"
                  >
                    ✕
                  </button>
                )}
              </div>

              <Link to="/dashboard">
                <img src="/images/2.png" alt="Logo" className="max-h-24 ml-24" />
              </Link>
            </div>

            {/* Right links */}
            <div className="flex items-center gap-6 mr-[-9rem]">
              {["Dashboard", "Quick Access"].map((label) => (
                <button
                  key={label}
                  className="text-[#4b2e17] font-medium text-lg transition-transform duration-200 hover:scale-105 hover:font-bold bg-none border-none p-0 cursor-pointer"
                  onClick={() => {
                    if (label === "Quick Access") {
                      const el = document.getElementById("quick-access");
                      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
                    } else {
                      window.location.href = "/dashboard";
                    }
                  }}
                >
                  {label}
                </button>
              ))}

              <Link to="/profile" className="flex items-center justify-center w-10 h-10" title="Profile">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#4b2e17" className="w-6 h-6">
                  <path d="M12 12c2.8 0 5-2.2 5-5s-2.2-5-5-5-5 2.2-5 5 2.2 5 5 5z" />
                  <path d="M4 20c0-3.3 2.7-6 6-6h4c3.3 0 6 2.7 6 6v1H4v-1z" />
                </svg>
              </Link>
            </div>
          </div>
        </nav>

        {/* Optional page header */}
        {header && (
          <header className="bg-white shadow-sm">
            <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">{header}</div>
          </header>
        )}

        {/* Main content */}
        <main className="flex-1 p-6">
          {children}
          <section id="quick-access" className="mt-12">
            {/* Quick Access content */}
          </section>
        </main>
      </div>
    </div>
  );
}
