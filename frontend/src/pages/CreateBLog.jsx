import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createBlog, getBlogCategory } from "../features/blogs/blogSlice";
import { useNavigate } from "react-router-dom";

function CreateBlog() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("")
  const [image, setImage] = useState([]);
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const blogCategory = useSelector((state)=> state.blogs.blogsCategory)

  useEffect(()=>{
    dispatch(getBlogCategory());
  },[])

  const formData = new FormData();
  formData.append("title", title);
  formData.append("description", description);
  formData.append("category", category);
  formData.append("image", image);

  const handleSubmit = async () => {
    try {
      const res = await dispatch(createBlog(formData)).unwrap();
      console.log("redux", res);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="flex w-1/2 justify-center items-center bg-slate-700 h-3/4 text-white">
        <div className="flex flex-col">
          <label htmlFor="title">Title</label>
          <input
            id="title"
            type="text"
            placeholder="name"
            className="text-black"
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
          <label htmlFor="description">Description</label>
          <input
            id="description"
            type="text"
            placeholder="description"
            className="text-black"
            onChange={(e) => {
              setDescription(e.target.value);
            }}
          />
          <label htmlFor="category">Select category</label>
          <select defaultValue="" id="category" className="border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full px-3 py-2 bg-white text-gray-900"    onChange={(e) => {
                setCategory(e.target.value);
              }}>
                <option value="" disabled>Select an option</option>
            {blogCategory.map((option, index) => (
              <option key={index} value={option.name}>
                {option.name}
              </option>
            ))}
          </select>

          <label htmlFor="image">Blog Image</label>
          <input
            id="image"
            type="file"
            placeholder="Choose file"
            onChange={(e) => {
              setImage(e.target.files[0]);
            }}
          />
          <button className="bg-white text-black mt-10" onClick={handleSubmit}>
            Create Blog
          </button>
        </div>
      </div>
    </>
  );
}

export default CreateBlog;
