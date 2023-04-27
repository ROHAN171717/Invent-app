// import React from 'react'
import * as React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FILTER_PRODUCTS, selectFilteredProducts } from "../../../redux/features/product/filterSlice";
import { delete_Product, get_Products } from "../../../redux/features/product/productSlice";
import "./productList.css";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { AiOutlineEye } from "react-icons/ai";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Loader from "../../Loader/Loader";

const columns = [
  { id: "name", label: "Name", minWidth: 170 },
  { id: "category", label: "Category", minWidth: 100 },
  {
    id: "price",
    label: "Price",
    minWidth: 170,
    align: "left",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "quantity",
    label: "Quantity",
    minWidth: 170,
    align: "left",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "value",
    label: "Value",
    minWidth: 170,
    align: "left",
    format: (value) => value.toFixed(2),
  },
  {
    id: "action",
    label: "Action",
    minWidth: 170,
    align: "left",
    format: (value) => value.toFixed(2),
  },
];

const ProductList = ({ products, isLoading }) => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const [search, setSearch] = useState("");
  const filteredProducts = useSelector(selectFilteredProducts);

  const dispatch = useDispatch();

  const [currentItems, setCurrentItems] = useState([]);

  useEffect(() => {
    setCurrentItems(filteredProducts);
  }, [filteredProducts]);

  useEffect(() => {
    dispatch(FILTER_PRODUCTS({ products, search }));
  }, [products, search, dispatch]);

  //hovering effect
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseEnter = () => {
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
  };

  const shortenText = (text, n) => {
    if (text.length > n) {
      const shortenedText = text.subString(0, n).concat("...");
      return shortenedText;
    }
    return text;
  };

  const deleteProduct = async (id) => {
    dispatch(delete_Product(id));
    // dispatch(get_Products());
    // window.location.reload();
  };

  const confirmDelete = (id) => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div className="custom-ui rounded-xl text-2xl p-6" style={{ backgroundColor: "rgb(55, 74, 93)" }}>
            <h1 className="font-bold text-2xl text-white">Delete Product</h1>
            <p className="text-white">Are you sure you want to delete this product?</p>
            <button
              onClick={onClose}
              className="text-2xl font-semibold rounded-lg m-4 px-4"
              style={{ backgroundColor: "white" }}
            >
              No
            </button>
            <button
              onClick={() => {
                deleteProduct(id);
                onClose();
              }}
              className="text-2xl font-semibold rounded-lg px-4"
              style={{ backgroundColor: "white" }}
            >
              Yes, Delete it!
            </button>
          </div>
        );
      },
    });
  };

  return (
    <div className="mt-4 body px-8 pb-4">
      <div className="flex justify-between my-3 md:flex-row flex-col">
        <h1 className="text-5xl font-bold text-zinc-100 mb-1">Inventroy Items</h1>
        <div className="form-control">
          <div className="input-group">
            <input
              type="text"
              placeholder="Search by name"
              className="input"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button className="btn btn-square" style={{ background: "rgb(67, 65, 65)" }}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
      {/* {isLoading ? (
        <Loader />
      ) : ( */}
        <div className="overflow-x-auto rounded-2xl">
          {!isLoading && products.length === 0 ? (
            <p
              className="bg-red-500 text-2xl p-2 text-white"
              style={{ textAlign: "center", backgroundColor: "rgb(30, 40, 64)" }}
            >
              -- No products found, Please add a product --
            </p>
          ) : (
            <Paper sx={{ width: "100%", overflow: "hidden" }}>
              <TableContainer sx={{ maxHeight: 440 }}>
                <Table stickyHeader aria-label="sticky table">
                  <TableHead>
                    <TableRow>
                      {columns.map((column) => (
                        <TableCell
                          key={column.id}
                          align={column.align}
                          style={{
                            minWidth: column.minWidth,
                            backgroundColor: "white",
                            fontSize: "large",
                            fontWeight: "bold",
                            color: "rgb(67, 65, 65)",
                          }}
                        >
                          {column.label}
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {currentItems.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((product, index) => {
                      const { _id, name, category, price, quantity } = product;
                      const value = price * quantity;
                      return (
                        <TableRow
                          role="checkbox"
                          tabIndex={-1}
                          key={index}
                          onMouseEnter={handleMouseEnter}
                          onMouseLeave={handleMouseLeave}
                        >
                          <TableCell align="left" style={{ fontSize: "1.25rem", color: "white" }}>
                            {shortenText(name)}
                          </TableCell>
                          <TableCell align="left" style={{ fontSize: "1.25rem", color: "white" }}>
                            {category}
                          </TableCell>
                          <TableCell align="left" style={{ fontSize: "1.25rem", color: "white" }}>
                            {price}
                          </TableCell>
                          <TableCell align="left" style={{ fontSize: "1.25rem", color: "white" }}>
                            {quantity}
                          </TableCell>
                          <TableCell align="left" style={{ fontSize: "1.25rem", color: "white" }}>
                            {value}
                          </TableCell>
                          <TableCell align="left" style={{ display: "flex" }}>
                            <div className="p-1 text-3xl  text-orange-500">
                              <Link to={`/product-detail/${_id}`}>
                                <AiOutlineEye />
                              </Link>
                            </div>
                            <div className="p-1 text-3xl text-green-600">
                              <Link to={`/edit-product/${_id}`}>
                                <FaEdit />
                              </Link>
                            </div>
                            <div className="p-1 text-3xl text-red-600">
                              <FaTrashAlt onClick={() => confirmDelete(_id)} />
                            </div>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </TableContainer>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25, 100]}
                component="div"
                count={currentItems.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                style={{ color: "black", fontWeight: "bold" }}
              />
            </Paper>
          )}
        </div>
      {/* )} */}
    </div>
  );
};

export default ProductList;
