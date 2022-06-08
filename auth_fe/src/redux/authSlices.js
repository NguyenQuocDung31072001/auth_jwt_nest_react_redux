import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: "auth",
    initialState:{
        login:{
          username:'',
          password:'',
          accessToken:null,
        },
    },
    reducers:{
        login: (state,action) => {
            state.login = action.payload;
        },
        logout: (state,action)=>{
          state.login.username=''
          state.login.password=''
          state.login.accessToken=null
        }
    }
});

export const {
  login,
  logout
} = authSlice.actions;

export default authSlice.reducer;

