import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { authService } from "./userService";

export const registerUser = createAsyncThunk("auth/register-user", async(userData, thunkApi)=>{
    try {
        return await authService.register(userData)
    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
})

export const loginUser = createAsyncThunk("auth/login-user", async(userData, thunkApi)=>{
    try {
        const { success, response } = await authService.login(userData)
        if(success) {
            return response
        }
    } catch (error) {
        return thunkApi.rejectWithValue(response)
    }
})

export const logOutUser = createAsyncThunk("auth/logout-user", async(_, thunkApi)=>{
    try {
        const { success, response } = await authService.logout()
        if(success) {
            return response
        }
    } catch (error) {
        return thunkApi.rejectWithValue(response)
    }
})

export const getUser = createAsyncThunk("auth/get-user", async(_, thunkApi)=>{
    try {
        const { success, response } = await authService.getUser()
        if(success) {
            return response
        }
    } catch (error) {
        return thunkApi.rejectWithValue(response)
    }
})

export const getUserData = createAsyncThunk("auth/get-user-data", async(_, thunkApi)=>{
    try {
        const { success, response } = await authService.getUserData()
        if(success) {
            return response
        }
    } catch (error) {
        return thunkApi.rejectWithValue(response)
    }
})

const initialState = {
    user: null,
    userData: null,
    isAuthenticated: false,
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
        }).addCase(loginUser.rejected, (state, action)=>{
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
        }).addCase(getUser.pending, (state, action)=>{
            state.isLoading = true
        }).addCase(getUser.fulfilled, (state, action)=> {
            state.isLoading = false;
            state.isSuccess = true;
            state.isError = false
            state.user = action.payload
            state.isAuthenticated = action.payload.authenticated
        }).addCase(getUser.rejected, (state, action)=>{
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
        }).addCase(getUserData.pending, (state, action)=>{
            state.isLoading = true
        }).addCase(getUserData.fulfilled, (state, action)=> {
            state.isLoading = false;
            state.isSuccess = true;
            state.isError = false
            state.userData = action.payload
        }).addCase(getUserData.rejected, (state, action)=>{
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
        }).addCase(logOutUser.pending, (state, action)=>{
            state.isLoading = true
        }).addCase(logOutUser.fulfilled, (state, action)=> {
            state.isAuthenticated = action.payload.authenticated;
            state.user = null;
            state.isLoading = false;
            state.isSuccess = true;
            state.isError = false
        }).addCase(logOutUser.rejected, (state, action)=>{
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
        })
    }
})    

export default authSlice.reducer