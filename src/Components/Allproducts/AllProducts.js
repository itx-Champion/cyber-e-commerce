import React from "react";
import { useState, useEffect } from "react";
import {
  ChevronRightIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import { HeartIcon as OutlineHeartIcon } from "@heroicons/react/24/outline";
import { HeartIcon as SolidHeartIcon } from "@heroicons/react/24/solid";
import { useNavigate,useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";

const AllProducts = () => {
  const navigate=useNavigate();
  const location = useLocation();
  const { selectedBrand } = location.state || [];

  const [toggle, setToggle] = useState(false);
  const [openSection, setOpenSection] = useState(null);
  const [products, setProducts] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [likedProducts, setLikedProducts] = useState({});
  const [brandCounts, setBrandCounts] = useState({});
  const [selectedBrands, setSelectedBrands] = useState([]);

  const toggleSection = (section) => {
    setOpenSection(openSection === section ? null : section);
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        let response = await axios.get(
          "https://dummyjson.com/products/category/smartphones"
        );
        let fetchPro = response.data.products;
        setProducts(fetchPro);
        setTotalItems(fetchPro.length);

        // brand counts calculation
        const counts = fetchPro.reduce((acc, product) => {
          acc[product.brand] = (acc[product.brand] || 0) + 1;
          return acc;
        }, {});
        setBrandCounts(counts);
      } catch (error) {
        console.log("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (selectedBrand && selectedBrand.length > 0) {
      setSelectedBrands((prevBrands) => [...new Set([...prevBrands, ...selectedBrand])]);
    }
  }, [selectedBrand]);

  const HeartLiked = (id) => {
    setLikedProducts((preLikedProducts) => ({
      ...preLikedProducts,
      [id]: !preLikedProducts[id],
    }));
  };

  const handleBrandChange = (brand) => {
    setSelectedBrands((prevSelected) =>
      prevSelected.includes(brand)
        ? prevSelected.filter((b) => b !== brand)
        : [...prevSelected, brand]
    );
  };

  
  const allSelectedBrands = [...selectedBrands];
  
  const filteredProducts =allSelectedBrands.length > 0? 
  products.filter((prod) => allSelectedBrands.includes(prod.brand)): products;
  
  console.log("check",filteredProducts);

 const FilteredPage=()=>{
navigate("/allproducts/filter")
 }
 if (!products)
  return (
    <div className="text-16px font-500 text-black text-center py-14">
       Products is Loading...<br/><br/>Please wait
    </div>
  );

  return (
    <div className="ProductsAll py-5 px-6 lg:px-[120px] border border-t-2">
      <div className="flex flex-row items-center text-[#A4A4A4] text-[16px] font-400 leading-4 py-7 sm:inline-flex xs:hidden">
        <span>Home</span>
        <ChevronRightIcon className="h-4 w-4 mx-4 text-[#A4A4A4]" />
        <span>catalog</span>
        <ChevronRightIcon className="h-4 w-4 mx-4 text-[#A4A4A4]" />
        <span className="text-black">SmartPhones</span>
      </div>
      {/* for small screens */}
      <div className="filter-div flex justify-between gap-3 items-center  sm:hidden xs:mt-6 xs:mb-2">
        <div
          className="flex justify-between items-center cursor-pointer xs:py-2 md:py-1 px-3  border rounded-lg xs:w-[50%] sm:w-[30%]"
          onClick={()=>FilteredPage()}
        >
          <span className="font-400 text-15px leading-16px">Filter</span>
          <img src="images/Filters.png" alt="Filter-icon" />
        </div>
        <div
          className="flex justify-between items-center cursor-pointer xs:py-2 md:py-1 px-3 border rounded-lg xs:w-[50%] sm:w-[30%]"
          onClick={() => setToggle(!toggle)}
        >
          <span className="font-400 text-15px leading-16px whitespace-nowrap">
            By rating
          </span>
          {toggle ? (
            <ChevronUpIcon className="h-5 w-5" />
          ) : (
            <ChevronDownIcon className="h-5 w-5" />
          )}
        </div>
      </div>

      <div className="flex flex-row gap-7 pt-4 pb-8">
        {/* left div */}
        <div className="left-div main-container flex flex-col gap-4 sm:w-[40%] md:w-[20%] xs:hidden sm:inline-flex">
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
              <div className="flex items-center border border-gray-300 rounded-md p-1 pl-2 mb-2 bg-[#F5F5F5]">
                <MagnifyingGlassIcon className="h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search brands..."
                  className="ml-2 w-[80%] outline-none text-14px leading-18 font-500 bg-transparent"
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
                      checked={selectedBrands.includes(brand)}
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
          <div className="border-b">
            <div
              className="flex justify-between items-center cursor-pointer py-2"
              onClick={() => toggleSection("Battery")}
            >
              <span className="font-500 text-15px leading-24px">
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
          <div className="border-b">
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
          <div className="border-b">
            <div
              className="flex justify-between items-center cursor-pointer py-2"
              onClick={() => toggleSection("diagonal")}
            >
              <span className="font-500 text-15px leading-24px">
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
          <div className="border-b">
            <div
              className="flex justify-between items-center cursor-pointer py-2"
              onClick={() => toggleSection("protection")}
            >
              <span className="font-500 text-15px leading-24px">
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
                  <span className="font-500 text-[14px] leading-24px">
                    Gorilla Glass
                  </span>
                  <span className="font-500 text-[10px] leading-24px text-[#929292]">
                    8
                  </span>
                </label>
              </div>
            </div>
          )}
          {/* item 6 */}
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
        </div>

        {/* right div */}
        <div className="right-div flex flex-col gap-6 xs:w-[100%] md:w-[80%]">
          <div className="right-div flex flex-col gap-3 overflow-y-scroll scrollbar-width-none">
            <div className="flex justify-between sticky top-0 bg-white z-10 md:pb-2 xs:pb-3">
              <div className="flex justify-center items-center gap-1">
                <span className="flex justify-center items-center font-500 text-[14px] leading-18px text-[#6C6C6C]">
                  Selected Products :
                </span>
                <span className="font-500 text-[20px] leading-18px">
                  {totalItems}
                </span>
              </div>
              <div
                className="flex justify-between items-center cursor-pointer py-1 px-3 md:w-[30%] sm:w-[40%] border rounded-lg xs:hidden sm:inline-flex"
                onClick={() => setToggle(!toggle)}
              >
                <span className="font-400 text-15px leading-16px whitespace-nowrap">
                  By rating
                </span>
                {toggle ? (
                  <ChevronUpIcon className="h-5 w-5" />
                ) : (
                  <ChevronDownIcon className="h-5 w-5" />
                )}
              </div>
            </div>
            <div className="products-Div grid xs:grid-cols-2 md:grid-cols-3 gap-4 ">
              {
                filteredProducts===0?<p>No,Products Found</p>:(
                  filteredProducts.map((product,index) => (
                <div
                  key={index}
                  className="div-1 md:py-5 md:px-3 bg-[#F6F6F6] rounded-lg flex flex-col justify-center items-center gap-5 xs:py-6 xs:px-4"
                >
                  <div
                    className="self-end cursor-pointer"
                    onClick={() => HeartLiked(product.id)}
                  >
                    {likedProducts[product.id] ? (
                      <SolidHeartIcon className="h-8 w-8 text-red-500" />
                    ) : (
                      <OutlineHeartIcon className="h-8 w-8 text-gray-400" />
                    )}
                  </div>
                  <div className="flex justify-center bg-transparent">
                  <Link to={`/product/${product.id}`}>
                    <img
                      src={product.thumbnail}
                      alt={product.title}
                      className="md:h-32 md:w-32 xs:h-28 xs:w-28 bg-transparent"
                    />
                    </Link>
                  </div>
                  <div className="flex flex-col items-center gap-4">
                    <h2 className="font-500 text-[14px] text-center xs:text-[16px]">
                      {product.title}
                    </h2>
                    <span className="font-600 text-[20px] leading-24px tracking-3 mb-2">
                      ${product.price}
                    </span>
                    <button className="text-white bg-black text-center rounded-md border py-2 px-14 font-400 text-14px leading-24px xs:whitespace-nowrap">
                      Buy Now
                    </button>
                  </div>
                </div>
              )
                )
                )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllProducts;
