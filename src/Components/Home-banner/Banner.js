import React from "react";
const Banner = () => {
  return (
    <div className="main-Banner">
      <div className="banner bg-custom-gradient w-[100%] px-[120px] flex items-center xs:flex-col lg:flex-row xs:pt-[88px] lg:pt-0">
        <div className="Banner-content w-full lg:w-[714px] h-auto flex flex-col gap-6 xs:items-center lg:items-start">
          <div className="title flex flex-col gap-6 xs:items-center lg:items-start">
            <span className="main-banner-p">Pro. Beyond.</span>
            <h2 className="text-white xs:flex xs:flex-col xs:justify-center xs:items-center xmd:block">
              <span className="font-200 lg:text-96px xmd:text-[76px] leading-72px tracking--1 xs:w-full lg:w-auto xs:text-[67px] whitespace-nowrap ">
                IPhone 14
              </span>
              <span className="font-600 lg:text-96px xmd:text-[76px] xs:text-[67px] leading-72px tracking--1">
                Pro
              </span>
            </h2>
          </div>
          <p className="main-banner-p text-center lg:text-left text-base md:text-lg lg:text-xl xs:w-[370px] sm:w-auto">
            Created to change everything for the better. For everyone.
          </p>
          <button className="text-white text-center rounded-md border py-4 px-12 w-[184px] h-[56px]">
            Shop Now
          </button>
        </div>

        <div className="Banner-image xs:pt-6 lg:pt-0">
          <img
            src="/images/IphoneImage.png"
            alt="Iphone-image"
            className="h-auto w-auto xs:hidden lg:block"
          />
          <img
            src="images/iphone-image-half.png"
            alt="iphone"
            className="xs:block lg:hidden"
          />
        </div>
      </div>
    </div>
  );
};

export default Banner;
