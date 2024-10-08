import axios from 'axios'
import baseURL from '../../config'

const createBlog = async(blogData)=>{
    try {
    const response = await axios.post(`${baseURL}/api/blog/create-blog`, blogData)
     if(response.data){
         return {response: response.data.blog, success: true} 
     }
   } catch (error) {
    return {response: error.response.data, success: false}
   }
}

const getBlogCategory = async()=> {
    try {
        const response = await axios.get(`${baseURL}/api/blog/get-blog-category`)
        if(response.data){
            return response.data.category
        }
    } catch (error) {
        return error.response.data
    }
}
const getBlogs = async()=>{
    try {
    const response = await axios.get(`${baseURL}/api/blog/get-blogs`);
        if(response.data){
            return response.data.blogs
        }
    } catch (error) {
    return error.response.data
    }
}

const filterBlogsByCategory = async (categoryId) => {
   try {
     const response = await axios.get(`${baseURL}/api/blog/get-blogs/filter?category=${categoryId}`);
     if(response.data){
        return {response: response.data.blogs, success: true};
     }
   } catch (error) {
        return {response: error.response, success: false};
    
   }
  };


const deleteBlog = async (blogId) => {
   try {
     const response = await axios.delete(`${baseURL}/api/blog/delete-blog/${blogId}`);
     if(response.data){
        return {response: response.data, success: true};
     }
   } catch (error) {
        return {response: error.response, success: false};
    
   }
  };


export const blogService = {
    createBlog,
    getBlogCategory,
    getBlogs,
    filterBlogsByCategory,
    deleteBlog
}