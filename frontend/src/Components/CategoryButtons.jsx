import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

function CategoryButtons() {
  // const useDispatch = useDispatch();
  const categories = useSelector((state) => state.blogs.blogsCategory);
  const [buttonColor, setButtonColor] = useState(null)

  useEffect(() => {
    if (categories.length > 0 && buttonColor === null) {
        setButtonColor("all");
    }
  }, [categories, buttonColor]);

  const handleClick = (categoryId) => {
    setButtonColor(categoryId);
  };
  return (
    <>
      <div className="flex px-20 mt-10 gap-3">
        <button className={`border px-3 py-1 rounded-full ${buttonColor === "all" ? "bg-black text-white" : "bg-white text-black"}`} onClick={() => handleClick("all")}>All blogs</button>
        {categories.map((category) => {
            return(
                <button
                key={category._id}
                className={`border px-3 py-1 rounded-full 
                  ${buttonColor === category._id ? 'bg-black text-white' : 'bg-white text-black'}`}
                onClick={() => handleClick(category._id)}
              >
                {category.name}
              </button>
            )
        })}
      </div>
    </>
  );
}

export default CategoryButtons;
