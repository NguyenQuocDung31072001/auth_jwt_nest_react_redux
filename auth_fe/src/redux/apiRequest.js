import axios from "axios";

import { login, logout } from "./authSlices";

export const registerApi=async ({username,password})=>{
    try {
        const res=await axios.post('http://localhost:5000/auth/resgister',{
            username:username,
            password:password
        })
        console.log('register api ',res.data)
    } catch (error) {
        console.log(error.message)
    }
}
export const loginApi=async ({username,password},dispatch)=>{
    try {
        const res=await axios.post('http://localhost:5000/auth/login',{
            username:username,
            password:password
        })
        const payload={
            username:res.data.user.username,
            password:res.data.user.password,
            accessToken:res.data.user.access_token
        }
        dispatch(login(payload))

    } catch (error) {
        console.log(error.message)
    }
}
export const getTask=async (accessToken,axiosJwt)=>{
    console.log('1',accessToken)
    try {
        const res=await axiosJwt.get('http://localhost:5000/tasks',{
            headers: { Authorization: `Bearer ${accessToken}` },
          })
          console.log('2',accessToken)
          return res.data
    } catch (error) {
        console.log(error.message)
    }
}

