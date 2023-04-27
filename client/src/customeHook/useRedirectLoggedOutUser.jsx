import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { SET_LOGIN, SET_LOGOUT } from "../redux/features/auth/authSlice";
import { getLoginStatus } from "../services/authServices";
import { toast } from "react-toastify";

const useRedirectLoggedOutUser = (path) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const redirectLoogedOutUser = async () => {
    // const isLoggedIn = localStorage.getItem("user") !== null ? true : false;
    const isLoggedIn = await getLoginStatus();
    console.log(isLoggedIn);

    if (!isLoggedIn) {
      // toast.info("Session expired, please login to continue.");
      navigate(path);
      return;
    }
  };
  useEffect(() => {
    redirectLoogedOutUser();
  }, [navigate, path, dispatch, isLoggedIn]);
};

export default useRedirectLoggedOutUser;
