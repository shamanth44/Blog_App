import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { blogService } from "./blogService";


export const getBlogs = createAsyncThunk("getBlogs", async(_, thunkApi)=>{
    try {
        return await blogService.getBlogs()
    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
})

export const filterBlogsByCategory = createAsyncThunk("filterBlogsByCategory", async (categoryId, thunkApi) => {
    try {
        const { success, response } = await blogService.filterBlogsByCategory(categoryId);
        if(success){
            return response
        }
        else{
            return thunkApi.rejectWithValue(response);
        }
    } catch (error) {
        console.log(error)
    }
});



export const getBlogCategory = createAsyncThunk("getBlogCategory", async(_, thunkApi)=>{
    try {
        const res = await blogService.getBlogCategory()
        return res
    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
})

export const createBlog = createAsyncThunk("blog/create-blog", async(blogData, thunkApi)=>{
    try {
        const { success, response} = await blogService.createBlog(blogData)
        if(success){
            return response
        }
        else{
            return thunkApi.rejectWithValue(response)
        }
    } catch (error) {
        console.log(error)
        // console.log("thunk error", error.data.message)
        // thunkApi.rejectWithValue(error)
    }
})

const initialState = {
    blogs: [],
    recentBlogs: [],
    blogsCategory: [],
    error: [],
    createdBLog: null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    isDummy: false,
}


export const blogSlice = createSlice({
    name: "blogs",
    initialState: initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(getBlogs.pending, (state, action)=>{
            state.isLoading = true;
        }).addCase(getBlogs.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.isSuccess = true;
            state.blogs = action.payload;
            state.recentBlogs = action.payload;
            state.error = []
        }).addCase(getBlogs.rejected, (state, action)=>{
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
        }).addCase(filterBlogsByCategory.pending, (state) => {
            state.isLoading = true;
          })
          .addCase(filterBlogsByCategory.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.blogs = action.payload;
          })
          .addCase(filterBlogsByCategory.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.blogs = []
            state.error = action.payload
          }).addCase(createBlog.pending, (state, action)=>{
            state.isLoading = true;
        }).addCase(createBlog.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.isSuccess = true;
            state.blogs.push(action.payload)
        }).addCase(createBlog.rejected, (state, action)=>{
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            console.log(action)
            state.error = action.payload
        }).addCase(getBlogCategory.pending, (state, action)=>{
            state.isLoading = true;
        }).addCase(getBlogCategory.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.isSuccess = true;
            state.blogsCategory = action.payload;
            state.error = []
        }).addCase(getBlogCategory.rejected, (state, action)=>{
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
        })
    }
})

export default blogSlice.reducer