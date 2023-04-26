import axios from "axios";

// export const BACKEND_URL = "http://localhost:3001";

// const axios = axioss.create({ baseURL: "http://localhost:4000" });

axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL;
axios.defaults.withCredentials = true;

const token = JSON.parse(localStorage.getItem("user"))?.token;
axios.defaults.headers.common["Authorization"] = token;

//CREATE NEW PRODUCT
export const createProduct = async (formData) => {
  const response = await axios.post(`/api/products`, formData);
  return response.data;
};

//GET ALL PRODUCTS
export const getProducts = async () => {
  const response = await axios.get(`/api/products`);
  return response.data;
};

//DELETE A PRODUCT
export const deleteProduct = async (id) => {
  const response = await axios.delete(`/api/products/${id}`);
  return response.data;
};

//GET A PRODUCT
export const getProduct = async (id) => {
  const response = await axios.get(`/api/products/${id}`);
  return response.data;
};

//UPDATE A PRODUCT
export const updateProduct = async (id, formData) => {
  const response = await axios.patch(`/api/products/${id}`, formData);
  return response.data;
};
