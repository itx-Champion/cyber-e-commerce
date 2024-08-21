import React from "react";
import { useState } from "react";
import {
  ChevronRightIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";

const FilteredPage = () => {
    const navigate=useNavigate();
  const [openSection, setOpenSection] = useState(null);
  const [brandCounts, setBrandCounts] = useState({
    Apple: 4,
    Oppo: 3,
    Realme:3,
    Samsung:3,
    Vivo:3,
  });
  const [selectedBrand, setSelectedBrands] = useState([]);

  const toggleSection = (section) => {
    setOpenSection(openSection === section ? null : section);
  };

  const handleBrandChange = (brand) => {
    setSelectedBrands((prevSelected) =>
      prevSelected.includes(brand)
        ? prevSelected.filter((b) => b !== brand)
        : [...prevSelected, brand]
    );
  };
  const filterBack=()=>{
    navigate("/allproducts",{ state: { selectedBrand } });
    console.log(selectedBrand)
  };

  return (
    <div className="main-filtered flex flex-col gap-4 py-5 px-6 border-t-2 xs:flex md:hidden">
      <div className=" flex flex-row items-center gap-3">
        <ChevronRightIcon className="h-6 w-6 text-[#A4A4A4] ml-[-8px]" />
        <span className=" font-500 text-[20px] leading-32px ">Filters</span>
      </div>
      {/* all category */}
      <div>
        <div className=" main-container flex flex-col gap-4 fs:w-[60%] mx-auto">
          {/* Price */}
          <div className="border-b ">
            <div
              className="flex justify-between items-center cursor-pointer py-2"
              onClick={() => toggleSection("Price")}
            >
              <span className="font-500 text-15px leading-24px">Price</span>
              {openSection === "Price" ? (
                <ChevronUpIcon className="h-5 w-5" />
              ) : (
                <ChevronDownIcon className="h-5 w-5" />
              )}
            </div>
          </div>
          {openSection === "Price" && (
            <div className="flex flex-col w-full gap-3 mt-3">
              <div className="flex justify-between text-[#A7A7A7] font-400 text-[14px] leading-24px">
                <span>From</span>
                <span>To</span>
              </div>
              <div className="flex justify-between ">
                <span className="border border-[#9F9F9F] rounded-md p-2 w-[30%]">
                  1299
                </span>
                <span className="border border-[#9F9F9F] rounded-md p-2 w-[30%] text-right">
                  1299
                </span>
              </div>

              <input
                type="range"
                class="range-slider"
                min="0"
                max="2000"
                value="1299"
                className="w-full"
              />
            </div>
          )}
          {/* Brand */}
          <div className="border-b">
            <div
              className="flex justify-between items-center cursor-pointer py-2"
              onClick={() => toggleSection("Brand")}
            >
              <span className="font-500 text-15px leading-24px">Brand</span>
              {openSection === "Brand" ? (
                <ChevronUpIcon className="h-5 w-5" />
              ) : (
                <ChevronDownIcon className="h-5 w-5" />
              )}
            </div>
          </div>

          {openSection === "Brand" && (
            <div className="">
              {/* Search input with icon */}
              <div className="flex items-center border border-gray-300 rounded-md p-1 pl-2 mb-2 bg-[#F5F5F5] h-12">
                <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search brands..."
                  className="ml-2 w-[80%] outline-none text-16px leading-18 font-500 bg-transparent"
                />
              </div>

              {/* Brand checkboxes */}
              <div className="flex flex-col gap-1">
                {Object.keys(brandCounts).map((brand, index) => (
                  <label
                    className="flex items-center gap-1 cursor-pointer"
                    key={index}
                  >
                    <input
                      type="checkbox"
                      className="mr-2 w-[15px] h-[15px] cursor-pointer"
                      checked={selectedBrand.includes(brand)}
                      onChange={() => handleBrandChange(brand)}
                    />
                    <span className="font-500 text-[14px] leading-24px">
                      {brand}
                    </span>
                    <span className="font-500 text-[10px] leading-24px text-[#929292]">
                      {brandCounts[brand]}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          )}

          {/* Battery Capacity */}
          <div className="border-b ">
            <div
              className="flex justify-between items-center cursor-pointer py-2"
              onClick={() => toggleSection("Battery")}
            >
              <span className="font-500 text-15px leading-24px whitespace-nowrap">
                Battery Capacity
              </span>
              {openSection === "Battery" ? (
                <ChevronUpIcon className="h-5 w-5" />
              ) : (
                <ChevronDownIcon className="h-5 w-5" />
              )}
            </div>
          </div>

          {openSection === "Battery" && (
            <div className="">
              <div className="flex flex-col gap-1">
                <label className="flex items-center gap-1">
                  <input type="checkbox" className="mr-2 w-[15px] h-[15px]" />
                  <span className="font-500 text-[14px] leading-24px">
                    3000-mAh
                  </span>
                  <span className="font-500 text-[10px] leading-24px text-[#929292]">
                    10
                  </span>
                </label>
                <label className="flex items-center gap-1">
                  <input type="checkbox" className="mr-2 w-[15px] h-[15px]" />
                  <span className="font-500 text-[14px] leading-24px">
                    4000-mAh
                  </span>
                  <span className="font-500 text-[10px] leading-24px text-[#929292]">
                    15
                  </span>
                </label>
                <label className="flex items-center gap-1">
                  <input type="checkbox" className="mr-2 w-[15px] h-[15px]" />
                  <span className="font-500 text-[14px] leading-24px">
                    5000-mAh
                  </span>
                  <span className="font-500 text-[10px] leading-24px text-[#929292]">
                    20
                  </span>
                </label>
              </div>
            </div>
          )}

          {/* Screen Type */}
          <div className="border-b ">
            <div
              className="flex justify-between items-center cursor-pointer py-2"
              onClick={() => toggleSection("screen")}
            >
              <span className="font-500 text-15px leading-24px">
                Screen Type
              </span>
              {openSection === "screen" ? (
                <ChevronUpIcon className="h-5 w-5" />
              ) : (
                <ChevronDownIcon className="h-5 w-5" />
              )}
            </div>
          </div>

          {openSection === "screen" && (
            <div className="">
              <div className="flex flex-col gap-1">
                <label className="flex items-center gap-1">
                  <input type="checkbox" className="mr-2 w-[15px] h-[15px]" />
                  <span className="font-500 text-[14px] leading-24px">TFT</span>
                  <span className="font-500 text-[10px] leading-24px text-[#929292]">
                    12
                  </span>
                </label>
                <label className="flex items-center gap-1">
                  <input type="checkbox" className="mr-2 w-[15px] h-[15px]" />
                  <span className="font-500 text-[14px] leading-24px">IPS</span>
                  <span className="font-500 text-[10px] leading-24px text-[#929292]">
                    16
                  </span>
                </label>
              </div>
            </div>
          )}

          {/* Screen Diagonal */}
          <div className="border-b ">
            <div
              className="flex justify-between items-center cursor-pointer py-2"
              onClick={() => toggleSection("diagonal")}
            >
              <span className="font-500 text-15px leading-24px whitespace-nowrap">
                Screen Diagonal
              </span>
              {openSection === "diagonal" ? (
                <ChevronUpIcon className="h-5 w-5" />
              ) : (
                <ChevronDownIcon className="h-5 w-5" />
              )}
            </div>
          </div>

          {openSection === "diagonal" && (
            <div className="">
              <div className="flex flex-col gap-1">
                <label className="flex items-center gap-1">
                  <input type="checkbox" className="mr-2 w-[15px] h-[15px]" />
                  <span className="font-500 text-[14px] leading-24px">
                    "4.5"
                  </span>
                  <span className="font-500 text-[10px] leading-24px text-[#929292]">
                    6
                  </span>
                </label>
                <label className="flex items-center gap-1">
                  <input type="checkbox" className="mr-2 w-[15px] h-[15px]" />
                  <span className="font-500 text-[14px] leading-24px">
                    "5.5"
                  </span>
                  <span className="font-500 text-[10px] leading-24px text-[#929292]">
                    8
                  </span>
                </label>
                <label className="flex items-center gap-1">
                  <input type="checkbox" className="mr-2 w-[15px] h-[15px]" />
                  <span className="font-500 text-[14px] leading-24px">
                    "6.5"
                  </span>
                  <span className="font-500 text-[10px] leading-24px text-[#929292]">
                    5
                  </span>
                </label>
              </div>
            </div>
          )}
          {/* protection class */}
          <div className="border-b ">
            <div
              className="flex justify-between items-center cursor-pointer py-2"
              onClick={() => toggleSection("protection")}
            >
              <span className="font-500 text-15px leading-24px whitespace-nowrap">
                Protection Class
              </span>
              {openSection === "protection" ? (
                <ChevronUpIcon className="h-5 w-5" />
              ) : (
                <ChevronDownIcon className="h-5 w-5" />
              )}
            </div>
          </div>

          {openSection === "protection" && (
            <div className="">
              <div className="flex flex-col gap-1">
                <label className="flex items-center gap-1">
                  <input type="checkbox" className="mr-2 w-[15px] h-[15px]" />
                  <span className="font-500 text-[14px] leading-24px">
                    IPXX
                  </span>
                  <span className="font-500 text-[10px] leading-24px text-[#929292]">
                    6
                  </span>
                </label>
                <label className="flex items-center gap-1">
                  <input type="checkbox" className="mr-2 w-[15px] h-[15px]" />
                  <span className="font-500 text-[14px] leading-24px whitespace-nowrap">
                    Gorilla Glass
                  </span>
                  <span className="font-500 text-[10px] leading-24px text-[#929292]">
                    8
                  </span>
                </label>
              </div>
            </div>
          )}
          {/* built in memory */}
          <div className="border-b">
            <div
              className="flex justify-between items-center cursor-pointer py-2"
              onClick={() => toggleSection("builtMemory")}
            >
              <span className="font-500 text-15px leading-24px">
                Built In Memory
              </span>
              {openSection === "builtMemory" ? (
                <ChevronUpIcon className="h-5 w-5" />
              ) : (
                <ChevronDownIcon className="h-5 w-5" />
              )}
            </div>
          </div>

          {openSection === "builtMemory" && (
            <div className="">
              <div className="flex flex-col gap-1">
                <label className="flex items-center gap-1">
                  <input type="checkbox" className="mr-2 w-[15px] h-[15px]" />
                  <span className="font-500 text-[14px] leading-24px">
                    8GB - 32GB
                  </span>
                  <span className="font-500 text-[10px] leading-24px text-[#929292]">
                    6
                  </span>
                </label>
                <label className="flex items-center gap-1">
                  <input type="checkbox" className="mr-2 w-[15px] h-[15px]" />
                  <span className="font-500 text-[14px] leading-24px">
                    32GB - 64GB
                  </span>
                  <span className="font-500 text-[10px] leading-24px text-[#929292]">
                    8
                  </span>
                </label>
              </div>
            </div>
          )}
          <button className="font-500 text-[18px] leading-[24px] text-center border border-black bg-black text-white rounded-md py-4 px-12 w-full" onClick={filterBack}>
            Apply
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilteredPage;
