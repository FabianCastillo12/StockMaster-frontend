import "../../../styles/dashboard.css";

export default function UserLayout({ children }) {
  return (
    <div id="dashboard-container">
      <div id="main-content">
        <main>
          <div className="container mx-auto px-6 py-8">{children}</div>
        </main>
      </div>
    </div>
  );
}
