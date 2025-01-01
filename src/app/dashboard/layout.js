import NavbarTop from "./components/navbarTop";
import Navbar from "./components/navbar";
import "../../styles/dashboard.css";

export default function DashboardLayout({ children }) {
  return (
    <div className="flex flex-1 w-full">
      <div className=" hidden lg:block fixed top-0 left-0 w-[5rem] bg-[#171821] h-screen border-r-[1px] border-white/10 z-[9001]">
        <Navbar />
      </div>

      <div className="w-full lg:ml-[5rem]">
        <div className="">
          <NavbarTop />
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
}
