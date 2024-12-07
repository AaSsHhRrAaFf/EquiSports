import React from "react";
import Navbar from "./components/shared/Navbar";
import Footer from "./components/shared/Footer";
import { Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import { AuthProvider } from "./contexts/AuthContext";
import { ThemeProvider } from "./contexts/ThemeContext";

const App = () => {
  return (
    <>
      <ThemeProvider>
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
      </ThemeProvider>
    </>
  );
};
export default App;
