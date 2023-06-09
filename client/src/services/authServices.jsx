import axios from "axios";
import { toast } from "react-toastify";

// export const BACKEND_URL = "http://localhost:3001";

// const axios = axioss.create({ baseURL: "http://localhost:4000" });

axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL;
axios.defaults.withCredentials = true;

const token = JSON.parse(localStorage.getItem("user"))?.token;
// console.log(token);
axios.defaults.headers.common["Authorization"] = token;

export const validateEmail = (email) => {
  return email.match(
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
};

//REGISTER USER
export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`/api/users/register`, userData, { withCredentials: true });
    if (response.statusText === "OK") {
      toast.success("User Registered Successfully");
    }
    return response.data;
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    toast.error(message);
  }
};

//LOGIN USER
export const loginUser = async (userData) => {
  try {
    const response = await axios.post(`/api/users/login`, userData);
    if (response.statusText === "OK") {
      toast.success("Login Successfully");
    }
    return response.data;
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    toast.error(message);
  }
};

//LOGOUT USER
export const logoutUser = async () => {
  try {
    await axios.get(`/api/users/logout`);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    toast.error(message);
  }
};

//FORGOT PASSWORD
export const forgotPassword = async (userData) => {
  try {
    const response = await axios.post(`/api/users/forgotpassword`, userData);
    toast.success(response.data.message);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    toast.error(message);
  }
};

//RESET PASSWORD
export const resetPassword = async (userData, resetToken) => {
  try {
    const response = await axios.put(`/api/users/resetpassword/${resetToken}`, userData);
    return response.data;
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    toast.error(message);
  }
};

//GET LOGIN STATUS
export const getLoginStatus = async () => {
  try {
    const response = await axios.get(`/api/users/loggedIn`);
    return response.data;
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    toast.error(message);
  }
};

//GET USER PROFILE
export const getUserProfile = async () => {
  try {
    const response = await axios.get(`/api/users/getuser`);
    return response.data;
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    toast.error(message);
  }
};

//UPDATE PROFILE
export const updateUser = async (formData) => {
  try {
    const response = await axios.patch(`/api/users/updateuser`, formData);
    return response.data;
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    toast.error(message);
  }
};

//UPDATE PASSWORD
export const changePassword = async (formData) => {
  try {
    const response = await axios.patch(`/api/users/changepassword`, formData);
    return response.data;
  } catch (error) {
    console.log(error);
    const message =
      (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    toast.error(message);
    return error;
  }
};
