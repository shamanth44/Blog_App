const express = require('express');
const { createBlog, getBlogs, getBlog, deleteBlog } = require('../controllers/blogController');
const verifyJwt = require('../middlewares/authMiddleware');
const upload = require('../middlewares/multerMiddleware');

const router = express.Router();


router.post('/create-blog', verifyJwt, upload.single("image"), createBlog)
router.get('/get-blogs', getBlogs)
router.get('/get-blog/:id', getBlog) // localhost:8000/api/blog/get-blog/
router.delete('/delete-blog/:id', verifyJwt, deleteBlog)


module.exports = router; 