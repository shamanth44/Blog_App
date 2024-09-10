import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { authService } from "./userService";

export const registerUser = createAsyncThunk("auth/register", async(userData, thunkApi)=>{
    try {
        return await authService.register(userData)
    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
})
export const loginUser = createAsyncThunk("auth/login", async(userData, thunkApi)=>{
    try {
        return await authService.login(userData)
    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
})




const initialState = {
    user: null,
    loggedInUser: null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: "" 
}

export const authSlice = createSlice({
    name:"auth",
    initialState: initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(registerUser.pending, (state, action)=>{
            state.isLoading = true
        }).addCase(registerUser.fulfilled, (state, action)=> {
            state.isLoading = false;
            state.isSuccess = true;
            state.isError = false
            state.user = action.payload
        }).addCase(registerUser.rejected, (state, action)=>{
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
        }).addCase(loginUser.pending, (state, action)=>{
            state.isLoading = true
        }).addCase(loginUser.fulfilled, (state, action)=> {
            state.isLoading = false;
            state.isSuccess = true;
            state.isError = false
            state.loggedInUser = action.payload
            localStorage.setItem("token", action.payload.token )
        }).addCase(loginUser.rejected, (state, action)=>{
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
        })
    }
})    

export default authSlice.reducer