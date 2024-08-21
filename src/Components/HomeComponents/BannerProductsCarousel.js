import React from "react";
import Slider from "react-slick";

const ProductCarousel = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: false,
  };
  return (
    <div>
      <div className="lg:grid grid-cols-4 xs:hidden">
        {/* First Product */}
        <div className="bg-white p-4 pb-8 flex flex-col items-start min-h-[400px]">
          <img 
            src="images/Group 1.png" 
            alt="Product 1" 
            className="w-96 h-72 object-contain mb-4" 
          />
          <h2 className="font-300px text-33px leading-48px mb-2">Popular Products</h2>
          <p className="text-14px font-500 leading-24px text-[#909090] mb-4">
            iPad combines a magnificent 10.2-inch Retina display, incredible
            performance, multitasking and ease of use.
          </p>
          <button className="bg-transparent border border-black text-black py-2 px-6 rounded">
            Shop Now
          </button>
        </div>

        {/* Second Product */}
        <div className="bg-[#F9F9F9] p-4 pb-8 flex flex-col items-start min-h-[400px]">
          <img 
            src="images/image 64.png" 
            alt="Product 2" 
            className="w-96 h-72 object-cover mb-4" 
          />
          <h2 className="font-300px text-33px leading-48px mb-2">Ipad Pro</h2>
          <p className="text-14px font-500 leading-24px text-[#909090] mb-4">
            iPad combines a magnificent 10.2-inch Retina display, incredible
            performance, multitasking and ease of use.
          </p>
          <button className="bg-transparent border border-black text-black py-2 px-6 rounded">
            Shop Now
          </button>
        </div>

        {/* Third Product */}
        <div className="bg-[#EAEAEA] p-4 pb-8 flex flex-col items-start min-h-[400px]">
          <img 
            src="images/image 41.png" 
            alt="Product 3" 
            className="w-96 h-72 object-cover mb-4" 
          />
          <h2 className="font-300px text-33px leading-48px mb-2">Samsung Galaxy</h2>
          <p className="text-14px font-500 leading-24px text-[#909090] mb-4">
            iPad combines a magnificent 10.2-inch Retina display, incredible
            performance, multitasking and ease of use.
          </p>
          <button className="bg-transparent border border-black text-black py-2 px-6 rounded">
            Shop Now
          </button>
        </div>

        {/* Fourth Product */}
        <div className="bg-black p-4 pb-8 flex flex-col items-start min-h-[400px]">
          <img 
            src="images/Macbook 1.png" 
            alt="Product 4" 
            className="w-96 h-72 object-cover mb-4" 
          />
          <h2 className="font-300px text-33px leading-48px text-white mb-2">
            Macbook Pro
          </h2>
          <p className="text-14px font-500 leading-24px text-[#909090] mb-4">
            iPad combines a magnificent 10.2-inch Retina display, incredible
            performance, multitasking and ease of use.
          </p>
          <button className="bg-transparent border border-white text-white py-2 px-6 rounded">
            Shop Now
          </button>
        </div>
      </div>
      <div className="md:max-w-[50%] xs:max-w-full mx-auto mb-8 xs:block lg:hidden">
      <Slider {...settings}>
        {/* First Product */}
        <div className="bg-white p-4 pb-8 flex flex-col md:items-start text-center min-h-[400px] ">
          <img 
            src="images/Group 1.png" 
            alt="Product 1" 
            className="w-96 h-72 object-contain mb-4 mx-auto md:mx-0" 
          />
          <h2 className="font-300px text-33px leading-48px mb-2">Popular Products</h2>
          <p className="text-14px font-500 leading-24px text-[#909090] mb-4">
            iPad combines a magnificent 10.2-inch Retina display, incredible
            performance, multitasking and ease of use.
          </p>
          <button className="bg-transparent border border-black text-black py-2 px-6 rounded">
            Shop Now
          </button>
        </div>

        {/* Second Product */}
        <div className="bg-[#F9F9F9] p-4 pb-8 flex flex-col md:items-start xs:items-center text-center min-h-[400px]">
          <img 
            src="images/image 64.png" 
            alt="Product 2" 
            className="w-96 h-72 object-cover mb-4 mx-auto md:mx-0" 
          />
          <h2 className="font-300px text-33px leading-48px mb-2">Ipad Pro</h2>
          <p className="text-14px font-500 leading-24px text-[#909090] mb-4">
            iPad combines a magnificent 10.2-inch Retina display, incredible
            performance, multitasking and ease of use.
          </p>
          <button className="bg-transparent border border-black text-black py-2 px-6 rounded">
            Shop Now
          </button>
        </div>

        {/* Third Product */}
        <div className="bg-[#EAEAEA] p-4 pb-8 flex flex-col md:items-start xs:items-center text-center min-h-[400px]">
          <img 
            src="images/image 41.png" 
            alt="Product 3" 
            className="w-96 h-72 object-cover mb-4 mx-auto md:mx-0" 
          />
          <h2 className="font-300px text-33px leading-48px mb-2">Samsung Galaxy</h2>
          <p className="text-14px font-500 leading-24px text-[#909090] mb-4">
            iPad combines a magnificent 10.2-inch Retina display, incredible
            performance, multitasking and ease of use.
          </p>
          <button className="bg-transparent border border-black text-black py-2 px-6 rounded">
            Shop Now
          </button>
        </div>

        {/* Fourth Product */}
        <div className="bg-black p-4 pb-8 flex flex-col md:items-start xs:items-center text-center min-h-[400px]">
          <img 
            src="images/Macbook 1.png" 
            alt="Product 4" 
            className="w-96 h-72 object-cover mb-4 mx-auto md:mx-0" 
          />
          <h2 className="font-300px text-33px leading-48px text-white mb-2">
            Macbook Pro
          </h2>
          <p className="text-14px font-500 leading-24px text-[#909090] mb-4">
            iPad combines a magnificent 10.2-inch Retina display, incredible
            performance, multitasking and ease of use.
          </p>
          <button className="bg-transparent border border-white text-white py-2 px-6 rounded">
            Shop Now
          </button>
        </div>
      </Slider>
    </div>
    </div>
  );
};

export default ProductCarousel;
