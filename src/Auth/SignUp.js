import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate();
  const [register, setRegister] = useState("Please Register your email");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
  });

  // Validate email format
  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  // get input
  const handleInput = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setErrors({
      ...errors,
      [name]: "",
    });
  
  };

  // submitHandle
  const submitHandle = (e) => {
    e.preventDefault();
    const { name, email, password } = formData;
    let valid = true;

    const newErrors = {
      name: "",
      email: "",
      password: "",
    };

    if (!name) {
      newErrors.name = "*Name is required";
      valid = false;
    }

    if (!email) {
      newErrors.email = "*Email is required";
      valid = false;
    } else if (!validateEmail(email)) {
      newErrors.email = "*Invalid email format";
      valid = false;
    }

    if (!password) {
      newErrors.password = "*Password is required";
      valid = false;
    }

    if (!valid) {
      setErrors(newErrors);
      return;
    }

    fetchData();
  };

  const fetchData = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3001/register",
        formData
      );
      let user = response.data.user;
      let token = response.data.token;
      setRegister(response.data.message);
      if (user && token) {
        localStorage.setItem("user", JSON.stringify(response.data.user));
        localStorage.setItem("token", JSON.stringify(response.data.token));
        alert(response.data.message);
        navigate("/");
      } else {
        alert(response.data.message);
        navigate("/login");
      }
    } catch (error) {
      console.log("unsuccessful registration", error);
    }
  };

  return (
    <div className="main py-16 lg:mx-60 flex flex-col items-center">
      <form
        className="register flex flex-col gap-4 p-6 xs:w-[90%] sm:w-[80%] border border-[#9F9F9F] bg-[#F5F5F5] rounded-md"
        onSubmit={submitHandle}
      >
        <Link to="/register">
          <p
            className="font-400 text-[20px] text-red-500 text-center mb-3"
            style={{ animation: "slow-blink-animation 1.5s linear infinite" }}
          >
            {register ? register : ""}
          </p>
        </Link>
        <span className="mb-5 font-500 text-[20px] text-center">Sign Up</span>

        {/* Username */}
        <div className="flex xs:flex-col sm:flex-row sm:items-center gap-2 flex-col">
          <label htmlFor="name" className="w-[35%] text-[15px] font-500">
            User Name :
          </label>
          <input
            className="sm:w-[65%] p-2 border rounded-md border-[#9F9F9F] outline-none"
            type="text"
            name="name"
            placeholder="Enter your name..."
            autoComplete="off"
            value={formData.name}
            onChange={handleInput}
          />
          
        </div>
        {errors.name && (
            <p className="text-red-500 self-end text-sm mt-1">{errors.name}</p>
          )}

        {/* Email */}
        <div className="flex xs:flex-col sm:flex-row sm:items-center gap-2 flex-col">
          <label htmlFor="email" className="w-[35%] text-[15px] font-500">
            User Email :
          </label>
          <input
            className="sm:w-[65%] p-2 border rounded-md border-[#9F9F9F] outline-none"
            type="email"
            name="email"
            placeholder="Enter your email..."
            autoComplete="off"
            value={formData.email}
            onChange={handleInput}
          />
          
        </div>
        {errors.email && (
            <p className="self-end text-red-500 text-sm mt-1">{errors.email}</p>
          )}
        {/* Password */}
        <div className="flex xs:flex-col sm:flex-row sm:items-center gap-2 flex-col">
          <label htmlFor="password" className="w-[35%] text-[15px] font-500">
            User Password :
          </label>
          <input
            className="sm:w-[65%] p-2 border border-[#9F9F9F] rounded-md outline-none"
            type="password"
            name="password"
            placeholder="Enter your password..."
            autoComplete="off"
            value={formData.password}
            onChange={handleInput}
          />
         
        </div>
        {errors.password && (
            <p className="self-end text-red-500 text-sm mt-1">{errors.password}</p>
          )}

        <button
          type="submit"
          className="text-white bg-black text-center rounded-md border py-2 px-14 font-400 text-14px leading-24px w-[40%] self-center mt-4 whitespace-nowrap"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default SignUp;
