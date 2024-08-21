import React from "react";

const SaleBanner = () => {
  return (
    <div className="bg-custom-gradient flex xs:flex-col lg:flex-row lg:justify-between xs:justify-center xs:items-center relative">
      <div className="lg:hidden flex">
        <img src="images/sale-short-1.png" alt="" className="absolute left-0" />
        <img src="images/sale-short-2.png" alt="" className=""/>
        <img src="images/sale-short-3.png" alt="" className="absolute right-0"/>
      </div>
      <div className="lg:block xs:hidden">
        <img src="images/sale-banner-1.png" alt="" className="pl-8" />
        <img src="images/sale-banner-2.png" alt="" />
      </div>
      <div className="flex flex-col items-center justify-center xs:mt-20 lg:mt-0 lg:ml-[-100px] lg:mb-[-100px] xs:m-2 xs:text-center sm:m-0">
        <h2 className=" xs:text-[58px] md:text-[66px] lg:text-72px leading-72px text-white pb-3">
          <span className="font-200">Big Summer</span>
          <span className="font-300"> Sale</span>
        </h2>
        <p className="text-[#909090] text-16 font-400 leading-32px xs:pt-5 md:pt-0 pb-8">
          Commodo fames vitae vitae leo mauris in. Eu consequat.
        </p>
        <button className="border border-white text-white bg-transparent py-2 px-6 rounded xs:w-[184px] h-[56px] md:w-auto md:h-auto">
          Shop Now
        </button>
      </div>
      <div className="xs:block lg:hidden self-end">
        <img src="images/sale-short-4.png" alt="" />
      </div>
      <div className="lg:block xs:hidden">
        <img src="images/sale-banner-3.png" alt="" className="" />
        <img
          src="images/sale-banner-4.png"
          alt=""
          className=" object-cover absolute bottom-0 right-0"
        />
      </div>
    </div>
  );
};

export default SaleBanner;
