import "../../../styles/dashboard.css";

export default function UserLayout({ children }) {
  return (
    <div id="dashboard-container">
      <div className="p-5">{children}</div>
    </div>
  );
}
