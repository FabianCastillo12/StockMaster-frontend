import "../../../styles/dashboard.css";
import "../../../styles/user.css";

export default function UserLayout({ children }) {
  return (
    <div id="dashboard-container">
      <div id="main-content">
        <main >
          <div className="container mx-auto py-8">{children}</div>
        </main>
      </div>
    </div>
  );
}
