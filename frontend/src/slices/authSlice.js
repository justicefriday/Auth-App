import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    userInfo: localStorage.getItem('userInfo')
        ? JSON.parse(localStorage.getItem('userInfo'))
        : null,

}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        //here we have two functions setCredentials which set/save usrers infor in the local storage and logout which remove user info from local storage
        setCredentials: (state, action) => {
            state.userInfo = action.payload;
            localStorage.setItem('userInfo',JSON.stringify(action.payload))
        },
        //the logout function here is  for the frontend/ it has noting to do with the backend so we can call it clearSetCredential if we like
        logout: (state, action) => {
            state.userInfo = null;
            localStorage.removeItem('userInfo')
       } 
    }
})

export const{setCredentials,logout}=authSlice.actions

export default authSlice.reducer