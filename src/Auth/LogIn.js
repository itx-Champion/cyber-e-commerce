import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
const LogIn = () => {
  const navigate = useNavigate();
  const [logIn, setLogIn] = useState("Enter your registered email");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  // get input
  const handleInput = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  // submit handle
  const submitHandle = (e) => {
    e.preventDefault();
  };

  //   check if user save in local then no goback to the login page
  useEffect(() => {
    const auth = localStorage.getItem("user");
    if (auth) {
      navigate("/");
    }
  }, []);

  const fetchData = async () => {
    const token = JSON.parse(localStorage.getItem("token"));
    console.log(token);
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    // we can't attach a token with login request because assign a token with login request and then we send a any request to backend then add a token with request then verifyToken in backend with middleware and send a response...
    try {
      const response = await axios.post(
        "http://localhost:3001/login",
        formData,
        config
      );
      let message = response.data.message;
      console.log(message);
      setLogIn(message);
      if (response.data.token) {
        const user = response.data.user;
        const token = response.data.token;
        console.log(token);

        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("token", JSON.stringify(token));

        alert(response.data.message);
        navigate("/");
      } else {
        alert(response.data.message);
        navigate("/login");
      }
    } catch (error) {
      console.log(
        "Log in failed",
        error.response ? error.response.data : error.message
      );
      alert(error.message);
    }
  };

  return (
    <div className="main py-16 lg:mx-60 flex flex-col items-center">
      <form
        className="register flex flex-col gap-4 p-6 xs:w-[90%] sm:w-[80%] border border-[#9F9F9F] bg-[#F5F5F5] rounded-md"
        onClick={submitHandle}
      >
       <Link to="/register" className="flex justify-center">
          <div className="inline-block text-center">
            <p
              className="font-500 text-[20px] text-red-500 mb-3"
              style={{ animation: "slow-blink-animation 1.5s linear infinite" }}
            >
              {logIn ? logIn : ""}
            </p>
          </div>
        </Link>
        <span className="mb-5 font-500 text-[20px] text-center">Login In</span>

        {/* Email */}
        <div className="flex xs:flex-col sm:flex-row sm:items-center gap-2">
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

        {/* Password */}
        <div className="flex xs:flex-col sm:flex-row sm:items-center gap-2">
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
        <button
          type="button"
          className="text-white bg-black text-center rounded-md border py-2 px-14 font-400 text-14px leading-24px  sm:w-[40%] self-center mt-4"
          onClick={() => fetchData()}
        >
          Log In
        </button>
       
      </form>
    </div>
  );
};

export default LogIn;
