const { Category } = require("../models/blogCategoryModel");
const { Blog } = require("../models/blogModel");
const { User } = require("../models/userModel");
const ApiError = require("../utils/ApiError");
const asyncHandler = require("../utils/asyncHandler");
const uploadOnCloudinary = require("../utils/cloudinary");

const createCategory = asyncHandler(async (req, res, next)=> {

    const { name, description } = req.body;

    if([name, description].some((field)=> field.trim() === "")) {
        throw new ApiError(400, "Title and name required")
    }

    let imageLocalPath;

    if(req.file !== undefined) {
        imageLocalPath = req.file.path
    }

    const image = await uploadOnCloudinary(imageLocalPath)

    const blogCategory = await Category.create({
        name,
        description,
        image: image?.secure_url || "",
    })

    res.json({
        message: "Blog category created successfully",
        blogCategory,
    })
})

const getBlogCategory = asyncHandler(async (req, res, next)=> {

    // const category = await Category.find().select("name")
    const category = await Category.find()

    if(!category) {
        throw new ApiError(400, "Category not found")
    }

    return res.json({
        category
    })
})

const createBlog = asyncHandler(async (req, res, next)=> {

    const { title, description, category } = req.body;

    if([title, description, category].some((field) => field.trim() === "")) {
        throw new ApiError(500, "Title and description required")
    }

    const blogCategory = await Category.findOne({ name: category})

    if (!blogCategory) {
        throw new ApiError(400, "Blog category not found")
      }

    let imageLocalPath;

    if(req.file !== undefined) {
        imageLocalPath = req.file.path
    }

    const image = await uploadOnCloudinary(imageLocalPath)

    const blog = await Blog.create({
        title,
        description,
        category: blogCategory?._id,
        image: image?.secure_url || "",
        createdBy: req.user._id
    })

    await User.findByIdAndUpdate(
        req.user._id,
        { $push: { blogs: blog._id } },
        { new: true } 
      );

    res.json({
        blog,
    })

    
})

const getBlogs = asyncHandler(async(req, res, next)=> {
    const blogs = await Blog.find().populate("createdBy", "name email image").populate("category")

    if(blogs.length === 0) {
        throw new ApiError(404, "No blogs found")
    }
    return res.json({
        blogs
    })
})

const filterBlog = asyncHandler(async(req, res, next)=>{
    const category  = req.query.category;
    
    const pipeline = [
        {
            $lookup: {
              from: 'categories',
              localField: 'category',
              foreignField: '_id',
              as: 'category',
            },
          },
          { $unwind: '$category' },
          {
            $match: {
              'category.name': category,
            },
          },
    ];

    let blogs = await Blog.aggregate(pipeline)

    blogs = await Blog.populate(blogs, {
        path: 'createdBy',
        select: 'name email image',
      });

    if(blogs.length === 0){
        throw new ApiError(404, "No blogs not found in this category")
    }
    else{
        res.json({
            blogs
        })
    }
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

const deleteBlog = asyncHandler(async(req, res, next) => {
    const blogOwner = req.user._id
    const id = req.params.id
    const blog = await Blog.findById({_id: id})

    if (!blog) {
        throw new ApiError(400, "Blog not found")
    }

    if (blogOwner.equals(blog.createdBy)) {
        await Blog.findByIdAndDelete({_id: id})

        await User.findByIdAndUpdate(blogOwner, {
            $pull: { blogs: id }
        })

        res.json({
            message: "Blog Deleted"
        }) 
    } else {
        throw new ApiError(401, "Unauthorized request")
    }
})


module.exports = { createBlog, getBlogs, getBlog, deleteBlog, createCategory, getBlogCategory, filterBlog }