import "../../../styles/dashboard.css";

export default function DashboardLayout({ children }) {
  return (
    <div id="dashboard-container">
      <div className="p-5">{children}</div>
    </div>
  );
}