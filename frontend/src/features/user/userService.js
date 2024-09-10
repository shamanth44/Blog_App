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
            return response.data
        }
    } catch (error) {
        return error.response.data
    }
}


export const authService = {
    register,
    login
}