import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectIsLoggedIn } from "../../redux/features/auth/authSlice";

const Protected = ({ isLoggedIn, children }) => {
  const navigate = useNavigate();
//   const isLoggedIn = useSelector(selectIsLoggedIn);
  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
      return;
    }
  });
  return children;
};

export default Protected;
