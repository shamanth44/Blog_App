import axios from 'axios'

axios.defaults.withCredentials = true
const register = async(userData)=>{
    try {
        const response = await axios.post('http://localhost:8000/api/user/register', userData);
        if(response.data){
            return response.data
        }
    } catch (error) {
        return error.response.data
    }
}

const login = async(userData)=>{
    try {
        const response = await axios.post('http://localhost:8000/api/user/login', userData);
        if(response.data){
            return {response: response.data, success: true}
        }
    } catch (error) {
        return {response: error.response.data, success: false}
    }
}


const logout = async()=>{
    try {
        const response = await axios.post('http://localhost:8000/api/user/logout');
        console.log("Service",response)
        if(response.data){
            return {response: response.data, success: true}
        }
    } catch (error) {
        return {response: error.response.data, success: false}
    }
}


const getUser = async()=>{
    try {
        const response = await axios.get('http://localhost:8000/api/user/get-user');
        if(response.data){
            return {response: response.data, success: true}
        }
    } catch (error) {
        return {response: error.response.data, success: false}
    }
}


export const authService = {
    register,
    login,
    getUser,
    logout
}