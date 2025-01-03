"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { House, UserCog, PackageSearch, Boxes, ContactRound, ClipboardList, EllipsisVertical } from "lucide-react";
import "../../../styles/navbar.css";
import { useStore } from "@/stores/autenticacion";
import { useSession } from "next-auth/react";

const Navbar = ({ setAbrirNavbar, abrirNavbar }) => {
  const { data: session } = useSession();
  const user = useStore((state) => state.user);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <nav className="navbar-container">
      <ul>
        <li>
          <Link href="/dashboard/home">
            {isClient && <House size={25} />}
            <span>Home</span>
          </Link>
        </li>

        {isClient && session?.user.rol === "admin" && (
          <li>
            <Link href="/dashboard/user">
              <UserCog size={29} />
              <span>Usuarios</span>
            </Link>
          </li>
        )}

        <li>
          <Link href="/dashboard/products">
            {isClient && <PackageSearch size={25} />}
            <span>Productos</span>
          </Link>
        </li>
        
        <li>
          <Link href="/dashboard/stock">
            {isClient && <Boxes size={25} />}
            <span>Stock</span>
          </Link>
        </li>
        <li>
          <Link href="/dashboard/clientes">
            {isClient && <ContactRound size={25} />} <span>Clientes</span>
          </Link>
        </li>
        <li>
          <Link href="/dashboard/orders">
            {isClient && <ClipboardList size={25} />}
            <span>Pedidos</span>
          </Link>
        </li>
        
        
      </ul>
      {abrirNavbar && (
        <div
          onClick={() => setAbrirNavbar(false)}
          className="block bg-white p-2 rounded-full absolute bottom-10 -right-4 shadow-md lg:hidden"
        >
          <EllipsisVertical size={20} />
        </div>
        
      )}
    </nav>
  );
};

export default Navbar;