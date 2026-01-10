import React from "react";
import Navbar from "./Navbar";

const Home = () => {
  return (
    <div>
      <Navbar />
      <div
        className={`
    mt-24 w-full
    bg-white/10 dark:bg-black/20
    backdrop-blur-lg
    border-b border-white/20 dark:border-white/10
    text-black dark:text-white py-24 px-4
  `}
      >
        <h1 className="text-6xl font-bold text-center ">
          EVERYTHING YOU NEED
          <span className="block">ON CAMPUS - DELIVERED FAST</span>
        </h1>
        <p className="text-center mt-10 text-lg">
          Discover local vendors, browse products, and order directly via
          WhatsApp. Your campus marketplace made simple.
        </p>
      </div>
    </div>
  );
};

export default Home;
