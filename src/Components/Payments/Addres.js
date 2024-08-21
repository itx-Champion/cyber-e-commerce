import React, { useState } from "react";
import { PlusIcon } from "@heroicons/react/24/outline";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { FaPencilAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { SetAddress } from "../../Redux/Actions/setAddress";

const Address = () => {
  const dispatch = useDispatch();
  const savedAddress = useSelector((state) => state.address.address[0]);
  
  const [isFormVisible, setFormVisible] = useState(false);
  const [dataList, setDataList] = useState(savedAddress ? [savedAddress] : []);
  const [formData, setFormData] = useState({
    name: "",
    details: "",
    contact: "",
    option: "",
  });
  const [editIndex, setEditIndex] = useState(null);
  const [selectedAddress, setSelectedAddress] = useState(savedAddress || null);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const options = ["Home", "Office"];

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (editIndex !== null) {
      // Update existing data
      const updatedDataList = [...dataList];
      updatedDataList[editIndex] = formData;
      setDataList(updatedDataList);
      setEditIndex(null);
    } else {
      // Add new data
      setDataList([formData, ...dataList]);
    }
    setFormData({ name: "", details: "", contact: "", option: "" });
    setFormVisible(false);
  };

  const handleEdit = (index) => {
    setFormData(dataList[index]);
    setEditIndex(index);
    setFormVisible(true);
  };

  const handleDelete = (index) => {
    const updatedDataList = dataList.filter((_, i) => i !== index);
    setDataList(updatedDataList);
    if (selectedAddress === dataList[index]) {
      setSelectedAddress(null);
    }
  };

  const toggleForm = () => {
    setFormVisible(!isFormVisible);
  };

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const selectOption = (value) => {
    setFormData({ ...formData, option: value });
    setDropdownOpen(false);
  };

  const handleAddressSelect = (item) => {
    setSelectedAddress(item);
  };

  const handleButtonClick = () => {
    dispatch(SetAddress(selectedAddress));
  };

  return (
    <div className="md:px-[120px] xs:px-[30px] py-10">
      {/* Top */}
      <div className="flex py-10 justify-between">
        {/* Address */}
        <Link to="/product/shoppingcart/address">
          <div className="flex gap-1 items-center cursor-pointer">
            <img
              src="/images/locationicon.png"
              alt="location"
              className="h-7 w-7"
            />
            <div className="flex flex-col font-500">
              <span className="text-[14px] leading-18px">Step 1</span>
              <span className="[text-19px] leading-[24px]">Address</span>
            </div>
          </div>
        </Link>
        {/* Shipping */}
        <Link to="/product/shoppingcart/shipping">
          <div className="flex gap-1 items-center cursor-pointer">
            <img
              src="/images/locationicon.png"
              alt="location"
              className="h-7 w-7 opacity-50"
            />
            <div className="flex flex-col font-500">
              <span className="text-[14px] leading-18px text-[#B2B2B2]">
                Step 2
              </span>
              <span className="[text-19px] leading-[24px] text-[#B2B2B2]">
                Shipping
              </span>
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

      {/* Bottom */}
      <div className="flex flex-col">
        <span className="font-500 text-[18px] leading-24px pl-3">
          Select Address
        </span>
        {/* Display Data Above the Add Button */}
        <div className="flex flex-col gap-4 w-[100%] mx-auto mt-3">
          {dataList.map((item, index) => (
            <div
              key={index}
              className={`flex items-center justify-between p-4 bg-gray-100 border rounded-md shadow-sm ${selectedAddress === item ? 'border-black' : ''
                }`}
            >
              <div className="flex flex-col gap-2 font-400 text-[16px] leading-24px xs:w-[60%
              ] xmd:w-[80%] ">
                <div className="flex gap-4 items-center">
                  <input
                    type="radio"
                    checked={selectedAddress === item}
                    onChange={() => handleAddressSelect(item)}
                  />
                  <span>{item.name}</span>
                  <span className="px-3 py-1 bg-black rounded-md text-14px text-white">
                    {item.option}
                  </span>
                </div>
                <div className="flex flex-col gap-1 indent-8">
                  <div>{item.details}</div>
                  <div>{item.contact}</div>
                </div>
              </div>
              <div className="flex xs:flex-col fs:flex-row gap-3 items-center">
                <FaPencilAlt
                  onClick={() => handleEdit(index)}
                  size={20}
                  color="black"
                  className="cursor-pointer"
                />
                <XMarkIcon
                  className="h-7 w-7 cursor-pointer"
                  onClick={() => handleDelete(index)}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Add New Address Button */}
        <div className="relative flex items-center justify-center w-full mt-10 mb-8">
          <div className="absolute w-full">
            <div className="bg-line-gradient h-[1px] w-full"></div>
          </div>

          <div
            className="relative bg-black text-white rounded-full h-8 w-8 flex items-center justify-center z-10 cursor-pointer"
            onClick={toggleForm}
          >
            <PlusIcon />
          </div>

          <div className="absolute top-10 text-center z-10">
            <span className="font-400 text-[14px] leading-18px">
              Add New Address
            </span>
          </div>
        </div>

        {isFormVisible && (
          <div className="mt-4 p-4 bg-white border rounded-md shadow-md w-[70%] mx-auto">
            <form onSubmit={handleFormSubmit}>
              <div className="flex lg:flex-row xs:flex-col gap-6">
                {/* Address */}
                <div className="flex flex-col gap-4 xs:w-[100%] lg:w-[50%]">
                  <div>
                    <label
                      className="block text-[16px] font-500 text-gray-700"
                      htmlFor="name"
                    >
                      Address Name :
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      value={formData.name}
                      placeholder="Enter address name"
                      onChange={handleFormChange}
                      className="text-[18px] mt-1 block w-full border indent-4 border-gray-300 rounded-md shadow-sm"
                    />
                  </div>
                  <div>
                    <label
                      className="block text-[16px] font-500 text-gray-700"
                      htmlFor="details"
                    >
                      Address Details :
                    </label>
                    <textarea
                      id="details"
                      name="details"
                      rows="3"
                      value={formData.details}
                      placeholder="Enter address details"
                      onChange={handleFormChange}
                      className="indent-4 text-[18px] mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
                    />
                  </div>
                </div>
                {/* Extra */}
                <div className="flex flex-col gap-4 xs:w-[100%] lg:w-[50%]">
                  <div>
                    <label
                      className="block text-[16px] font-500 text-gray-700"
                      htmlFor="contact"
                    >
                      Contact No :
                    </label>
                    <input
                      id="contact"
                      name="contact"
                      type="text"
                      value={formData.contact}
                      placeholder="Enter Contact No"
                      onChange={handleFormChange}
                      className="text-18px indent-2 mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
                    />
                  </div>
                  {/* Select Option */}
                  <div className="relative w-60 flex flex-col gap-1">
                    <label
                      className="block text-[16px] font-500 text-gray-700"
                      htmlFor="option"
                    >
                      Select an Option :
                    </label>
                    <input
                      type="text"
                      name="option"
                      value={formData.option}
                      placeholder="Select an option..."
                      onClick={toggleDropdown}
                      readOnly
                      className="w-full p-2 border text-[18px] border-gray-300 rounded-md cursor-pointer"
                    />
                    {isDropdownOpen && (
                      <div className="absolute w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg">
                        {options.map((option, index) => (
                          <div
                            key={index}
                            onClick={() => selectOption(option)}
                            className="p-2 cursor-pointer hover:bg-gray-200"
                          >
                            {option}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex gap-4 justify-center mt-4">
                <button
                  type="button"
                  onClick={toggleForm}
                  className="border-2 border-black rounded-md text-black px-6 py-2 whitespace-nowrap"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="text-white bg-black rounded-md px-6 py-2 text-center"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="w-[100%] xs:mt-5">
          <div className="font-500 text-16px leading-24px flex xs:justify-around xmd:justify-end gap-4">
            <Link to="/product/shoppingcart" className="sm:w-[35%] xmd:w-[20%]">
              <button className="border-2 border-black rounded-md text-black  px-10 py-4 text-center w-[100%]">
                Back
              </button>
            </Link>
            <Link to="/product/shoppingcart/shipping" className="sm:w-[35%] xmd:w-[20%]">
              <button className="text-white border-2 border-black bg-black rounded-md px-10 py-4 text-center w-[100%] " onClick={handleButtonClick}>
                Next
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Address;
