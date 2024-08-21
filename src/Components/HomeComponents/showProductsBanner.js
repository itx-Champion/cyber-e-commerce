import React, { useEffect, useState } from "react";
import { HeartIcon as OutlineHeartIcon } from "@heroicons/react/24/outline";
import { HeartIcon as SolidHeartIcon } from "@heroicons/react/24/solid";
import axios from "axios";
import { Link } from "react-router-dom";

const ShowProductsBanner = () => {
  const [products, setProducts] = useState([]);
  const [likedProducts, setLikedProducts] = useState({});
  const [activeTab, setActiveTab] = useState("New Arrival");

  useEffect(() => {
    const fetchData = async () => {
      try {
        let response = await axios.get(
          "https://dummyjson.com/products/category/smartphones"
        );
        setProducts(response.data.products);
      } catch (error) {
        console.log("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  //  Products filter based on the active tab
  const filterProducts = products.filter((product) => {
    if (activeTab === "New Arrival") {
      return product.price <= 300; 
    } else if (activeTab === "Best Seller") {
      return product.rating >= 4.5; 
    } else if (activeTab === "Featured Products") {
      return product.discountPercentage >= 20; 
    }
    return product;
  }).slice(0, 8); // Show 8 products

  const HeartLiked = (id) => {
    setLikedProducts((prevLikedProducts) => ({
      ...prevLikedProducts,
      [id]: !prevLikedProducts[id],
    }));
  };
  if (!products)
    return (
      <div className="text-16px font-500 text-black text-center py-14">
         Product is Loading...<br/><br/>Please wait
      </div>
    );
  return (
    <div className="lg:px-[140px] py-14 xs:px-[25px]">
      <div className="flex flex-col xs:gap-8 md:gap-6">
        <div className="main-heading flex flex-row gap-5 font-500 text-[16px] leading-32px xs:justify-between sm:justify-start">
          
          {/* New Arrival Tab */}
          <div
            className="flex flex-col items-center cursor-pointer"
            onClick={() => setActiveTab("New Arrival")}
          >
            <span
              className={`${
                activeTab === "New Arrival" ? "text-black" : "text-[#8B8B8B]"
              } inline-block`} 
            >
              New Arrival
            </span>
            {activeTab === "New Arrival" && (
              <div className="h-[3px] bg-black rounded-full mt-1 w-full"></div> // Set width to 100% to match span width
            )}
          </div>

          {/* Best Seller Tab */}
          <div
            className="flex flex-col items-center cursor-pointer"
            onClick={() => setActiveTab("Best Seller")}
          >
            <span
              className={`${
                activeTab === "Best Seller" ? "text-black" : "text-[#8B8B8B]"
              } inline-block`}
            >
              Best Seller
            </span>
            {activeTab === "Best Seller" && (
              <div className="h-[3px] bg-black rounded-full mt-1 w-full"></div>
            )}
          </div>

          {/* Featured Products Tab */}
          <div
            className="flex flex-col items-center cursor-pointer"
            onClick={() => setActiveTab("Featured Products")}
          >
            <span
              className={`${
                activeTab === "Featured Products"
                  ? "text-black"
                  : "text-[#8B8B8B]"
              } inline-block`}
            >
              Featured Products
            </span>
            {activeTab === "Featured Products" && (
              <div className="h-[3px] bg-black rounded-full mt-1 w-full"></div>
            )}
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid md:grid-cols-4 gap-4 xs:grid-cols-2">
          {filterProducts.map((product) => (
            <div
              key={product.id}
              className="md:py-5 md:px-3 bg-[#F6F6F6] rounded-lg flex flex-col justify-center items-center gap-5 xs:py-6 xs:px-4"
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
                  className="md:h-32 md:w-32 xs:h-28 xs:w-28 bg-transparent cursor-pointer"
                />
                </Link>
              </div>
              <div className="flex flex-col items-center gap-4">
                <h2 className="font-500 text-[14px] text-center">
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
          ))}
        </div>
        <button className="p-3 text-white bg-black font-500 text-[14px] leading-24px rounded-md w-44 self-center mt-4"><Link to="/allproducts">Show More Products..</Link></button>
      </div>
    </div>
  );
};

export default ShowProductsBanner;

