const express = require('express');
const { createBlog, getBlogs, getBlog, deleteBlog, createCategory, getBlogCategory, filterBlog } = require('../controllers/blogController');
const verifyJwt = require('../middlewares/authMiddleware');
const upload = require('../middlewares/multerMiddleware');

const router = express.Router();

router.post('/create-category',upload.single("image"), createCategory) //localhost:8000/api/blog/create-category
router.get('/get-blog-category', getBlogCategory) //localhost:8000/api/blog/get-blog-category
router.post('/create-blog', verifyJwt, upload.single("image"), createBlog) //localhost:8000/api/blog/create-blog
router.get('/get-blogs', getBlogs) //localhost:8000/api/blog/get-blogs
router.get('/get-blogs/filter', filterBlog) //localhost:8000/api/blog/filter?category=:category || localhost:8000/api/blog/filter/:category
router.get('/get-blog/:id', getBlog) // localhost:8000/api/blog/get-blog/
router.delete('/delete-blog/:id', verifyJwt, deleteBlog) //localhost:8000/api/blog/delete-blog/

module.exports = router; 