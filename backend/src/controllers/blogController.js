const { Blog } = require("../models/blogModel");
const ApiError = require("../utils/ApiError");
const asyncHandler = require("../utils/asyncHandler");
const uploadOnCloudinary = require("../utils/cloudinary");

const createBlog = asyncHandler(async (req, res, next)=> {

    const { title, description } = req.body;

    if([title, description].some((field) => field.trim() === "")) {
        throw new ApiError(500, "Title and description required")
    }

    let imageLocalPath;

    if(req.file !== undefined) {
        imageLocalPath = req.file.path
    }

    const image = await uploadOnCloudinary(imageLocalPath)


    const blog = await Blog.create({
        title,
        description,
        image: image?.secure_url || "",
        createdBy: req.user._id
    })

    res.json({
        blog,
    })

    
})

const getBlogs = asyncHandler(async(req, res, next)=> {
    const blogs = await Blog.find().populate("createdBy", "name email image")

    if(blogs.length === 0) {
        throw new ApiError(401, "No blogs found")
    }
    return res.json({
        blogs
    })
})

const getBlog = asyncHandler(async(req, res, next)=> {
    const id = req.params.id
    const blog = await Blog.findById({_id : id})

    if(!blog) {
        throw new ApiError(400, "Blog not found")
    }

    res.json({
        blog
    })
})

const deleteBlog = asyncHandler(async(req, res, next)=> {
    const blogOwner = req.user._id

    id = req.params.id
    const blog = await Blog.findById({_id: id})

    if(!blog) {
        throw new ApiError(400, "Blog not found")
    }

    if(blogOwner.equals(blog.createdBy)) {
        await Blog.findByIdAndDelete({_id : id})
        res.json({
            message: "Blog Deleted"
        }) 
    }
    else{
        throw new ApiError(401, "Unauthorized request")
    }

})

module.exports = { createBlog, getBlogs, getBlog, deleteBlog }