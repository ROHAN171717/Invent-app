import { createSlice } from '@reduxjs/toolkit';

// const name = JSON.parse(localStorage.getItem("name"));
// const name = localStorage.getItem("name") ===! undefined ? JSON.parse(localStorage.getItem("name")) : null;

const initialState={
    isLoggedIn: false,
    name: "",
    user:{
        name: "",
        email: "",
        phone: "",
        bio: "",
        photo: "",
    },
};

const authSlice=createSlice({   
    name: "auth",
    initialState,
    reducers:{
        SET_LOGIN:(state,action)=>{
            state.isLoggedIn = true;
            state.name = action.payload.name;
            console.log(action.payload);
            localStorage.setItem("user", JSON.stringify({ ...action.payload }));
        },
        SET_NAME(state,action){
            localStorage.setItem("name",JSON.stringify(action.payload));
            state.name = action.payload;
        },
        SET_USER:(state,action)=>{
            const profile = action.payload;
            state.user.name = profile.name;
            state.user.email = profile.email;
            state.user.phone = profile.phone;
            state.user.bio = profile.bio;
            state.user.photo = profile.photo;
        },
        SET_LOGOUT:(state,action) => {
            console.log("hello");
            state.isLoggedIn = false;
            state.name = null;
            localStorage.removeItem("user");
            localStorage.removeItem("name");
        }
    },
});

export default authSlice.reducer;
export const { SET_LOGIN, SET_NAME, SET_USER, SET_LOGOUT } = authSlice.actions;

export const selectIsLoggedIn = (state) => state.auth.isLoggedIn;
export const selectName = (state) => state.auth.name;
export const selectUser = (state) => state.auth.user;