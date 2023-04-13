import React, { useState } from 'react';
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Loader from '../../components/Loader/Loader';
import { loginUser, validateEmail } from "../../services/authServices";
import { SET_LOGIN, SET_NAME } from '../../redux/features/auth/authSlice';




  const initialState = {
    email: "",
    password: "",
  };

const Login = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isLoading,setIsLoading] = useState(false);
    const [formData,setFormData] = useState(initialState);
    const {  email, password } = formData;

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    }

    const login = async (e) => {
        e.preventDefault();
        if(!validateEmail(email)){
            return toast.error("Please enter a avalid email");
        }

        const userData = {
            email,
            password,
        };
        setIsLoading(true);
        try{
            const data = await loginUser(userData);
            await dispatch(SET_LOGIN({flag: true, name: data.name}));
            await dispatch(SET_NAME(data.name));
            navigate("/dashboard");
            setIsLoading(false);
        }catch(error){
            console.log(error);
            setIsLoading(false);
        }
    }
  return (
    <div>
        {isLoading && <Loader/>}
        <div className='flex justify-center items-center bg-slate-900 h-screen'>
                <button className='btn btn-sm text-xl mt-2 pb-1 normal-case bg-slate-900 text-zinc-100
                        hover:bg-slate-400 hover:text-black absolute top-0 left-1'>
                    <Link to="/" className='font-bold text-blue-500'>Back</Link>
                </button>
                <div class="p-4 w-4/5 sm:w-3/4 md:w-1/2 lg:w-1/4 bg-slate-700 rounded-xl">
                <form class="form-control flex justify " onSubmit={login}>
                    
                    <input type="email" placeholder="Email" required name='email' value={email} onChange={handleInputChange} class="input"/>

                    <input type="password" placeholder="Password" required name='password' value={password} onChange={handleInputChange} class="input mt-2"/>

                    <div className='flex justify-center'>
                    <button className='btn btn-sm text-xl mt-4 pb-1 normal-case bg-blue-600 text-white
                        hover:bg-blue-400 hover:text-black shadow-md shadow-blue-300 border-none' type='submit'>Login
                    </button>
                    </div>
                    <div className='text-white mt-4 flex justify-center'>
                        <p>&nbsp; New user?&nbsp;</p>
                        <Link to="/register" className='font-bold text-blue-500'>Sign Up</Link>
                    </div>
                    <div className='text-white mt-1 flex justify-center'>
                        <Link to="/forgot" className='font-bold text-blue-500'>Forgot Password ?</Link>
                    </div>
                </form>
                </div>
            </div>
    </div>
  )
}

export default Login
