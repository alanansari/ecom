import downArrow from "../../assets/icons/down-arrow.svg";
import categories from "../../data/Categories.json";
import { useState } from "react";

const Categories = () => {
  const [showCategories, setShowCategories] = useState(false);

  return (
    <div
      className=" relative box-border hidden md:flex items-center text-gray-500 p-2 text-sm hover:cursor-pointer"
      onClick={() => setShowCategories(!showCategories)}
      onMouseLeave={() => setShowCategories(false)}
    >
      <div>Categories</div>
      <img src={downArrow} className="h-6 w-6 text-gray-400" alt="down arrow" />
      {showCategories && (
        <div className="absolute w-[60vw] top-10 bg-slate-100 rounded-md shadow-lg hover:cursor-default flex flex-wrap gap-10 justify-around p-4">
          {categories.map((category) => (
            <div className="flex flex-col" key={category.id}>
              <div
                className="p-2 hover:bg-slate-200 rounded-md font-bold text-black cursor-pointer"
              >
                {category.name}
              </div>
              {category.subCategories &&
                category.subCategories.map((subCategory) => (
                  <div key={subCategory.id} className="p-2 hover:bg-slate-200 text-sm rounded-md cursor-pointer">
                    {subCategory.name}
                  </div>
                ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Categories;
