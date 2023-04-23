import React, { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import Loader from "../../components/Loader/Loader";
import { resetPassword } from "../../services/authServices";

const initialState = {
  password: "",
  password2: "",
};

const Reset = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState(initialState);
  const { password, password2 } = formData;
  const { resetToken } = useParams();
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const reset = async (e) => {
    e.preventDefault();

    if (!password || !password2) {
      return toast.error("All fields are required");
    }
    if (password.length < 6) {
      return toast.error("Password must be up to 6 characters");
    }
    if (password !== password2) {
      return toast.error("Passwords do not match");
    }

    const userData = {
      password,
      password2,
    };

    setIsLoading(true);
    try {
      const data = await resetPassword(userData, resetToken);
      toast.success(data.message);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error.message);
    }
    navigate("/login");
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
          <form class="form-control flex justify" onSubmit={reset}>
            <input
              type="password"
              placeholder="New Password"
              required
              name="password"
              value={password}
              onChange={handleInputChange}
              class="input"
            />

            <input
              type="password"
              placeholder="Confrim Password"
              required
              name="password2"
              value={password2}
              onChange={handleInputChange}
              class="input mt-2"
            />

            <div className="flex justify-center">
              <button
                className="btn btn-sm text-lg mt-4 pb-1 normal-case bg-blue-600 text-white
                        hover:bg-blue-400 hover:text-black shadow-md shadow-blue-300 border-none"
                type="submit"
              >
                Reset Password
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Reset;
