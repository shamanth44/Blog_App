import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createBlog, getBlogCategory } from "../features/blogs/blogSlice";
import { useNavigate } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

function CreateBlog() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState([]);
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const blogCategory = useSelector((state) => state.blogs.blogsCategory);

  useEffect(() => {
    dispatch(getBlogCategory());
  }, []);

  const formData = new FormData();
  formData.append("title", title);
  formData.append("description", description);
  formData.append("category", category);
  formData.append("image", image);

  const handleSubmit = async () => {
    setLoading(true)
      try {
        const res = await dispatch(createBlog(formData)).unwrap();
        navigate("/");
      } catch (error) {
        setError(error.message)
        setLoading(false)
      }
  };
  return (
    <>
      <div className="px-5 md:px-16 mt-10 flex flex-col gap-2">
        <input
          id="title"
          type="text"
          placeholder="Blog title.."
          className="text-black font-extrabold outline-none"
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
        <ReactQuill
          value={description}
          placeholder={"Write your story..."}
          onChange={setDescription}
        />
        {/* <label htmlFor="description">Description</label>
          <input
            id="description"
            type="text"
            placeholder="description"
            className="text-black"
            onChange={(e) => {
              setDescription(e.target.value);
            }}
          /> */}

        <div className="self-start">
          <select
            defaultValue=""
            id="category"
            className="border border-gray-300 rounded-md shadow-sm block w-full px-3 py-2 bg-white text-gray-900"
            onChange={(e) => {
              setCategory(e.target.value);
            }}
          >
            <option value="" disabled>
              Select category
            </option>
            {blogCategory.map((option, index) => (
              <option key={index} value={option.name}>
                {option.name}
              </option>
            ))}
          </select>
        </div>

       <div className="self-start">
       <label htmlFor="image">Blog Image:  </label>
        <input
          id="image"
          type="file"
          placeholder="Choose file"
          className="text-slate-500
          file:mr-4 file:py-2 file:px-4
          file:rounded-lg file:border-0
          file:text-sm file:font-semibold
          file:bg-gray-100 file:text-gray-500
          hover:file:bg-gray-200"
          onChange={(e) => {
            setImage(e.target.files[0]);
          }}
        />
       </div>
       {error && <p className="text-red-600 text-sm">{error}</p>}
       <div className="self-start">
       <button  disabled={loading}
              type="submit"
              onClick={handleSubmit}
              className={`mt-4 tracking-wider border text-center text-sm text-white  p-2 rounded-md w-full bg-neutral-900 border-black}`}
            >
              {!loading ? "Publish": "Publishing..."}
            </button>
       </div>
      </div>
    </>
  );
}

export default CreateBlog;
