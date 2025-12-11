import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "@/api/axios";
import Import from "@/Components/Import";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { MantineProvider } from "@mantine/core"; 
import InventoryAlertComponent from "@/Components/InventoryAlertComponent";
import InventoryReportComponent from "@/Components/InventoryReportComponent";
import RecentTransactionsComponent from "@/Components/RecentTransactionsComponent";
import SalesReportComponent from "@/Components/SalesReportComponent";
import Loading from "@/Pages/Loading";
export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [user_name, setfetchedUser] = useState("None");
  const [total_amount, setTotalAmount] = useState(0);
  const [total_quantity, setTotalQuantity] = useState(0);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        await axios.get("/sanctum/csrf-cookie");
        const response = await axios.get("/api/user");
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching user:", error);
      } finally {
        setLoading(false);
      }
    };

    const fetchLatestTransaction = async () => {
      try {
        const response = await axios.get("/api/latest-transaction");
        if (response.data.success) {
          setTotalQuantity(response.data.total_quantity);
          setTotalAmount(response.data.total_amount);
          setfetchedUser(response.data.user_name);
        }
      } catch (error) {
        console.error("Error fetching latest transaction:", error);
      }
    };

    fetchUser();
    fetchLatestTransaction();
  }, []);
  if (!user) return <Loading />;
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <AuthenticatedLayout user={user}
        header={
          <h1 style={{
            marginLeft: "10.5rem",
            marginTop: "1rem",
            marginBottom: "1rem",
            fontSize: "2.25rem",
            fontWeight: "bold",
            color: "#111827",
          }}>
            Welcome, {user?.name ? user.name.toUpperCase() : "[USERNAME]"}!
          </h1>
        }
      >
        <div style={{ paddingTop: "0.25rem" }}>
          <div style={{ maxWidth: "96rem", margin: "0 auto", padding: "0 9rem" }}>

            {/* Dashboard Cards */}
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              gridAutoRows: "auto",
              gap: "0.75rem",
              marginTop: "-1rem",
            }}>
              <DashboardCard title="Sales Report" link="/sales-report" image="/images/3.png">
                <div style={{ minHeight: "260px" }}>
                  <SalesReportComponent />
                </div>
              </DashboardCard>

              <DashboardCard title="Inventory Alert!" link="/inventory1" image="/images/5.png">
                <div style={{ minHeight: "260px" }}>
                  <InventoryAlertComponent />
                </div>
              </DashboardCard>

              <DashboardCard title="Recent Transactions" link="/transaction-rec-sec" image="/images/4.png">
                <div style={{ minHeight: "260px" }}>
                  <RecentTransactionsComponent />
                </div>
              </DashboardCard>

              <DashboardCard title="Inventory" link="/inventory1" image="/images/5.png">
                <div style={{ minHeight: "260px" }}>
                  <InventoryReportComponent />
                </div>
              </DashboardCard>
            </div>

            {/* Import Excel Section */}
            <div style={{ marginTop: "2.5rem" }}>
              <h2 style={{ fontSize: "1.25rem", fontWeight: 600, color: "#4b2e17", marginBottom: "0.25rem" }}>
                Import Excel
              </h2>
              <p style={{ color: "#374151", fontSize: "0.875rem", marginBottom: "1rem" }}>
                Upload your Excel file to update products and transactions.
              </p>
              <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "1.5rem" }}>
                <div style={{
                  background: "linear-gradient(to bottom, #f9e7d0, #e8d4b8)",
                  borderRadius: "1rem",
                  border: "1px solid black",
                  padding: "2rem",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  transition: "box-shadow 0.3s",
                }}
                onMouseEnter={(e) => e.currentTarget.style.boxShadow = "8px 8px 18px rgba(0,0,0,0.35)"}
                onMouseLeave={(e) => e.currentTarget.style.boxShadow = "none"}>
                  <Import />
                </div>
              </div>
            </div>

            {/* Quick Access Section */}
            <div id="quick-access" style={{ marginTop: "2.5rem" }}>
              <h2 style={{ fontSize: "1.25rem", fontWeight: 600, color: "#4b2e17", marginBottom: "1rem" }}>
                Quick Access
              </h2>
              <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "left", gap: "3rem", textAlign: "center" }}>
                {[ 
                  { img: "/images/6.png", label: "Make\nTransaction", href: "/create-transaction" },
                  { img: "/images/7.png", label: "Transaction\nHistory", href: "/transaction-record" },
                  { img: "/images/8.png", label: "Add Product", href: "/add-product" },
                  { img: "/images/9.png", label: "Generate\nReport", href: "/sales-report" },
                ].map((item) => (
                  <Link key={item.href} to={item.href} style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    cursor: "pointer",
                    transition: "transform 0.3s",
                    textDecoration: "none",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "scale(1.05)";
                    e.currentTarget.querySelector("span").style.fontWeight = "600";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "scale(1)";
                    e.currentTarget.querySelector("span").style.fontWeight = "300";
                  }}>
                    <div style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: "5rem",
                      height: "5rem",
                      borderRadius: "9999px",
                      background: "linear-gradient(to bottom, #f3dfc3, #d7bfa0)",
                      border: "1px solid #4b2e17",
                      transition: "box-shadow 0.3s",
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.boxShadow = "5px 5px 15px rgba(75,46,23,0.6)"}
                    onMouseLeave={(e) => e.currentTarget.style.boxShadow = "none"}>
                      <img src={item.img} alt="icon" style={{ width: "2.5rem", height: "2.5rem", objectFit: "contain" }} />
                    </div>
                    <span style={{
                      marginTop: "0.5rem",
                      fontSize: "0.875rem",
                      color: "#000",
                      fontWeight: 300,
                      textAlign: "center",
                      whiteSpace: "pre-line",
                      transition: "font-weight 0.2s",
                    }}>{item.label}</span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Recent Activity */}
            <div style={{ marginTop: "3rem" }}>
              <h2 style={{ fontSize: "1.25rem", fontWeight: 600, color: "#4b2e17", marginBottom: "1rem" }}>
                Recent Activity
              </h2>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1.5rem" }}>
                {user_name ? [
                  { label: "Total # of product sold", value: total_quantity },
                  { label: "Total Cost of Sales", value: total_amount },
                  { label: "Cashier", value: user_name },
                ].map((item) => (
                  <div key={item.label} style={{
                    background: "linear-gradient(to bottom, #f9e7d0, #e8d4b8)",
                    textAlign: "center",
                    height: "10rem",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    borderRadius: "1rem",
                    border: "1px solid black",
                    transition: "box-shadow 0.3s",
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.boxShadow = "10px 10px 15px rgba(0,0,0,0.3)"}
                  onMouseLeave={(e) => e.currentTarget.style.boxShadow = "none"}>
                    <h3 style={{ fontSize: "2.25rem", fontWeight: 800, color: "#4b2e17" }}>{item.value}</h3>
                    <p style={{ fontSize: "1rem", marginTop: "0.75rem", fontWeight: 500, color: "#4b2e17" }}>{item.label}</p>
                  </div>
                )) : <p>No recent transactions.</p>}
              </div>
            </div>

          </div>
        </div>
      </AuthenticatedLayout>
    </MantineProvider>
  );
}

/* Clickable DashboardCard with hover image */
function DashboardCard({ title, link, image, children, minHeight = "260px" }) {
  const [hover, setHover] = useState(false);

  return (
    <Link to={link} style={{ textDecoration: "none" }}>
      <div
        style={{
          position: "relative",
          backgroundColor: "white",
          borderRadius: "1rem",
          border: "1px solid black",
          overflow: "hidden",
          transition: "box-shadow 0.3s",
          minHeight,
          cursor: "pointer",
        }}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        {/* Main content */}
        <div style={{ padding: "1.5rem", position: "relative", zIndex: 1 }}>
          <h2 style={{ fontSize: "1.125rem", fontWeight: "bold", color: "#1f2937" }}>{title}</h2>
          <div style={{ marginTop: "0.75rem", minHeight: "200px" }}>{children}</div>
        </div>

        {/* Hover overlay */}
        {hover && (
          <div
            style={{
              position: "absolute",
              inset: 0,
              zIndex: 10,
            }}
          >
            <img
              src={image}
              alt={title}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                borderRadius: "1rem",
                border: "1px solid black",
                pointerEvents: "none",
              }}
            />
          </div>
        )}
      </div>
    </Link>
  );
}
