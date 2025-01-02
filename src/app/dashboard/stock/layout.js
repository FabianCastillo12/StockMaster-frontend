import "../../../styles/dashboard.css";

export default function StockLayout({ children }) {
  return (
    <div id="dashboard-container">
      <div className="container mx-auto">{children}</div>
    </div>
  );
}
