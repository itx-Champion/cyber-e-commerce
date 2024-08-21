import React from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { ShipmentMethod } from "../../Redux/Actions/shipMethod";
const Shipping = () => {
  const dispatch = useDispatch();
  const [selectedOption, setSelectedOption] = useState("free");

  useEffect(() => {
    const defaultShipData = {
      name: "Free",
      price: "0",
      date: "14 Oct 2024",
    };
    dispatch(ShipmentMethod(defaultShipData));
  }, [dispatch]);

  const handleCheckboxChange = (option) => {
    setSelectedOption(option);
    let shipData = {};
    switch (option) {
      case "free":
        shipData = {
          name: "Express",
          price: "8.50",
          date: "5 Oct 2024",
        };
        break;
      case "express":
        shipData = {
          name: "Express",
          price: "8.50",
          date: "5 Oct 2024",
        };
        break;
      case "schedule":
        shipData = {
          name: "Schedule",
          price: "17",
          date: "14 Oct 2024",

        };
        break;
      default:
        break;
    }
dispatch(ShipmentMethod(shipData));
  };

  return (
    <div className="md:px-[120px] xs:px-[30px] py-10 ">
      {/* Top */}
      <div className="flex py-10 justify-between">
        {/* Address */}
        <Link to="/product/shoppingcart/address">
          <div className="flex gap-1 items-center cursor-pointer">
            <img
              src="/images/locationicon.png"
              alt="location"
              className="h-7 w-7 opacity-50"
            />
            <div className="flex flex-col font-500">
              <span className="text-[14px] leading-18px  text-[#B2B2B2]">
                Step 1
              </span>
              <span className="[text-19px] leading-[24px] text-[#B2B2B2]">
                Address
              </span>
            </div>
          </div>
        </Link>
        {/* Shipping */}
        <Link to="/product/shoppingcart/shipping">
          <div className="flex gap-1 items-center cursor-pointer">
            <img
              src="/images/locationicon.png"
              alt="location"
              className="h-7 w-7"
            />
            <div className="flex flex-col font-500">
              <span className="text-[14px] leading-18px">Step 2</span>
              <span className="[text-19px] leading-[24px] ">Shipping</span>
            </div>
          </div>
        </Link>
        {/* Payment */}
        <Link to="/product/shoppingcart/payment">
          <div className="flex gap-1 items-center cursor-pointer">
            <img
              src="/images/locationicon.png"
              alt="location"
              className="h-7 w-7 opacity-50"
            />
            <div className="flex flex-col font-500">
              <span className="text-[14px] leading-18px text-[#B2B2B2]">
                Step 3
              </span>
              <span className="[text-19px] leading-[24px] text-[#B2B2B2]">
                Payment
              </span>
            </div>
          </div>
        </Link>
      </div>
      {/* bottom */}
      <div className="flex flex-col gap-36">
        {/*shipment methods */}
        <div className="flex flex-col gap-4">
          <span className="font-500 text-[18px] leading-24px">
            Shipment method
          </span>
          <div className="flex flex-col gap-2">
            {/* 1st option */}
            <div
              className={`${
                selectedOption === "free" ? "opacity-100" : "opacity-50"
              } flex justify-between border border-[#D1D1D8] rounded-lg p-5`}
            >
              <div className="flex xs:flex-col lg:flex-row gap-3">
                <label className="circular-checkbox">
                  <input
                    type="checkbox"
                    checked={selectedOption === "free"}
                    onChange={() => handleCheckboxChange("free")}
                  />
                  <span></span>
                </label>
                <span className="font-500 text-16px leading-24px">Free $0</span>
                <span className="font-400 text-16px leading-24px">
                  Regularly shipment
                </span>
              </div>
              <span className="font-500 text-16px leading-24px">
                14 oct 2024
              </span>
            </div>

            {/* 2nd option */}
            <div
              className={`${
                selectedOption === "express" ? "opacity-100" : "opacity-50"
              } flex justify-between border border-[#D1D1D8] rounded-lg p-5`}
            >
              <div className="flex xs:flex-col lg:flex-row gap-3 xs:w-[70%]">
                <label className="circular-checkbox">
                  <input
                    type="checkbox"
                    checked={selectedOption === "express"}
                    onChange={() => handleCheckboxChange("express")}
                  />
                  <span></span>
                </label>
                <span className="font-500 text-16px leading-24px">
                  express $8.50
                </span>
                <span className="font-400 text-16px leading-24px">
                  Get your delivery as soon as possible
                </span>
              </div>
              <span className="font-500 text-16px leading-24px">
                5 oct 2024
              </span>
            </div>

            {/* 3rd option */}
            <div
              className={`${
                selectedOption === "schedule" ? "opacity-100" : "opacity-50"
              } flex justify-between border border-[#D1D1D8] rounded-lg p-5`}
            >
              <div className="flex lg:flex-row xs:flex-col gap-3 xs:w-[70%]">
                <label className="circular-checkbox">
                  <input
                    type="checkbox"
                    checked={selectedOption === "schedule"}
                    onChange={() => handleCheckboxChange("schedule")}
                  />
                  <span></span>
                </label>
                <span className="font-500 text-16px leading-24px">
                  Schedule $17
                </span>
                <span className="font-400 text-16px leading-24px">
                  Pick a date when you want to get a delivery
                </span>
              </div>
              <div className="flex lg:flex-row xs:flex-col gap-4">
                <span className="font-500 text-16px leading-24px">
                  14 oct 2024
                </span>
              </div>
            </div>
          </div>
        </div>
        {/* buttons */}
        <div className="w-[100%]">
          <div className="font-500 text-16px leading-24px flex xs:justify-around xmd:justify-end gap-4">
            <Link
              to="/product/shoppingcart/address"
              className="sm:w-[35%] xmd:w-[20%]"
            >
              <button className="border-2 border-black rounded-md text-black px-10 py-4 text-center w-[100%]">
                Back
              </button>
            </Link>
            <Link
              to="/product/shoppingcart/payment"
              className="sm:w-[35%] xmd:w-[20%]"
            >
              <button className="text-white border-2 border-black bg-black rounded-md px-10 py-4 text-center w-[100%] ">
                Next
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shipping;
