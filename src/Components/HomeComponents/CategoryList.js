import React from "react";

const CategoryList = ({ iconData }) => {
  return (
    <div className="category-list grid lg:grid-cols-6 gap-7 xs:grid-cols-2">
      {iconData.map((category, index) => (
        <div
          key={index}
          className="category-item flex flex-col items-center justify-center py-5 px-4 rounded-md bg-[#EDEDED]"
        >
          {typeof category.icon === "string" ? (
            <img
              src={category.icon}
              alt="gaming"
              className="w-9 h-9 text-gray-700 mb-2 "
            />
          ) : (
            <category.icon className="h-9 w-9 text-gray-700 mb-2" />
          )}

          <span className="text-15px leading-24px font-400 whitespace-nowrap">
            {category.name}
          </span>
        </div>
      ))}
    </div>
  );
};

export default CategoryList;
