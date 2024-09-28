import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { filterBlogsByCategory, getBlogCategory, getBlogs } from "../features/blogs/blogSlice";

function CategoryButtons() {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.blogs.blogsCategory);
  const [buttonColor, setButtonColor] = useState(null)


  useEffect(() => {
    dispatch(getBlogs());
    dispatch(getBlogCategory())
    if (categories.length > 0 && buttonColor === null) {
        setButtonColor("all");
    }
  }, []);

  const handleClick = async (categoryId) => {
    if (buttonColor === categoryId) {
      setButtonColor("all");
      dispatch(getBlogs());
    } else {
      setButtonColor(categoryId);
      if (categoryId === "all") {
        dispatch(getBlogs());
      } else {
        try {
          await dispatch(filterBlogsByCategory(categoryId)).unwrap();
        } catch (error) {
          return error;
        }
      }
    }
  };
  
  return (
    <>
    <div className="px-5 md:px-16 mt-10">
      <div className="flex gap-3 pb-4 overflow-x-scroll scrollbar">
        <button className={`border text-xs md:text-base px-3 py-1 whitespace-nowrap rounded-full ${buttonColor === "all" ? "bg-black text-white" : "bg-white hover:bg-gray-100 text-black"}`} onClick={() => handleClick("all")}>All blogs</button>
        {categories.map((category) => {
          return(
            <div key={category._id}>
                <button
                className={`border text-xs md:text-base px-3 py-1 rounded-full whitespace-nowrap
                  ${buttonColor === category.name ? 'bg-black text-white' : 'bg-white text-black hover:bg-gray-100'}`}
                  onClick={() => handleClick(category.name)}
                  >
                {category.name}
              </button>
                </div>
            )
          })}
      </div>
    </div>
    </>
  );
}

export default CategoryButtons;
