import React from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { removeToCart } from "../Redux/Actions/removeToCart";
import { PlusIcon, MinusIcon } from "@heroicons/react/24/solid";
import { incrementCart } from "../Redux/Actions/incrementCart";
import { decrementCart } from "../Redux/Actions/decrementCart";
import { Link } from "react-router-dom";

const ShoppingCart = () => {
  const dispatch = useDispatch();
  const cartProducts = useSelector((state) => state.cart.cartItems);

  const handleRemove = (id) => {
    dispatch(removeToCart(id));
    alert(`Product is removed with id:#${id}`);
  };
  const incCart=(id)=>{
    dispatch(incrementCart(id));
  }
  const decCart=(id)=>{
    dispatch(decrementCart(id));
  }
// for checking
  if (cartProducts.length > 0) {
    console.log("First product name:", cartProducts[0].title);
  } else {
    console.log("Cart is empty or not loaded");
  }
  // for total summary
  const subTotal = cartProducts.reduce((accum, item) => accum + (item.price*item.quantity), 0);
  const tax = 0.02;
  const deliveryFee = 29;
  const subTax = subTotal > 0 ? (subTotal * tax).toFixed(2) : 0;
  const Total =
    subTotal > 0
      ? (
          parseFloat(subTotal) +
          parseFloat(subTax) +
          parseFloat(deliveryFee)
        ).toFixed(2)
      : 0;

  return (
    <div className="main xs:px-[20px] lg:px-[120px] py-[40px] flex gap-10 xs:flex-col md:flex-row">
      <div className="left-cart flex flex-col gap-5 md:w-[55%]  xs:[100%]">
        <h2 className="font-600 text-[20px] leading-24px">Shopping Cart</h2>
        <div className="cart-items flex flex-col items-center gap-4">
          {/*Show redux cart item's  */}
          {cartProducts.length === 0 ? (
            <p className="font-600 text-black text-24px">Your cart is empty</p>
          ) : (
            cartProducts.map((item, index) => (
              <div
                key={index}
                className="item flex  p-2 items-center xs:w-[100%] xs:justify-around sm:justify-normal border-b-[1.4px] pb-6"
              >
                <div className="xs:w-[30%] lg:w-24 flex justify-center">
                  <img
                    src={item.images[0]}
                    alt="item"
                    className="xs:h-24 xs:w-24 lg:h-12 lg:w-12"
                  />
                </div>
                <div className="flex gap-7 xs:flex-col sm:flex-row md:flex-col lg:flex-row items-center xs:w-[70%] lg:w-0">
                  <div className="flex flex-col gap-1 text-[13px] leading-24px">
                    <span className="font-500">{item.title}</span>
                    <span className="font-400">#{item.meta.barcode}</span>
                  </div>
                  <div className="flex gap-4 items-center">
                    <div className="flex items-center gap-2">
                      <span className="p-1.5 text-[20px] cursor-pointer">
                        <MinusIcon className="h-5 w-5" onClick={() =>decCart(item.id)}/>
                      </span>
                      <span className="border border-[#D9D9D9] px-3 text-[18px]">
                        {item.quantity}
                      </span>
                      <span className="p-1.5 text-[20px] cursor-pointer">
                        <PlusIcon className="h-5 w-5" onClick={() => incCart(item.id) }/>
                      </span>
                    </div>
                    <span>{item.price}</span>
                    <XMarkIcon
                      className="h-6 w-6 ml-[-1px] p-1 cursor-pointer"
                      onClick={() => handleRemove(item.id)}
                    />
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
      {/* order summary */}
      <div className="ordersummary xs:w-[100%] md:w-[40%] xl:w-[70%] py-8 xs:px-2 md:px-6 lg:px-10 flex flex-col gap-8 border border-[#EBEBEB] rounded-lg">
        <span className="font-700px text-[20px] leading-[16px]">
          Order Summary
        </span>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label
              for="PromoCode"
              className="font-500 text-14px leading-[16px]"
            >
              Discount code/Promo code
            </label>
            <input
              type="text"
              name="PromoCode"
              placeholder="Code"
              className="p-2 outline-none border-[1.5px] border-[#EBEBEB] rounded-md text-14px indent-1"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label
              for="cardnumber"
              className="font-500 text-14px leading-[16px]"
            >
              Your bonus card number
            </label>
            <div className="border-[1.5px] border-[#EBEBEB] rounded-md text-14px p-2 flex justify-between">
              <input
                type="text"
                name="cardnumber"
                placeholder="Enter Card Number"
                className=" outline-none text-14px indent-1"
              />
              <button className="border border-black text-black p-1 font-500 text-14px leading-[16px] rounded-md px-3 mr-1">
                Apply
              </button>
            </div>
          </div>
          <div className="subtotal flex flex-col gap-3 mt-2">
            <div className="1 flex justify-between font-500 text-16px leading-24px tracking-3">
              <span>Subtotal</span>
              <span>${subTotal}</span>
            </div>
            <div className="2 flex justify-between text-15px leading-32px">
              <span className="text-[#545454] font-400">Estimated Tax</span>
              <span className="font-500">${subTax}</span>
            </div>
            <div className="3 flex justify-between text-15px leading-32px">
              <span className="text-[#545454] font-400">
                Estimated shipping & Handling
              </span>
              <span className="font-500">${deliveryFee}</span>
            </div>
            <div className="4 flex justify-between font-500 text-16px leading-24px tracking-3">
              <span>Total</span>
              <span>${Total}</span>
            </div>
          </div>
        </div>
        <Link to="/product/shoppingcart/address">
        <button className="bg-black text-white p-3 rounded-lg font-400 text-15px leading-24px">
          Checkout
        </button>
        </Link>
      </div>
    </div>
  );
};

export default ShoppingCart;
