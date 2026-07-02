// src/app/layout.js
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "./component/Navbar";
import Footer from "./component/Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const jakartaSans = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
});

export default function RootLayout({ children }) {
  return (
    <html 
      lang="en" 
      className={`${jakartaSans.variable} h-full antialiased`}
      suppressHydrationWarning 
    >
      <body className="min-h-full flex flex-col font-sans bg-slate-50/50">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <ToastContainer />
      </body>
    </html>
  );
}