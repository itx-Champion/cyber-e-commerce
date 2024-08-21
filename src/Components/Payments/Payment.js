import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { removeToCart } from "../../Redux/Actions/removeToCart";
import { useState } from "react";

const Payment = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [paymentOption, setPaymentOption] = useState("credit");
  const address = useSelector((state) => state.address.address);
  const cart = useSelector((state) => state.cart.cartItems);
  const method = useSelector((state) => state.method.method);
  const methodFee = parseFloat(method.price);
  console.log("method fee", methodFee);
  const subTotal = cart.reduce(
    (accum, item) => accum + item.price * item.quantity,
    0
  );
  const tax = 0.02;
  const deliveryFee = 29;
  const subTax = subTotal > 0 ? (subTotal * tax).toFixed(2) : 0;
  const Total =
    subTotal > 0
      ? (
          parseFloat(subTotal) +
          parseFloat(subTax) +
          parseFloat(deliveryFee) +
          methodFee
        ).toFixed(2)
      : 0;

  const BackShipping = () => {
    navigate("/product/shoppingcart/shipping");
  };
  const PayAfter = () => {
    navigate("/product/shoppingcart/purchased");
  };
  const RemoveItem = (id) => {
    dispatch(removeToCart(id));
  };
  const PaymentOption = (name) => {
    setPaymentOption(name);
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
              className="h-7 w-7 opacity-50"
            />
            <div className="flex flex-col font-500 text-[#B2B2B2]">
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
              className="h-7 w-7"
            />
            <div className="flex flex-col font-500">
              <span className="text-[14px] leading-18px">Step 3</span>
              <span className="[text-19px] leading-[24px] ">Payment</span>
            </div>
          </div>
        </Link>
      </div>
      {/* bottom */}
      <div className="flex xs:flex-col md:flex-row   pt-4 pb-10 gap-20">
        {/* summary */}
        <div className="summary flex flex-col gap-4 flex-1 border border-[#EBEBEB] py-6 px-3 rounded-lg">
          <span className="font-500 text-[20px] leading-18px">Summary</span>
          {/* cart-items */}
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
                  <span className="flex items-center font-400 text-16px leading-24px">
                    {item.brand}
                  </span>
                </div>
                <div className="flex">
                  <span>{item.quantity * item.price}</span>
                  <XMarkIcon
                    className="h-6 w-6 text-[text-[#545454] ml-5 cursor-pointer"
                    onClick={() => RemoveItem(item.id)}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* address */}
          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-3">
              <span className="font-500 text-[18px] leading-18px ">
                Address
              </span>
              <span className="font-400 text-16px leading-24px text-[#545454]">
                {address[0].name}
              </span>
              <div className="flex gap-2 items-center text-[#545454]">
                <span className="font-400 text-16px leading-24px">
                  {address[0].details}
                </span>
                <span className="p-1 bg-black text-white rounded-md font-400 text-[10px]">
                  {address[0].option}
                </span>
              </div>
              <span className="font-400 text-15px leading-24px mt-[-12px] text-[#545454]">
                {address[0].contact}
              </span>

              <span className="font-500 text-[18px] leading-18px ">
                Shipment method
              </span>
              <div className="flex items-center justify-between  mt-[-8px] text-[#545454]">
                <div className="flex gap-4 items-center">
                  <span className="font-400 text-16px leading-24px">
                    {method.name}
                  </span>
                  <span className="font-500 text-[14px] leading-18px text-[#545454]">
                    {method.date}
                  </span>
                </div>
                <span className="font-400 text-16px leading-24px">
                  ${method.price}
                </span>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-center font-500 text-[16px] leading-24px">
                <span className="text-[18px]">Subtotal</span>
                <span>${subTotal}</span>
              </div>
              <div className="flex items-center justify-between mb-[-14px]">
                <span className="font-400 text-16px leading-32px text-[#545454]">
                  Estimated Tax
                </span>
                <span>${subTax}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-400 text-16px leading-32px text-[#545454]">
                  Estimated Shipping & Handling
                </span>
                <span>${deliveryFee}</span>
              </div>
              <div className="flex items-center justify-between font-500 text-[16px] leading-24px">
                <span className="text-[18px]">Total</span>
                <span>${Total}</span>
              </div>
            </div>
          </div>
        </div>
        {/* credit card */}
        <div className="card flex flex-1 flex-col gap-6">
          <span className="font-[700px] text-[20px] leading-18px">Payment</span>
          <div className="flex w-[60%] font-500 text-[14px] leading-18px gap-10 items-center whitespace-nowrap">
            <span
              className={`py-2 ${
                paymentOption === "credit"
                  ? "border-b border-black"
                  : "opacity-50"
              }  cursor-pointer`}
              onClick={() => PaymentOption("credit")}
            >
              Credit Card
            </span>
            <span
              className={`${
                paymentOption === "paypal"
                  ? "border-b border-black"
                  : "opacity-50"
              } cursor-pointer py-2`}
              onClick={() => PaymentOption("paypal")}
            >
              Paypal
            </span>
            <span
              className={`${
                paymentOption === "paypalcredit"
                  ? "border-b border-black"
                  : "opacity-50"
              } cursor-pointer py-2`}
              onClick={() => PaymentOption("paypalcredit")}
            >
              Paypal Credit
            </span>
          </div>

          <img
            src="/images/Creditcard.png"
            alt="credit card"
            className={`max-h-48 max-w-52 ${
              paymentOption === "credit" ? "block" : "hidden"
            }`}
          />
          <img
            src="/images/paypal.webp"
            alt="credit card"
            className={`max-h-44 max-w-52 ${
              paymentOption === "paypal" ? "block" : "hidden"
            }`}
          />
          <img
            src="/images/paypal2.webp"
            alt="credit card"
            className={`max-h-44 max-w-52 ${
              paymentOption === "paypalcredit" ? "block" : "hidden"
            }`}
          />
          <div className=" flex flex-col space-y-4">
            <input
              type="text"
              placeholder="Cardholder Name"
              className="border rounded-md font-300 text-[14px] p-1 indent-2"
            />
            <input
              type="number"
              placeholder="Card Number"
              className="border rounded-md font-300 text-[14px] p-1 indent-2"
            />
            <div className="flex md:flex-col lg:flex-row justify-between ">
              <input
                type="number"
                placeholder="Exp.Date"
                className="border rounded-md font-300 text-[14px] p-1 indent-2"
              />
              <input
                type="number"
                placeholder="CVV"
                className="border rounded-md font-300 text-[14px] p-1 indent-2"
              />
            </div>
          </div>
          <div className="flex gap-2 items-center ">
            <label className="circular-checkbox flex items-center">
              <input type="checkbox" />
              <span></span>
            </label>
            <span>Same as billing address</span>
          </div>
          {/* btn */}
          <div className="flex justify-between gap-6">
            <button
              className="xs:w-[40%] lg:w-[50%] border py-3 border-black text-black rounded-md"
              onClick={BackShipping}
            >
              Back
            </button>
            <button
              className="xs:w-[40%] lg:w-[50%] border py-3 border-black bg-black text-white rounded-md"
              onClick={PayAfter}
            >
              Pay
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
