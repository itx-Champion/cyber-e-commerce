// Footer.js
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTwitter,
  faFacebook,
  faTiktok,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";

const Footer = () => {
  return (
    <footer className="bg-black text-white xs:py-8 xs:px-10  md:py-[80px] md:px-[120px]">
      <div className="container mx-auto">
        {/* Main Section */}
        <div className="grid md:grid-cols-[1.6fr_1fr_1fr] gap-12 xs:text-center md:text-left">
          {/* First Column */}
          <div>
            <div className="flex xs:justify-center md:justify-start">
              <img src="/images/Logo.png" alt="logo-footer"  />
            </div>
            <p className="text-[#CFCFCF] text-14px font-500 leading-24px pt-5">
              We are a residential interior design firm located in Portland. Our
              boutique-studio offers more than
            </p>
          </div>
          {/* Second Column */}
          <div>
            <h3 className="mb-4 text-16px font-600 leading-[16px]">
              Services
            </h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:underline text-[#CFCFCF] text-14px">
                  Bonus program
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline text-[#CFCFCF] text-14px">
                  Gift cards
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline text-[#CFCFCF] text-14px">
                  Credit and payment
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline text-[#CFCFCF] text-14px">
                  Service contracts
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline text-[#CFCFCF] text-14px">
                  Non-cash account
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline text-[#CFCFCF] text-14px">
                  Payment
                </a>
              </li>
            </ul>
          </div>
          {/* Third Column */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-16px font-600 leading-[16px]">
              Assistance to the buyer
            </h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:underline text-[#CFCFCF] text-14px">
                  find an order
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline text-[#CFCFCF] text-14px">
                  Terms of delivery
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline text-[#CFCFCF] text-14px">
                  Exchange and returns of goods
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline text-[#CFCFCF] text-14px">
                  Guarantee
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline text-[#CFCFCF] text-14px">
                  FAQs
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline text-[#CFCFCF] text-14px">
                  Terms of use of the site
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Social Media Section */}
        <div className="mt-8 flex md:justify-start space-x-8 xs:justify-center">
          <a href="#" className="text-white hover:text-gray-400">
            <FontAwesomeIcon icon={faTwitter} className="w-4 h-4"/>
          </a>
          <a href="#" className="text-white hover:text-gray-400">
            <FontAwesomeIcon icon={faFacebook} className="w-4 h-4" />
          </a>
          <a href="#" className="text-white hover:text-gray-400">
            <FontAwesomeIcon icon={faTiktok} className="w-4 h-4" />
          </a>
          <a href="#" className="text-white hover:text-gray-400">
            <FontAwesomeIcon icon={faInstagram} className="w-4 h-4" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
