import React from "react";
import Navbar from "./Navbar";
import { AiOutlineSearch } from "react-icons/ai";

const Home = () => {
  return (
    <div>
      <Navbar />
      <div
        className={`
    mt-16 w-full
    bg-white/10 dark:bg-black/90
    backdrop-blur-lg
    border-b border-white/20 dark:border-black/60
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
        <div className="mt-10 flex justify-center">
          <div className="w-1/2 flex items-center gap-4">
            <div className="relative flex-1">
              <AiOutlineSearch
                size={20}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400"
              />
              <input
                type="text"
                aria-label="Search vendors or products"
                placeholder="Search for Vendoor or Product"
                className="bg-gray-200 dark:bg-zinc-800 text-black dark:text-white placeholder-gray-500 dark:placeholder-gray-400 rounded-md px-10 py-2 w-full focus:outline-none hover:bg-gray-300 dark:hover:bg-zinc-700 transition"
              />
            </div>
            <button
              aria-label="Search"
              className="border rounded-md bg-blue-600 p-2 text-white hover:bg-blue-700 transition px-4"
            >
              Search
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
