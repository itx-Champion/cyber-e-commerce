import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  ChevronRightIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from "@heroicons/react/24/outline";
import axios from "axios";
import DiscountItems from "./HomeComponents/Discount-Items";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {addToCart} from '../Redux/Actions/addToCart'

const ProductDetails = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [mainImage, setMainImage] = useState("");
  const [toggle, setToggle] = useState(false);
  const [review, setReview] = useState([]);
  // data fetch
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const product = await axios.get(`https://dummyjson.com/products/${id}`);
        setProduct(product.data);
        setMainImage(product.data.images[0]);
        const allReview = product.data.reviews;
        setReview(allReview);
      } catch (error) {
        console.error("Error fetching the product:", error);
      }
    };

    fetchProduct();
  }, [id]);
  if (!product)
    return (
      <div className="text-16px font-500 text-black text-center py-14">
        Please wait a minute, Product is Loading...
      </div>
    );
    const HandleAddToCart=()=>{
      dispatch(addToCart(product));
      navigate('/product/shoppingcart');
    }

  return (
    <div>
      <div className="product-detail py-5 xs:px-[30px] lg:px-[120px] border border-t-2">
        <div className="flex flex-row xs:flex-wrap items-center text-[#A4A4A4] text-[16px] font-400 leading-4 py-7">
          <span>Home</span>
          <ChevronRightIcon className="h-4 w-4 mx-2 text-[#A4A4A4]" />
          <span>catalog</span>
          <ChevronRightIcon className="h-4 w-4 mx-2 text-[#A4A4A4]" />
          <span className="">SmartPhones</span>
          <ChevronRightIcon className="h-4 w-4 mx-2 text-[#A4A4A4]" />
          <span className="">{product.brand}</span>
          <ChevronRightIcon className="h-4 w-4 mx-2 text-[#A4A4A4]" />
          <span className="text-black">{product.title}</span>
        </div>
        {/* product overview */}
        <div className="flex xs:flex-col lg:flex-row gap-5 justify-center items-center xs:py-6 md:py-14">
          <div className="left-side flex xs:flex-col lg:flex-row gap-5 items-center md:w-[50%]">
            <div className="small-images flex xs:flex-row lg:flex-col items-center lg:justify-center gap-3 xs:w-[70%] xs:justify-around lg:w-[15%] py-3 lg:order-1 xs:order-2">
              {product.images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={product.title}
                  className={`max-h-[80px] max-w-[70px] cursor-pointer ${
                    mainImage === image ? "opacity-100" : "opacity-50"
                  }`}
                  onClick={() => setMainImage(image)}
                />
              ))}
            </div>
            <div className="main-image w-[80%] lg:order-2 xs:order-1">
              <img
                src={mainImage}
                alt={product.title}
                className="max-h-[550px]"
              />
            </div>
          </div>
          {/* right side */}
          <div className="right-side flex flex-col gap-5 md:w-[70%] lg:w-[50%]">
            <h2 className="font-[600px] text-[32px] leading-40px">
              {product.title}
            </h2>
            {/* price */}
            <div className="flex gap-3 justify-start items-center ">
              <span className="font-400 text-[22px] leading-48px text-black">
                ${product.price}
              </span>
              <span className="font-300 text-[18px] leading-32px text-[#A0A0A0] line-through">
                ${product.price + 20}
              </span>
            </div>
            {/* colors */}
            <div className="flex gap-2 items-center mb-3">
              <span className="mr-3">Select color:</span>
              <span className="bg-black rounded-full h-7 w-7 cursor-pointer"></span>
              <span className="bg-[#781DBC] rounded-full h-7 w-7 cursor-pointer"></span>
              <span className="bg-[#E10000] rounded-full h-7 w-7 cursor-pointer"></span>
              <span className="bg-[#E1B000] rounded-full h-7 w-7 cursor-pointer"></span>
              <span className="bg-[#E8E8E8] rounded-full h-7 w-7 cursor-pointer"></span>
            </div>
            {/* capacity */}
            <div className="flex  gap-4  text-[14px] font-500 leading-16px">
              <span className="border-2 rounded-md p-1 w-1/4 text-center text-[#6F6F6F]">
                128GB
              </span>
              <span className="border-2 rounded-md p-1 w-1/4 text-center border-black">
                256GB
              </span>
              <span className="border-2 rounded-md p-1 w-1/4 text-center text-[#6F6F6F]">
                512GB
              </span>
              <span className="border-2 rounded-md p-1 w-1/4 text-center text-[#6F6F6F]">
                1Tb
              </span>
            </div>

            {/* specification */}
            <div className="grid xs:grid-cols-2 sm:grid-cols-3 gap-3 mt-1">
              <div className="1 flex items-center bg-[#F4F4F4] py-4 px-3 gap-2 rounded-md">
                <img
                  src="/images/Screensizeicon.png"
                  alt="screenSize"
                  className="w-[15%] h-6"
                />
                <div className="flex flex-col font-400 text-14px leading-18px w-[85%]">
                  <span className="text-[#A7A7A7]">Screen size</span>
                  <span>6.7"</span>
                </div>
              </div>
              <div className="2 flex items-center bg-[#F4F4F4] py-4 px-3 gap-2 rounded-md">
                <img
                  src="/images/cpuicon.png"
                  alt="screenSize"
                  className="w-[15%] h-6"
                />
                <div className="flex flex-col font-400 text-14px leading-18px w-[85%]">
                  <span className="text-[#A7A7A7]">CPU</span>
                  <span>6</span>
                </div>
              </div>
              <div className="3 flex items-center bg-[#F4F4F4] py-4 px-3 gap-2 rounded-md">
                <img
                  src="/images/coresicon.png"
                  alt="screenSize"
                  className="w-[15%] h-6"
                />
                <div className="flex flex-col font-400 text-14px leading-18px w-[85%]">
                  <span className="text-[#A7A7A7]">Number of Cores </span>
                  <span>6</span>
                </div>
              </div>
              <div className="4 flex items-center bg-[#F4F4F4] py-4 px-3 gap-2 rounded-md">
                <img
                  src="/images/cameraicon.png"
                  alt="screenSize"
                  className="w-[15%] h-6"
                />
                <div className="flex flex-col font-400 text-14px leading-18px w-[85%]">
                  <span className="text-[#A7A7A7]">Main-Camera</span>
                  <span>48-12-12 MP</span>
                </div>
              </div>
              <div className="5 flex items-center bg-[#F4F4F4] py-4 px-3 gap-2 rounded-md">
                <img
                  src="/images/fcameraicon.png"
                  alt="screenSize"
                  className="w-[15%] h-6"
                />
                <div className="flex flex-col font-400 text-14px leading-18px w-[85%]">
                  <span className="text-[#A7A7A7]">Front-camera</span>
                  <span>12 MP</span>
                </div>
              </div>
              <div className="6 flex items-center bg-[#F4F4F4] py-4 px-3 gap-2 rounded-md">
                <img
                  src="/images/batteryicon.png"
                  alt="screenSize"
                  className="w-[15%] h-6"
                />
                <div className="flex flex-col font-400 text-14px leading-18px w-[85%]">
                  <span className="text-[#A7A7A7]">Battery capacity</span>
                  <span>4323 mAh</span>
                </div>
              </div>
            </div>
            <p className="font-400 text-[14px] leading-24px text-[#6C6C6C]">
              {product.description}
              <span className="underline text-black">More...</span>
            </p>
            {/* buttons */}
            <div className="flex xs:flex-col sm:flex-row gap-4 justify-between font-500 text-16px leading-24px">
              <button className="border-2 border-black rounded-md text-black py-4 xs:px-4 sm:px-10 sm:w-[45%] whitespace-nowrap">
                Add to Wishlist
              </button>
              <button className="text-white bg-black rounded-md px-10 py-4 sm:w-[45%] xs:whitespace-nowrap sm:whitespace-normal text-center" onClick={HandleAddToCart}>
                Add to Cart
              </button>
            </div>
            {/* Delivery */}
            <div className="flex xs:justify-around sm:justify-between gap-2">
              <div className="1 flex xs:flex-col sm:flex-row items-center gap-3">
                <div className="bg-[#F4F4F4] p-3 rounded-lg">
                  <img
                    src="/images/deliveryicon.png"
                    alt=""
                    className="h-7 w-7"
                  />
                </div>
                <div className="flex flex-col font-500 text-14px leading-24px">
                  <span className="text-[#717171]">Free Delivery</span>
                  <span>1-2 day</span>
                </div>
              </div>
              <div className="2 flex xs:flex-col sm:flex-row items-center gap-3">
                <div className="bg-[#F4F4F4] p-3 rounded-lg">
                  <img src="/images/stockicon.png" alt="" className="h-7 w-7" />
                </div>
                <div className="flex flex-col font-500 text-14px leading-24px">
                  <span className="text-[#717171]">In Stock</span>
                  <span>Today</span>
                </div>
              </div>
              <div className="3 flex xs:flex-col sm:flex-row items-center gap-3">
                <div className="bg-[#F4F4F4] p-3 rounded-lg">
                  <img
                    src="/images/verifyicon.png"
                    alt=""
                    className="h-7 w-7"
                  />
                </div>
                <div className="flex flex-col font-500 text-14px leading-24px">
                  <span className="text-[#717171]">Free Guaranteed</span>
                  <span>1 Year</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* deatils */}
      <div className="2nd-full-detail bg-[#FAFAFA] md:px-[120px] xs:px-[30px] py-14">
        <div className="detail flex flex-col py-10 px-6 gap-5 bg-white">
          {/* detail */}
          <div className="flex flex-col gap-7">
            <h2 className="font-500 text-[28px] leading-32px">Detail</h2>
            <p className=" font-400 text-[15px] leading-32px text-[#9D9D9D]">
              {product.description}
            </p>
          </div>
          {/* screen */}
          <div className=" flex flex-col gap-5">
            <div className="screen flex flex-col gap-5">
              <h3 className="font-500 text-[20px] leading-32px">Screen</h3>
              <div className="flex justify-between border-b border-[#CDCDCD] font-400 text-[14px] leading-24px pb-3">
                <span>Screen diagonal</span>
                <span>6.7"</span>
              </div>
              <div className="flex justify-between border-b border-[#CDCDCD] font-400 text-[14px] leading-24px  pb-3">
                <span>The screen resolution</span>
                <span>1232*345</span>
              </div>
              <div className="flex justify-between border-b border-[#CDCDCD] font-400 text-[14px] leading-24px  pb-3">
                <span>The screen refresh rate</span>
                <span>120 Hz</span>
              </div>
              <div className="flex justify-between border-b border-[#CDCDCD] font-400 text-[14px] leading-24px  pb-3">
                <span>The pixel density</span>
                <span>460 ppl</span>
              </div>
            </div>
            {/* cpu */}
            <div className="flex flex-col gap-4">
              <h3 className="font-500 text-[20px] leading-24px">CPU</h3>
              <span className="flex justify-between mb-2 border-b-2 border-[#CDCDCD] pb-2 font-400 text-[14px] leading-24px">
                <span>CPU</span>
                <span>A16 Bionic</span>
              </span>
              <span className="flex justify-between font-400 text-[14px] leading-24px">
                <span>Number of cores</span>
                <span>6</span>
              </span>
            </div>
          </div>
          {/* button */}
          <div
            className="flex gap-2 items-center justify-center cursor-pointer p-2 md:w-[20%] border border-[#545454] rounded-md self-center xs:w-[35%] "
            onClick={() => setToggle(!toggle)}
          >
            <span className="font-400 text-14px leading-24px whitespace-nowrap">
              View More
            </span>
            {toggle ? (
              <ChevronUpIcon className="h-4 w-4" />
            ) : (
              <ChevronDownIcon className="h-4 w-4" />
            )}
          </div>
        </div>
      </div>
      {/* rating's */}
      <div className="3rd-rating md:px-[120px] xs:px-[30px] py-10">
        <div className="rating-details flex flex-col gap-4">
          <div className="flex flex-col gap-10">
            <h3 className="font-500 text-24px leading-32px">Reviews</h3>
            {/* overall rating */}
            <div className="overall-rating flex xs:flex-col md:flex-row xs:gap-2 lg:gap-10">
              <div className="rounded-[1rem] bg-[#FAFAFA] xs:py-7 xs:px-2 lg:py-10 lg:px-5 flex sm:flex-col gap-3 justify-center items-center ">
                <div className="flex flex-col gap-3 items-center">
                  <span className="font-500 text-[56px] leading-48px">4.8</span>
                  <span className="font-500 text-15px leading-[16px] opacity-[50%]">
                    of 125 reviews
                  </span>
                </div>
                <img src="/images/starsmain.png" alt="stars-rating" />
              </div>
              <div className="bar-rating flex flex-col gap-4 xs:w-[100%] md:w-[80%] my-auto">
                <div className="flex flex-col gap-4">
                  <div className="bar-1 flex items-center gap-4">
                    <span className="font-600 text-[18px] leading-[16px] w-[150px]">
                      Excellent
                    </span>
                    <div className=" bg-[#D9D9D9] rounded-full h-1 w-[570px]">
                      <div className="bg-[#FFB547] h-1 rounded-full w-[99%]"></div>
                    </div>
                    <span className="font-500 text-16px leading-[16px] opacity-[40%] w-[25px]">
                      100
                    </span>
                  </div>
                  <div className="bar-2 flex items-center gap-4">
                    <span className="font-600 text-[18px] leading-[16px] w-[150px]">
                      Good
                    </span>
                    <div className=" bg-[#D9D9D9] rounded-full h-1 w-[570px]">
                      <div className="bg-[#FFB547] h-1 rounded-full w-[60%]"></div>
                    </div>
                    <span className="font-500 text-16px leading-[16px] opacity-[40%] w-[25px] text-right">
                      1
                    </span>
                  </div>
                  <div className="bar-3 flex items-center gap-4">
                    <span className="font-600 text-[18px] leading-[16px] w-[150px]">
                      Average
                    </span>
                    <div className=" bg-[#D9D9D9] rounded-full h-1 w-[570px]">
                      <div className="bg-[#FFB547] h-1 rounded-full w-[30%]"></div>
                    </div>
                    <span className="font-500 text-16px leading-[16px] opacity-[40%] w-[25px] text-right">
                      3
                    </span>
                  </div>
                  <div className="bar-4 flex items-center gap-4">
                    <span className="font-600 text-[18px] leading-[16px] w-[150px]">
                      Below Average
                    </span>
                    <div className=" bg-[#D9D9D9] rounded-full h-1 w-[570px]">
                      <div className="bg-[#FFB547] h-1 rounded-full w-[45%]"></div>
                    </div>
                    <span className="font-500 text-16px leading-[16px] opacity-[40%] w-[25px] text-right">
                      8
                    </span>
                  </div>
                  <div className="bar-5 flex items-center gap-4">
                    <span className="font-600 text-[18px] leading-[16px] w-[150px]">
                      Poor
                    </span>
                    <div className=" bg-[#D9D9D9] rounded-full h-1 w-[570px]">
                      <div className="bg-[#FFB547] h-1 rounded-full w-[12%]"></div>
                    </div>
                    <span className="font-500 text-16px leading-[16px] opacity-[40%] w-[25px] text-right">
                      1
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <input
              type="text"
              placeholder="Leave Comment..."
              className="w-full p-4 border border-[#CDCDCD] font-400 text-[20px] leading-18px rounded-lg "
            />
          </div>

          {/* users */}
          <div className="flex flex-col gap-5">
            {review.map((review, index) => (
              <div
                className="bg-[#FAFAFA] flex gap-6 p-4 rounded-lg "
                key={index}
              >
                <img
                  src="/images/user1.png"
                  alt="user-1"
                  className="h-14 w-14"
                />
                <div className="flex flex-col gap-1 w-[100%]">
                  <div className="flex justify-between">
                    <span className="font-500 text-[17px] leading-24px">
                      {review.reviewerName}
                    </span>
                    <span className="font-500 text-[14px] leading-18px opacity-[40%]">
                      24 May,2024
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <img
                      src="/images/stars1.png"
                      alt="star-rating"
                      className="h-5 w-28"
                    />
                    <span className="font-500 text-[14px] leading-18px opacity-[40%]">
                      {review.rating} Stars
                    </span>
                  </div>
                  <span>
                    Email :{" "}
                    <span className="font-500 text-[14px] leading-18px opacity-[40%]">
                      {review.reviewerEmail}
                    </span>
                  </span>

                  <p className="text-[#7E7E7E] text-14px">{review.comment}</p>
                </div>
              </div>
            ))}

            <div
              className="flex gap-2 items-center justify-center cursor-pointer p-2 md:w-[20%] border border-[#545454] rounded-md self-center xs:w-[35%] "
              onClick={() => setToggle(!toggle)}
            >
              <span className="font-400 text-14px leading-24px whitespace-nowrap">
                View More
              </span>
              {toggle ? (
                <ChevronUpIcon className="h-4 w-4" />
              ) : (
                <ChevronDownIcon className="h-4 w-4" />
              )}
            </div>
          </div>
        </div>
      </div>
      <DiscountItems />
    </div>
  );
};

export default ProductDetails;
