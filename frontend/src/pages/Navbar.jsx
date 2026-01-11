import React, { useEffect, useState, useRef } from "react";
import { AiOutlineClose, AiOutlineMenu, AiOutlineMoon } from "react-icons/ai";
import { BiUser, BiSun } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  const [theme, setTheme] = useState("");
  const [nav, setNav] = useState(false);
  const handleNav = () => {
    setNav(!nav);
  };

  // Persisted theme: toggles the `dark` class on <html> so Tailwind dark variants apply site-wide
  const [dark, setDark] = useState(false);

  // Initialize theme from localStorage or system preference
  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (
      saved === "dark" ||
      (!saved &&
        window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      setTheme("dark");
      setDark(true);
      document.documentElement.classList.add("dark");
    } else {
      setTheme("");
      setDark(false);
      document.documentElement.classList.remove("dark");
    }
  }, []);

  // Apply/remove `dark` class when theme state changes and persist selection
  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
      setDark(true);
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
      setDark(false);
    }
  }, [theme]);

  const handleDark = (e) => {
    // If the click originated from inside the button, ignore here (the button handles the intent).
    if (
      e &&
      e.target &&
      typeof e.target.closest === "function" &&
      e.target.closest("button")
    )
      return;
    // toggle theme value which triggers effect above
    setTheme((prev) => (prev === "dark" ? "" : "dark"));
  };
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    fetchUser();
  }, []);
  const fetchUser = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/auth/getUserDetails",
        {
          withCredentials: true,
        }
      );
      setUser(response.data);
    } catch (error) {}
  };
  const handleLogout = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/logout",
        {},
        {
          withCredentials: true,
        }
      );
      navigate("/login");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };
  return user ? (
    <div
      className={`${theme ? "dark" : ""} 
    fixed top-0 left-0 w-full z-50
    bg-white/10 dark:bg-black/90

    border-b border-white/20 dark:border-black/60
    text-black dark:text-white
  `}
    >
      <div className="z-50 bg-transparent flex px-4 h-16 max-w-[1240px] mx-auto justify-between items-center">
        <ul className="pb-4 md:flex">
          <li className="p-2">
            <h1 className=" text-lg font-bold text-blue-600 pl-3">Vendoor</h1>
          </li>
          <li className="p-2 pt-3 hidden md:flex text-sm">Home</li>
          <li className="p-2 pt-3 hidden md:flex text-sm">Explore</li>
        </ul>
        <div className="md:hidden flex justify-center items-center pb-3">
          <div
            onClick={handleDark}
            className="border-rounded-full p-2 cursor-pointer"
          >
            {dark ? (
              <button
                className="pt-2"
                onClick={() => {
                  setTheme("");
                }}
              >
                {" "}
                <BiSun
                  size={45}
                  className="hover:bg-amber-500 border-transparent p-3 rounded-full text-black dark:text-white"
                />{" "}
              </button>
            ) : (
              <button
                className="pt-2"
                onClick={() => {
                  setTheme("dark");
                }}
              >
                {" "}
                <AiOutlineMoon
                  size={45}
                  className="hover:bg-amber-500 border-transparent p-3 rounded-full text-black dark:text-white"
                />{" "}
              </button>
            )}
          </div>
          <div onClick={handleNav} className="  md:hidden">
            {nav ? (
              <AiOutlineClose size={15} />
            ) : (
              <AiOutlineMenu
                size={40}
                className="border-transparent p-3 rounded-full text-black dark:text-white"
              />
            )}
          </div>
        </div>
        <ul className="p-4 pt-2 justify-between items-center pb-9.5 hidden md:flex">
          <li className="">
            <div className="border-rounded-full p-2 cursor-pointer">
              {dark ? (
                <button
                  aria-label="Toggle dark mode"
                  onClick={(e) => {
                    e.stopPropagation();
                    setTheme("");
                  }}
                >
                  <BiSun
                    size={45}
                    className="hover:bg-amber-500 border-transparent p-3 p rounded-full text-black dark:text-white"
                  />
                </button>
              ) : (
                <button
                  aria-label="Toggle dark mode"
                  onClick={(e) => {
                    e.stopPropagation();
                    setTheme("dark");
                  }}
                >
                  <AiOutlineMoon
                    size={45}
                    className="dark:text-white hover:bg-amber-500 border-transparent p-3 rounded-full text-black"
                  />
                </button>
              )}
            </div>
          </li>
          <li className="relative">
            <div
              ref={menuRef}
              className="relative"
              onMouseEnter={() => setOpen(true)}
            >
              {/* Trigger button */}
              <button onClick={() => setOpen((prev) => !prev)}>
                <BiUser size={25} className="cursor-pointer" />
              </button>

              {/* Dropdown */}
              {open && (
                <div
                  className="
                      absolute right-0 mt-2 w-64 rounded-xl bg-white
                      transition-all duration-200 p-3 pr-4 space-y-3 z-50 whitespace-nowrap
                      dark:bg-zinc-950
                    "
                  onMouseEnter={() => setOpen(true)}
                  onMouseLeave={() => setOpen(false)}
                >
                  <a className="block text-gray-700 dark:hover:text-white dark:text-gray-100 cursor-pointer">
                    Dashboard
                  </a>
                  <a className="block text-gray-700 dark:hover:text-white dark:text-gray-100 cursor-pointer">
                    Returns
                  </a>
                  <a
                    onClick={handleLogout}
                    className="block text-gray-700 dark:hover:text-white dark:text-gray-100 cursor-pointer border-t pt-2 mt-2"
                  >
                    <Link to="/login">Log out</Link>
                  </a>
                </div>
              )}
            </div>
          </li>
        </ul>
        <div
          className={
            nav
              ? "fixed left-0 top-0 w-[60%] h-full border-r border-r-gray-900 bg-white text-black dark:bg-zinc-900 dark:text-white ease-in-out duration-500"
              : "fixed -left-full ease-in-out duration-500"
          }
        >
          <ul className="uppercase p-2">
            <li className="p-2 border-b border-gray-600">Home</li>
            <li className="p-2 border-b border-gray-600">Explore</li>
            <li className="p-2 border-b border-gray-600">Dashboard</li>
            <li className="p-2 border-b border-gray-600">
              <button onClick={handleLogout}>
                {" "}
                <Link to="/login">Log out</Link>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  ) : (
    <div
      className={`${theme ? "dark" : ""} 
    fixed top-0 left-0 w-full z-50
    bg-white/10 dark:bg-black/90

    border-b border-white/20 dark:border-black/60
    text-black dark:text-white
  `}
    >
      <div className="z-50 bg-transparent flex px-4 h-16 max-w-[1240px] mx-auto justify-between items-center">
        <ul className="pb-4 md:flex">
          <li className="p-2">
            <h1 className=" text-lg font-bold text-blue-600 pl-3">Vendoor</h1>
          </li>
          <li className="p-2 pt-3 hidden md:flex text-sm">Home</li>
          <li className="p-2 pt-3 hidden md:flex text-sm">Explore</li>
        </ul>
        <div className="md:hidden flex justify-center items-center pb-3">
          <div
            onClick={handleDark}
            className="border-rounded-full p-2 cursor-pointer"
          >
            {dark ? (
              <button
                className="pt-2"
                onClick={() => {
                  setTheme("");
                }}
              >
                {" "}
                <BiSun
                  size={45}
                  className="hover:bg-amber-500 border-transparent p-3 rounded-full text-black dark:text-white"
                />{" "}
              </button>
            ) : (
              <button
                className="pt-2"
                onClick={() => {
                  setTheme("dark");
                }}
              >
                {" "}
                <AiOutlineMoon
                  size={45}
                  className="hover:bg-amber-500 border-transparent p-3 rounded-full text-black dark:text-white"
                />{" "}
              </button>
            )}
          </div>
          <div onClick={handleNav} className="  md:hidden">
            {nav ? (
              <AiOutlineClose size={15} />
            ) : (
              <AiOutlineMenu
                size={40}
                className="border-transparent p-3 rounded-full text-black dark:text-white"
              />
            )}
          </div>
        </div>
        <ul className="p-4 pt-2 justify-between items-center pb-9.5 hidden md:flex">
          <li className="pr-4">
            <div className="border-rounded-full p-2 cursor-pointer">
              {dark ? (
                <button
                  aria-label="Toggle dark mode"
                  onClick={(e) => {
                    e.stopPropagation();
                    setTheme("");
                  }}
                >
                  <BiSun
                    size={45}
                    className="hover:bg-amber-500 border-transparent p-3 rounded-full text-black dark:text-white"
                  />
                </button>
              ) : (
                <button
                  aria-label="Toggle dark mode"
                  onClick={(e) => {
                    e.stopPropagation();
                    setTheme("dark");
                  }}
                >
                  <AiOutlineMoon
                    size={45}
                    className="dark:text-white hover:bg-amber-500 border-transparent p-3 rounded-full text-black"
                  />
                </button>
              )}
            </div>
          </li>
          <li className="pb-2">
            <button className="border border-blue-600 rounded-lg bg-blue-600 text-white py-1 px-3 ">
              {" "}
              <Link to="/login">Sign In</Link>{" "}
            </button>
          </li>
        </ul>
        <div
          className={
            nav
              ? "fixed left-0 top-0 w-[60%] h-full border-r border-r-gray-900 bg-white text-black dark:bg-zinc-900 dark:text-white ease-in-out duration-500"
              : "fixed -left-full ease-in-out duration-500"
          }
        >
          <ul className="uppercase p-4">
            <li className="p-4 border-b border-gray-600">Home</li>
            <li className="p-4 border-b border-gray-600">Explore</li>
            <li className="p-4 border-b border-gray-600">Dashboard</li>
            <li className="p-4 border-b border-gray-600">
              <Link to="/login">Log in</Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
