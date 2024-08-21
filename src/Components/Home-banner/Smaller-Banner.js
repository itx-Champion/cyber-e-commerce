import React from "react";

const SmallerBanner = () => {
  return (
    <section className="flex items-stretch xs:flex-col lg:flex-row">
      <div className="left-div flex flex-1 flex-col xs:w-full  lg:w-1/2">
        <div className="div-1 flex xs:flex-col lg:flex-row lg:order-[-1] xs:text-center lg:text-left xs:py-6 xs:px-4 lg:p-0 h-[60%]">
          <div className="h-full xs:self-center">
            <img
              src="images/PlayStation.png"
              alt=""
              className="w-full h-full object-cover lg:block xs:hidden" 
            />
            <img src="images/Playstation (2).png" className="xs:block lg:hidden  w-42" alt="play-station" />
          </div>
          <div className="div1-content lg:w-[70%] flex flex-col gap-4 lg:py-[80px] px-2 xs:w-full xs:py-4">
            <h2 className="font-500 text-49px leading-40px">Playstation 5</h2>
            <p className="leading-24px text-[#909090] xs:text-16px lg:text-14px">
              Incredibly powerful CPUs, GPUs, and an SSD with integrated I/O
              will redefine your PlayStation experience.
            </p>
          </div>
        </div>

        <div className="flex xs:flex-col lg:flex-row h-[40%]">
          <div className="div-2 bg-[#EDEDED] flex flex-1 items-center xs:flex-col lg:flex-row xs:text-center lg:text-left xs:py-6 xs:px-4 lg:p-0">
            <div className="image w-[29%] flex justify-center items-center">
              <img
                src="images/hero__gnfk5g59t0qe_xlarge_2x 1.png"
                alt="head-phone"
                className="h-full xs:hidden lg:block"
              />
              <img src="images/airpods-full.png" className="xs:block lg:hidden " alt="headphone" />
            </div>
            <div className="div-2-content lg:pl-8 xs:w-full xs:p-4">
              <h2 className="text-29px leading-40px">
                <span className="font-300">Apple </span>
                <span className="font-300 xs:inline lg:block">
                  AirPods <span className="font-500">Max</span>
                </span>
              </h2>
              <p className="text-[#909090] font-500 xs:text-16px lg:text-14px leading-24px">
                Computational audio. Listen, it's powerful
              </p>
            </div>
          </div>

          <div className="div-3 flex items-center flex-1 bg-[#353535] xs:flex-col lg:flex-row xs:text-center lg:text-left xs:py-6 xs:px-4 lg:p-0">
            <div className="image w-[70%] h-[80%] flex justify-center items-center lg:justify-start">
              <img
                src="images/image 36.png"
                alt="image-item"
                className="h-full lg:block xs:hidden"
              />
              <img src="images/vision-full.png" alt="vision-full" className="xs:block lg:hidden" />
            </div>
            <div className="div-3-content pr-2">
              <h2 className="text-29px leading-40px text-white">
                <span className="font-300">Apple </span>
                <span className="font-300 lg:block xs:inline">
                  Vision <span className="font-500">Pro</span>
                </span>
              </h2>
              <p className="font-500 xs:text-16px lg:text-14px leading-24px text-[#909090]">
                An immersive way to experience entertainment
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="right-div flex-1 bg-[#EDEDED] flex items-center gap-[1px] xs:flex-col xs:w-full xs:text-center xs:py-6 xs:px-4 lg:py-[40px] lg:pl-8 lg:flex-row lg:text-left lg:pr-0 xs:h-[70%]">
        <div className="right-content flex flex-col gap-4 xs:order-2 lg:order-1">
          <h2 className="leading-72px text-64px">
            <span className="font-200">Macbook </span>
            <span className="font-500">Air</span>
          </h2>
          <p className="xs:text-16px lg:text-14px leading-24px font-500 text-[#909090]">
            The new 15‑inch MacBook Air makes room for more of what you love
            with a spacious Liquid Retina display.
          </p>
          <button className="font-500 text-[16px] leading-[24px] text-center border border-black rounded-md py-4 px-12 xs:w-full sm:w-[184px] h-[56px] sm:self-center lg:self-start">
            Shop Now
          </button>
        </div>
        <div className="right-img h-full w-[80%] flex justify-center items-center lg:order-2 xs:order-1">
          <img
            src="images/MacBook Pro 14.png"
            alt="macbook-pro"
            className="h-full w-full xs:hidden lg:block"
          />
          <img src="images/macbook-full.png" alt="macbook-full" className="xs:block lg:hidden" />
        </div>
      </div>
    </section>
  );
};

export default SmallerBanner;
