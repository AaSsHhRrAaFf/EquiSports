import React from "react";
import Navbar from "./components/shared/Navbar";
import Footer from "./components/shared/Footer";

const App = () => {
  return (
    <>
      <Navbar />
      {/* <main className="flex-grow">
        <Outlet />
      </main> */}
      <Footer />
    </>
  );
};
export default App;
