
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import ChatbotButton from "./ChatbotButton";

const Layout = () => {
  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <div className="fixed inset-0 -z-10 h-full w-full bg-white [background:radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]" />
      <Navbar />
      <main className="flex-1 container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Outlet />
      </main>
      <ChatbotButton />
      <Footer />
    </div>
  );
};

export default Layout;
