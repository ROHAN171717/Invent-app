import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectIsLoggedIn } from "../../redux/features/auth/authSlice";
import { toast } from "react-toastify";


const Protected = ({ Components }) => {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem("user");
  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
      toast.info("Session expired, please login to continue.");
      return;
    }
  });
  return Components
};

export default Protected;
