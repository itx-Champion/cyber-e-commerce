import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
const PayAfterPage = () => {
  const cart = useSelector((state) => state.cart.cartItems);
  return (
    <div className=" flex flex-col gap-4 border mx-auto rounded-lg w-[50%] p-10 my-20 bg-[#F6F6F6] text-center">
      <span className="font-400 text-[24px] leading-24px">You have successfully Pay for this item's.</span>
      <div className="flex flex-col gap-3">
            {cart.map((item, index) => (
              <div
                key={index}
                className="flex items-center bg-[#F6F6F6] rounded-lg px-3 py-2 font-500 text-16px leading-24px justify-between"
              >
                <div className="flex gap-3">
                  <img
                    src={item.images[0]}
                    alt="product images"
                    className="h-8 w-7"
                  />
                  <span className="flex items-center font-400 text-16px leading-24px">
                    {item.title}
                  </span>
                </div>
                
                  <span>{item.quantity * item.price}</span>
                  
                
              </div>
            ))}
          </div>
      <span>PLease go back to the Home for Explore More</span>
      <Link
        to="/"
        className="bg-black text-white p-4 w-[50%] rounded-md  self-center mt-6"
      >
        Explore More
      </Link>
    </div>
  );
};

export default PayAfterPage;
