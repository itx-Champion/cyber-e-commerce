import React, { useEffect } from "react";
import { HeartIcon as OutlineHeartIcon } from "@heroicons/react/24/outline";
import { HeartIcon as SolidHeartIcon } from "@heroicons/react/24/solid";
import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";

const DiscountItems = () => {
  const [products, setProducts] = useState([]);
  const [likedProducts, setLikedProducts] = useState({});

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
  const filterProducts=products.filter((item)=>item.price<=250);
  const HeartLiked=(id)=>{
    setLikedProducts((preLikedProducts) => ({
        ...preLikedProducts,
        [id]: !preLikedProducts[id],
      }));
  }
  if (!products)
    return (
      <div className="text-16px font-500 text-black text-center py-14">
         Product is Loading...<br/><br/>Please wait
      </div>
    );
  return (
    <div className="lg:px-[140px] lg:py-16 xs:px-[25px] xs:py-12">
      <div className="flex flex-col gap-6">
        <div className="main-heading">
          <h2 className="font-500 text-[20px] leading-32px">
            Discounts up to -50%
          </h2>
        </div>
        <div className="grid md:grid-cols-4 gap-4 xs:grid-cols-2">
          {filterProducts.map((product) => (
            <div
              key={product.id}
              className="div-1 md:py-5 md:px-3 bg-[#F6F6F6] rounded-lg flex flex-col justify-center items-center gap-5 xs:py-6 xs:px-4"
            >
              <div className="self-end cursor-pointer" onClick={()=>HeartLiked(product.id)}>
              {
                likedProducts[product.id] ?(<SolidHeartIcon className="h-8 w-8 text-red-500" />):(<OutlineHeartIcon className="h-8 w-8 text-gray-400" />)
              }
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
      </div>
    </div>
  );
};

export default DiscountItems;
