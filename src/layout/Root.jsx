import { Outlet } from "react-router-dom";
import Header from "../components/ui/Header";
import Footer from "../components/ui/Footer";
import { Toaster } from "react-hot-toast";

const Root = () => {
  return (
    <div className="min-h-screen max-w-7xl mx-auto relative">
      <Toaster />
      <Header />
      <div className="max-w-7xl mx-auto">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default Root;
