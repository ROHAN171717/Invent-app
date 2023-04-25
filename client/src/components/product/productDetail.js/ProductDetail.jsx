import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import useRedirectLoggedOutUser from "../../../customeHook/useRedirectLoggedOutUser";
import { selectIsLoggedIn } from "../../../redux/features/auth/authSlice";
import { get_Product } from "../../../redux/features/product/productSlice";
import Loader from "../../Loader/Loader";

const ProductDetail = async() => {
  await useRedirectLoggedOutUser("/login");

  const dispatch = useDispatch();
  const { id } = useParams();

  const isLoggedIn = useSelector(selectIsLoggedIn);
  const { product, isLoading, isError, message } = useSelector((state) => state.product);

  const stockStatus = (quantity) => {
    if (quantity > 0) {
      return <span>In Stock</span>;
    }
    return <span>Out Of Stock</span>;
  };
  useEffect(() => {
    if (isLoggedIn === true) {
      dispatch(get_Product(id));
    }

    if (isError) {
      console.log(message);
    }
  }, [isLoggedIn, isError, message, dispatch, id]);

  return (
    <div className="pt-12 pb-4 sm:py-4 body sm:h-full lg:h-[90vh] relative">
      <button
        className="btn btn-sm text-xl mt-2 pt-1 normal-case bg-slate-900 text-zinc-100
                        hover:bg-slate-400 hover:text-black absolute top-1 left-1 border-none"
      >
        <Link to="/dashboard" className="font-bold text-blue-500">
          Back
        </Link>
      </button>
      <h3 className="text-5xl font-bold bg-zinc-500 rounded-xl text-center pt-2 text-white shadow-md shadow-orange-50 w-3/5 sm:w-3/5 md:w-1/2 lg:w-1/3 xl:w-1/4 mx-auto my-5">
        Product Detail
      </h3>
      <div>
        {isLoading && <Loader />}
        {product && (
          <div className="lg:flex lg:justify-center my-8">
            <div className="lg:w-1/2 lg:m-0 xl:w-1/3 sm:w-3/4 sm:mx-auto sm:mt-8 mx-auto w-3/4">
              <img
                alt="No Image for this product"
                src={product?.image?.filePath}
                className="rounded-3xl p-2 sm:items-center text-white text-2xl"
              />
            </div>
            <div className="lg:ml-5 bg-zinc-700 p-4 rounded-xl w-3/4 m-auto sm:w-3/4 lg:w-1/2 lg:m-0 xl:w-1/3 sm:mx-auto sm:mt-4 md:mx-auto mt-8 text-white">
              <h1 className="text-xl leading-normal">
                <b>Product Availability :-</b> {stockStatus(product?.quantity)}
              </h1>

              <hr />

              <h1 className="text-xl leading-normal">
                <b>Name :-</b> {product?.name}
              </h1>

              <hr />

              <p className="leading-normal text-lg">
                <b>&rarr; SKU :- </b> {product?.sku}
              </p>
              <p className="leading-normal text-lg ">
                <b>&rarr; Category :- </b> {product?.category}
              </p>
              <p className="leading-normal text-lg ">
                <b>&rarr; Price :- </b> {product?.price}
              </p>
              <p className="leading-normal text-lg ">
                <b>&rarr; Quantity in stock :- </b> {product?.quantity}
              </p>
              <p className="leading-normal text-lg ">
                <b>&rarr; Total Value in stock :- </b> {"$"} {product?.price * product?.quantity}
              </p>
              <p className="leading-normal text-lg ">
                <b>&rarr; Description :- </b> {product?.description}
              </p>
              <p className="leading-normal text-lg ">
                <b>&rarr; Created on :- </b> {product?.createdAt?.toLocaleString("en-US")}
              </p>
              <p className="leading-normal text-lg ">
                <b>&rarr; Last Updated :- </b> {product?.updatedAt?.toLocaleString("en-US")}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;
