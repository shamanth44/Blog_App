import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createBlog } from "../features/blogs/blogSlice";
import { useNavigate } from "react-router-dom";

function CreateBlog() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState([])
  const navigate = useNavigate();

  const formData = new FormData();
  formData.append("title", title);
  formData.append("description", description);
  formData.append('image', image);

  const dispatch = useDispatch();

  const handleSubmit = async () => {
    try {
      const res = await dispatch(createBlog(formData)).unwrap();
      console.log("redux", res)
      navigate("/")
    } catch (error) {
      console.log(error)
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
