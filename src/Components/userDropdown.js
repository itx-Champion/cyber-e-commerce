import React, { useState, useRef, useEffect } from "react";
import { UserIcon } from "@heroicons/react/24/outline";
import {useNavigate } from "react-router-dom";
const UserDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
const navigate=useNavigate()
let user=JSON.parse(localStorage.getItem("user"));
user=user.name;
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, []);
const handleLogout=()=>{
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        navigate("/login");
}
  return (
    <div className="relative inline-block" ref={dropdownRef}>
      <button onClick={toggleDropdown}>
      <UserIcon className="w-8 h-8 text-black" />
      </button>
      {isOpen && (
        <div
          className="absolute right-0 mt-2 w-36 bg-white border rounded-md shadow-lg z-10"
        >
          <div className="flex flex-col py-2 px-2">
            <span className="block text-gray-700 font-semibold ml-4 mb-[-8px]">{user}</span>
            <button
              className="mt-2 w-full text-left text-red-600 hover:bg-red-100 rounded-md py-2 px-4"
              onClick={()=>handleLogout()}
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserDropdown;
