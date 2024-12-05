import React from "react";
import Navbar from "./components/shared/Navbar";
import Footer from "./components/shared/Footer";
import { Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import { AuthProvider } from "./contexts/AuthContext";

const App = () => {
  return (
    <>
      <AuthProvider>
        <Navbar />
        <main className="flex-grow">
          <Outlet />
        </main>
        <Footer />
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 3000,
            style: {
              background: "#363636",
              color: "#fff",
            },
          }}
        />
      </AuthProvider>
    </>
  );
};
export default App;
