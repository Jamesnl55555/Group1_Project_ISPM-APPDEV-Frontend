import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import Menu from "@/Components/Menu";
import ResponsiveNavLink from "@/Components/ResponsiveNavLink";
import axios from "@/api/axios";

export default function AuthenticatedLayout({ header, children }) {
  const [user, setUser] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(true); // Start open on desktop
  const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);
  const sidebarRef = useRef(null);

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

  useEffect(() => {
    const handleMouseMove = (event) => {
      if (!sidebarRef.current) return;
      // Only close sidebar on mousemove if window is small (mobile)
      if (window.innerWidth >= 1024) return; // Keep sidebar open on desktop
      
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
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar overlay (for clicking outside) */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        ref={sidebarRef}
        className={`fixed top-0 left-0 h-full bg-[#4b2e17] text-white w-56 transform transition-transform duration-300 z-40 flex flex-col justify-between ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div>
          <div className="flex items-center justify-between px-4 py-6 border-b border-[#5c3c21]">
            <img src="/images/2.png" alt="Logo" className="h-20 w-auto mx-auto" />
            <button onClick={() => setSidebarOpen(false)} className="p-1 hover:bg-[#5a3c24] rounded">
              ✕
            </button>
          </div>

          <nav className="mt-6 space-y-3 text-sm">
            <Link to="/dashboard" className="flex items-center gap-3 px-6 py-2 rounded transition-colors duration-200 hover:bg-[#5a3c24] w-full">
              📊 Dashboard
            </Link>
            <Link to="/inventory1" className="flex items-center gap-3 px-6 py-2 rounded transition-colors duration-200 hover:bg-[#5a3c24] w-full">
              📦 Products
            </Link>
            <Link to="/transaction-record" className="flex items-center gap-3 px-6 py-2 rounded transition-colors duration-200 hover:bg-[#5a3c24] w-full">
              💰 Transactions
            </Link>
            <Link to="/sales-report" className="flex items-center gap-3 px-6 py-2 rounded transition-colors duration-200 hover:bg-[#5a3c24] w-full">
              📑 Reports
            </Link>
          </nav>
        </div>

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

      {/* Main */}
      <div className="flex-1 flex flex-col">
        {/* Header Navbar */}
        <nav className="bg-white border-b border-gray-100" style={{ height: "7rem" }}>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-full">
            <div className="flex justify-between items-center h-full">
              <div className="flex items-center space-x-4 h-full">
                <Menu toggleMenu={() => setSidebarOpen(!sidebarOpen)} />
                <Link to="/dashboard">
                  <img src="/images/2.png" alt="Logo" style={{ height: "7rem" }} />
                </Link>
              </div>

              <div className="flex items-center space-x-6">
                <div className="hidden sm:flex space-x-8">
                  <button
                    className="text-[#4b2e17] font-medium text-[1.3rem] hover:text-[#916520ff] transition-colors cursor-pointer bg-none border-none p-0"
                    onClick={() => (window.location.href = "/dashboard")}
                  >
                    Dashboard
                  </button>

                  <button
                    style={{
                      fontSize: "1.3rem",
                      color: "#4b2e17",
                      fontWeight: "500",
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      transition: "color 0.2s",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "#916520ff")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "#4b2e17")}
                    onClick={() => {
                      const el = document.getElementById("quick-access");
                      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
                    }}
                  >
                    Quick Access
                  </button>
                </div>

                <Link to="/profile" className="flex items-center justify-center w-10 h-10" title="Profile">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#4b2e17" className="w-6 h-6">
                    <path d="M12 12c2.8 0 5-2.2 5-5s-2.2-5-5-5-5 2.2-5 5 2.2 5 5 5z" />
                    <path d="M4 20c0-3.3 2.7-6 6-6h4c3.3 0 6 2.7 6 6v1H4v-1z" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>

          {showingNavigationDropdown && (
            <div className="sm:hidden">
              <div className="space-y-1 pb-3 pt-2">
                <ResponsiveNavLink to="/dashboard">Dashboard</ResponsiveNavLink>
              </div>
              <div className="border-t border-gray-200 pb-1 pt-4">
                <div className="px-4">
                  <div className="text-base font-medium text-gray-800">{user.name}</div>
                  <div className="text-sm font-medium text-gray-500">{user.email}</div>
                </div>
                <div className="mt-3 space-y-1">
                  <ResponsiveNavLink to="/profile">Profile</ResponsiveNavLink>
                  <button
                    onClick={async () => {
                      try {
                        await axios.post("/logout");
                        window.location.href = "/login";
                      } catch (error) {
                        console.error("Logout failed:", error);
                      }
                    }}
                  >
                    Log Out
                  </button>
                </div>
              </div>
            </div>
          )}
        </nav>

        {/* Optional page header */}
        {header && (
          <header className="bg-white shadow">
            <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">{header}</div>
          </header>
        )}

        {/* Main content */}
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}
