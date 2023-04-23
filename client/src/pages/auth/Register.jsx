import React, { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/Loader/Loader";
import { registerUser, validateEmail } from "../../services/authServices";
import { SET_LOGIN, SET_NAME } from "../../redux/features/auth/authSlice";
// import PersonAddAltOutlinedIcon from '@mui/icons-material/PersonAddAltOutlined';
// import { PersonAddOutlined, PersonRemoveOutlined } from "@mui/icons-material";

const initialState = {
  name: "",
  email: "",
  password: "",
  password2: "",
};

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState(initialState);
  const { name, email, password, password2 } = formData;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const register = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      return toast.error("Please enter a avalid email");
    }
    if (password !== password2) {
      return toast.error("Passwords do not match");
    }

    const userData = {
      name,
      email,
      password,
    };
    setIsLoading(true);
    try {
      const data = await registerUser(userData);
      await dispatch(SET_LOGIN(true));
      await dispatch(SET_NAME(data.name));
      navigate("/dashboard");
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };
  return (
    <div>
      {isLoading && <Loader />}
      <div className="flex justify-center items-center bg-slate-900  h-screen">
        <button
          className="btn btn-sm text-xl mt-2 pb-1 normal-case bg-slate-900 text-zinc-100
                        hover:bg-slate-400 hover:text-black absolute top-0 left-1"
        >
          <Link to="/" className="font-bold text-blue-500">
            Back
          </Link>
        </button>
        <div class="p-4 w-4/5 sm:w-3/4 md:w-1/2 lg:w-1/4 bg-slate-700 rounded-xl">
          <form class="form-control flex justify" onSubmit={register}>
            <input
              type="text"
              placeholder="Name"
              required
              name="name"
              value={name}
              onChange={handleInputChange}
              class="input"
            />

            <input
              type="email"
              placeholder="Email"
              required
              name="email"
              value={email}
              onChange={handleInputChange}
              class="input mt-2"
            />

            <input
              type="password"
              placeholder="Password"
              required
              name="password"
              value={password}
              onChange={handleInputChange}
              class="input mt-2"
            />

            <input
              type="password"
              placeholder="Confirm Password"
              required
              name="password2"
              value={password2}
              onChange={handleInputChange}
              class="input mt-2"
            />

            <div className="flex justify-center">
              <button
                className="btn btn-sm text-xl mt-4 pb-1 normal-case bg-blue-600 text-white
                        hover:bg-blue-400 hover:text-black shadow-md shadow-blue-300 border-none"
                type="submit"
              >
                Register
              </button>
            </div>
            <div className="text-white mt-4 flex justify-center">
              <p>&nbsp; Already have an account?&nbsp;</p>
              <Link to="/login" className="font-bold text-blue-500">
                Login
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
