import { Inter } from "next/font/google";
import "./globals.css";
import SessionAuthProvider from "@/context/SessionAuthProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "StockMaster",
  description: "Sistema de inventario inteligente",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="">
        <SessionAuthProvider>{children}</SessionAuthProvider>
      </body>
    </html>
  );
}
