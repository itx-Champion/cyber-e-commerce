import React from "react";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/outline";
import CategoryList from "./CategoryList";
import iconData from '../../assets/iconsList'

const Category = () => {
  return (
    <div className="category-container  bg-[#FAFAFA] xs:py-8 xs:px-10  md:py-[80px] md:px-[120px]">
      <div className="category-header flex justify-between items-center border-b pb-4 mb-4">
        <h2 className="text-24px font-500 leading-32px">Browse by Category</h2>
        {/* Chevron icons for moving categories */}
        <div className="icons flex gap-4">
          <ChevronLeftIcon className="h-7 w-7 text-black cursor-pointer" />
          <ChevronRightIcon className="h-7 w-7 text-black cursor-pointer" />
        </div>
      </div>
      {/* Second div - Categories */}
        <CategoryList iconData={iconData} />
    </div>
  );
};

export default Category;
