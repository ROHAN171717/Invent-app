import React, { useEffect } from "react";
import InfoBox from "../../infoBox/InfoBox";
import { useDispatch, useSelector } from "react-redux";

import { AiFillDollarCircle } from "react-icons/ai";
import { BsCart4, BsCartX } from "react-icons/bs";
import { BiCategory } from "react-icons/bi";
import CalculateIcon from "@mui/icons-material/Calculate";
import {
  CALC_CATEGORY,
  CALC_OUTOFSTOCK,
  CALC_STORE_VALUE,
  selectCategory,
  selectOutOfStock,
  selectTotalStoreValue,
} from "../../../redux/features/product/productSlice";

//ICONS
const earingIcon = <AiFillDollarCircle />;
const productIcon = <BsCart4 />;
const categoryIcon = <BiCategory />;
const outOfStockIcon = <BsCartX />;

//FORMAT AMOUNT
export const formateNumbers = (x) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

const ProductSummary = ({ products }) => {
  const dispatch = useDispatch();
  const totalStoreValue = useSelector(selectTotalStoreValue);
  const outOfStock = useSelector(selectOutOfStock);
  const category = useSelector(selectCategory);

  useEffect(() => {
    dispatch(CALC_STORE_VALUE(products));
    dispatch(CALC_OUTOFSTOCK(products));
    dispatch(CALC_CATEGORY(products));
  }, [dispatch, products]);

  return (
    <div className=" body mt-4 px-8 ">
      <h3 className="text-5xl font-bold text-zinc-100 mb-1">Inventory Stats</h3>
      <div>
        <InfoBox icon={productIcon} title={"Total Products"} count={products.length} bgColor="#fca5a5" />
        <InfoBox
          icon={earingIcon}
          title={"Total Store Value"}
          count={`$${formateNumbers(totalStoreValue.toFixed(2))}`}
          bgColor="#99f6e4"
        />
        <InfoBox icon={outOfStockIcon} title={"Out of Stock"} count={outOfStock} bgColor="#fed7aa" />
        <InfoBox icon={categoryIcon} title={"All Categories"} count={category.length} bgColor="#d9f99d" />
      </div>
    </div>
  );
};

export default ProductSummary;
