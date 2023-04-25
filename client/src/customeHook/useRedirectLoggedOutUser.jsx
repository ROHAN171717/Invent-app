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
    const isLoggedIn = localStorage.getItem("user") !== null ? true : false;

    // const token = JSON.parse(localStorage.getItem("user")).token;
    // console.log(token);

    if (!isLoggedIn) {
      toast.info("Session expired, please login to continue.");
      navigate(path);
      return;
    }

    // dispatch(
    //   SET_LOGIN({
    //     flag: isLoggedIn,
    //     name: localStorage.getItem("name").substring(1, localStorage.getItem("name").length - 1),
    //   })
    // );
  };
  useEffect(() => {
    redirectLoogedOutUser();
  }, [navigate, path, dispatch]);
};

export default useRedirectLoggedOutUser;
