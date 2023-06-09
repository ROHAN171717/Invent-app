import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

import {
  createProduct,
  getProducts,
  getProduct,
  deleteProduct,
  updateProduct,
} from "../../../services/productServices";

const initialState = {
  product: null,
  products: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
  totalStoreValue: 0,
  outOfStock: 0,
  category: [],
};

//CREATE NEW PRODUCT
export const create_Product = createAsyncThunk("products/create", async (FormData, thunkAPI) => {
  try {
    return await createProduct(FormData);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    console.log(message);
    return thunkAPI.rejectWithValue(message);
  }
});

//GET ALL PRODUCTS
export const get_Products = createAsyncThunk("products/getAll", async (_, thunkAPI) => {
  try {
    return await getProducts();
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    console.log(message);
    return thunkAPI.rejectWithValue(message);
  }
});

//GET A PRODUCT
export const get_Product = createAsyncThunk("products/getProduct", async (id, thunkAPI) => {
  try {
    return await getProduct(id);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    console.log(message);
    return thunkAPI.rejectWithValue(message);
  }
});

//DELETE A PRODUCT
export const delete_Product = createAsyncThunk("products/delete", async (id, thunkAPI) => {
  try {
    return await deleteProduct(id);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    console.log(message);
    return thunkAPI.rejectWithValue(message);
  }
});

//UPDATE PRODUCT
export const update_Product = createAsyncThunk("products/updateProduct", async ({ id, formData }, thunkAPI) => {
  try {
    return await updateProduct(id, formData);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    console.log(message);
    return thunkAPI.rejectWithValue(message);
  }
});

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    CALC_STORE_VALUE(state, action) {
      const products = action.payload;
      const array = [];
      products.map((item) => {
        const { price, quantity } = item;
        const productValue = price * quantity;
        return array.push(productValue);
      });
      const totalValue = array.reduce((a, b) => {
        return a + b;
      }, 0);
      state.totalStoreValue = totalValue;
    },
    CALC_OUTOFSTOCK(state, action) {
      const products = action.payload;
      let array = [];
      products.map((item) => {
        const { quantity } = item;
        return array.push(quantity);
      });
      let count = 0;
      array.forEach((number) => {
        if (number === 0 || number === "0") {
          count += 1;
        }
      });
      state.outOfStock = count;
    },
    CALC_CATEGORY(state, action) {
      const products = action.payload;
      const array = [];
      products.map((item) => {
        const { category } = item;
        return array.push(category);
      });
      const uniqueCategory = [...new Set(array)];
      state.category = uniqueCategory;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(create_Product.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(create_Product.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.products.push(action.payload);
        toast.success("Product added successfully");
      })
      .addCase(create_Product.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })
      .addCase(get_Products.pending, (state) => ({
        ...state,
        isLoading: true,
      }))
      .addCase(get_Products.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.products = action.payload;
      })
      .addCase(get_Products.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.products = [];
        toast.error(action.payload);
      })
      .addCase(get_Product.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(get_Product.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.product = action.payload;
      })
      .addCase(get_Product.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })
      .addCase(delete_Product.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(delete_Product.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        toast.success("Product deleted successfully");
      })
      .addCase(delete_Product.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })
      .addCase(update_Product.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(update_Product.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        toast.success("Product updated successfully");
      })
      .addCase(update_Product.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      });
  },
});

export const { CALC_STORE_VALUE, CALC_OUTOFSTOCK, CALC_CATEGORY } = productSlice.actions;

export const selectIsLoading = (state) => state.product.isLoading;
export const selectProduct = (state) => state.product.product;
export const selectTotalStoreValue = (state) => state.product.totalStoreValue;
export const selectOutOfStock = (state) => state.product.outOfStock;
export const selectCategory = (state) => state.product.category;

export default productSlice.reducer;
