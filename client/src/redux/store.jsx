import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/auth/authSlice";
import filterReducer from "./features/product/filterSlice";
import productReducer from "./features/product/productSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    product: productReducer,
    filter: filterReducer,
  },
});

export default store;
