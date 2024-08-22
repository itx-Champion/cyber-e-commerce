import React, { useState } from "react";
import {
  MagnifyingGlassIcon,
  ShoppingCartIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { HeartIcon as OutlineHeartIcon } from "@heroicons/react/24/outline";
import { HeartIcon as SolidHeartIcon } from "@heroicons/react/24/solid";
import { Link, useNavigate } from "react-router-dom";
import UserDropdown from "./userDropdown";
import { useSelector } from "react-redux";

const Navbar = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [redIcon, setRedIcon] = useState("");
  const [activeLink, setActiveLink] = useState("home");
  const auth = localStorage.getItem("user");
  const cartItems = useSelector((state) => state.cart.cartItems);

  const totalQuantity = cartItems.reduce(
    (accum, item) => accum + item.quantity,
    0
  );

  const LogIn = () => {
    navigate("/login");
  };
  const SignUp = () => {
    navigate("/register");
  };

  return (
    <nav className="bg-white">
      <div className="flex flex-row relative items-center justify-between py-5 px-6 lg:px-[120px]">
        <div className="flex items-center">
          <img
            src="/images/LogoVector.png"
            alt="LogoVector"
            className="w-[65.4px] h-[22.87px]"
          />
        </div>
        {auth ? (
          <>
            <div className="md:w-[270px] h-[56px] rounded-md bg-[#F5F5F5] p-4 hidden lg:flex">
              <div className="flex items-center gap-[8px] h-full ]">
                <MagnifyingGlassIcon className="h-[24px] w-[24px] text-gray-400" />
                <input
                  type="text"
                  placeholder="Search"
                  className="bg-[#F5F5F5] outline-none w-full"
                />
              </div>
            </div>

            <div className="lg:hidden flex items-center">
              <Bars3Icon
                className="w-8 h-8 text-black cursor-pointer"
                onClick={() => setMenuOpen(!menuOpen)}
              />
            </div>

            <div className="hidden lg:flex items-center justify-around gap-[22px]">
              <Link
                to="/"
                className={`font-medium text-[16px] leading-[19.09px] ${
                  activeLink === "home" ? "opacity-100" : "opacity-50"
                }`}
                onClick={() => setActiveLink("home")}
              >
                Home
              </Link>
              <Link
                to="/"
                className={` ${
                  activeLink === "about" ? "opacity-100" : "opacity-50"
                } font-medium text-[16px] leading-[19.09px]`}
                onClick={() => setActiveLink("about")}
              >
                About
              </Link>
              <Link
                to="/"
                className={` ${
                  activeLink === "contact" ? "opacity-100" : "opacity-50"
                } font-medium text-[16px] leading-[19.09px]`}
                onClick={() => setActiveLink("contact")}
              >
                Contact Us
              </Link>
              <Link
                to="/"
                className={` ${
                  activeLink === "blog" ? "opacity-100" : "opacity-50"
                } font-medium text-[16px] leading-[19.09px]`}
                onClick={() => setActiveLink("blog")}
              >
                Blog
              </Link>
            </div>

            <div className="hidden lg:flex gap-6">
              {redIcon === "redicon" ? (
                <SolidHeartIcon
                  className="w-8 h-8 text-red-500"
                  onClick={() => setRedIcon("icon")}
                />
              ) : (
                <OutlineHeartIcon
                  className="w-8 h-8 text-black"
                  onClick={() => setRedIcon("redicon")}
                />
              )}
              <Link to="/product/shoppingcart">
                <div className="relative">
                  {totalQuantity >= 1 && (
                    <span className="absolute top-[-16px] right-[-12px] rounded-full p-1 text-white bg-black  text-[15px] font-600 h-7 w-7 text-center block">
                      {totalQuantity}
                    </span>
                  )}
                  <ShoppingCartIcon className="w-8 h-8 text-black" />
                </div>
              </Link>
              <UserDropdown />
            </div>
          </>
        ) : (
          <div className="flex gap-4">
            <button
              className="text-white bg-black text-center rounded-md border py-2 px-6 font-500 text-16px leading-24px xs:"
              onClick={LogIn}
            >
              Log in
            </button>
            <button
              className="text-white bg-black text-center rounded-md border py-2 px-6 font-500 text-16px leading-24px"
              onClick={SignUp}
            >
              Sign up
            </button>
          </div>
        )}
      </div>

      {/* Mobile Menu */}
      <div
        className={`absolute top-14 right-0 p-3 rounded-md bg-[#F5F5F5] transition-transform duration-700  ease-out z-50 lg:hidden ${
          menuOpen ? "translate-x-0" : "translate-x-full hidden"
        }`}
       
      >
        <XMarkIcon
          className="w-8 h-8 text-black cursor-pointer mb-4"
          onClick={() => setMenuOpen(false)}
        />
        <div className="flex flex-col gap-2 ">
          <Link
            to="/"
            className={`font-medium text-[16px] leading-[19.09px] ${
              activeLink === "home" ? "opacity-100" : "opacity-50"
            }`}
            onClick={() => setActiveLink("home")}
          >
            Home
          </Link>
          <Link
            to="/"
            className={` ${
              activeLink === "about" ? "opacity-100" : "opacity-50"
            } font-medium text-[16px] leading-[19.09px]`}
            onClick={() => setActiveLink("about")}
          >
            About
          </Link>
          <Link
            to="/"
            className={` ${
              activeLink === "contact" ? "opacity-100" : "opacity-50"
            } font-medium text-[16px] leading-[19.09px]`}
            onClick={() => setActiveLink("contact")}
          >
            Contact Us
          </Link>
          <Link
            to="/"
            className={` ${
              activeLink === "blog" ? "opacity-100" : "opacity-50"
            } font-medium text-[16px] leading-[19.09px]`}
            onClick={() => setActiveLink("blog")}
          >
            Blog
          </Link>

          <div className="flex gap-6 mt-2">
            {redIcon === "redicon" ? (
              <SolidHeartIcon
                className="w-8 h-8 text-red-500"
                onClick={() => setRedIcon("icon")}
              />
            ) : (
              <OutlineHeartIcon
                className="w-8 h-8 text-black"
                onClick={() => setRedIcon("redicon")}
              />
            )}

            <Link to="/product/shoppingcart">
              <div className="relative">
                {totalQuantity >= 1 && (
                  <span className="absolute top-[-16px] right-[-12px] rounded-full p-1 text-white bg-black  text-[15px] font-600 h-7 w-7 text-center block">
                    {totalQuantity}
                  </span>
                )}
                <ShoppingCartIcon className="w-8 h-8 text-black" />
              </div>
            </Link>
            <UserDropdown />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
