import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import ProductList from '../../components/product/productList/ProductList';
import ProductSummary from '../../components/product/productSummary/ProductSummary';
import useRedirectLoggedOutUser from "../../customeHook/useRedirectLoggedOutUser";
import { selectIsLoggedIn } from '../../redux/features/auth/authSlice';
import { get_Products } from '../../redux/features/product/productSlice';

const RightInfo = () => {

  useRedirectLoggedOutUser("/login");
  const dispatch = useDispatch();

  const isLoggedIn = useSelector(selectIsLoggedIn);
  console.log("isLoggedIn:-" + isLoggedIn);
  
  const {products, isLoading, isError, message } = useSelector(state => state.product);

  console.log("products=" + products);
  

  useEffect(() => {
    if(isLoggedIn === true){
      dispatch(get_Products()); 
    }

    if(isError){
      console.log(message);
    }
  },[isLoggedIn, isError, message, dispatch]);
  

  return (
    <div>
      <ProductSummary products={products}/>
      <ProductList products={products} isLoading={isLoading}/>
    </div>
  )
}

export default RightInfo;
