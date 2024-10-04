import { NavLink } from "react-router-dom";
import Logo from "../assets/logo.png";
import {useAuthStore } from "../store/authStore"
import { toast } from "./Toast";
import { useEffect } from "react";

const Navbar = () => {

  const {logout} = useAuthStore();


  const logoutHandler = async () => {
    try {
      const responseMsg = await logout()
      toast.success(responseMsg)
    } catch (error) {
      toast.error(error)
    }
  }


  return (
    <nav className="bg-[#020d19] w-full h-20 font-mono fixed top-0 flex justify-start py-4 z-787">
      <div className="flex justify-around items-center gap-20 bg-[#141a24] text-[#d3d3d3] w-full py-4">
        {/* Logo Section */}
        <div className="flex justify-start gap-1 items-center">
          <img src={Logo} width="40px" alt="Logo" />
          <span className="font-thin text-lg">vortex</span>
        </div>

        {/* Navigation Links */}
        <ul className="flex justify-around gap-10">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? "text-[#ff9800] underline font-bold"
                  : "hover:underline hover:text-[#ff9800] font-normal"
              }
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/ctf"
              className={({ isActive }) =>
                isActive
                  ? "text-[#ff9800] underline font-bold"
                  : "hover:underline hover:text-[#ff9800] font-normal"
              }
            >
              CTF
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/addCTF"
              className={({ isActive }) =>
                isActive
                  ? "text-[#ff9800] underline font-bold"
                  : "hover:underline hover:text-[#ff9800] font-normal"
              }
            >
              Add CTF
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/blog"
              className={({ isActive }) =>
                isActive
                  ? "text-[#ff9800] underline font-bold"
                  : "hover:underline hover:text-[#ff9800] font-normal"
              }
            >
              Blogs
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                isActive
                  ? "text-[#ff9800] underline font-bold"
                  : "hover:underline hover:text-[#ff9800] font-normal"
              }
            >
              About us
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/contact"
              className={({ isActive }) =>
                isActive
                  ? "text-[#ff9800] underline font-bold"
                  : "hover:underline hover:text-[#ff9800] font-normal"
              }
            >
              Contact Us
            </NavLink>
          </li>
        </ul>

        <div>
          <NavLink
            onClick={logoutHandler}
            className="text-cyan-500 hover:text-cyan-600 focus:outline-none focus:text-cyan-200 disabled:text-cyan-300 py-1 px-2 rounded-lg text-md border-2 border-[#ff9800] shadow-lg"
          >
            Logout
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
