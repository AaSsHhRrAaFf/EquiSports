import React from "react";
import Navbar from "./components/shared/Navbar";
import Footer from "./components/shared/Footer";
import { Outlet } from "react-router-dom";
import Home from "./pages/Home";
import { AuthProvider } from "./contexts/AuthContext";

const App = () => {
  return (
    <>
      <AuthProvider>
        <Navbar />
        <main className="flex-grow">
          <Outlet /> {/* Uncomment this if you want to render nested routes */}
        </main>
        <Footer />
      </AuthProvider>
    </>
  );
};
export default App;
