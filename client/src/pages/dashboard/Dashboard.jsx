import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import ProductList from "../../components/product/productList/ProductList";
import ProductSummary from "../../components/product/productSummary/ProductSummary";
import useRedirectLoggedOutUser from "../../customeHook/useRedirectLoggedOutUser";
import { selectIsLoggedIn } from "../../redux/features/auth/authSlice";
import { get_Product, get_Products } from "../../redux/features/product/productSlice";
import Loader from "../../components/Loader/Loader";

const Dashboard = () => {
  useRedirectLoggedOutUser("/login");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isLoggedIn = localStorage.getItem("user") !== null ? true : false;
  const { products, isLoading, isError, message } = useSelector((state) => state.product);

  useEffect(
    () => {
      if (isLoggedIn) {
        dispatch(get_Products());
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [isLoggedIn]
  );

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="h-full">
      <ProductSummary products={products} />
      <ProductList products={products} isLoading={isLoading} />
    </div>
  );
};

export default Dashboard;
