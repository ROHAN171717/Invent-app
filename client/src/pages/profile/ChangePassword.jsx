import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
import Loader from '../../components/Loader/Loader';
import { changePassword } from '../../services/authServices';

const initialState = {
    oldPassword: "",
    password: "",
    password2: "",
}

const ChangePassword = () => {

    const navigate = useNavigate();
    const [formData, setFormData] = useState(initialState);
    const { oldPassword, password, password2 } = formData;
    const [isLoading, setIsLoading] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const changePass = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        if(password !== password2){
            return toast.error("New Passwords do not match");
        }

        const formData = {
            oldPassword,
            password,
        }

        const data = await changePassword(formData);
        setIsLoading(false);
        if(data?.response?.status === 400){
            toast.error(data);

        }
        else{
            toast.success(data);
            navigate("/dashboard");
        }
    };

  return (
    <div>
        {isLoading && <Loader/>}
        <form 
        onSubmit={changePass}
        className='flex justify-center my-4 '>
                <div class="p-10 card bg-black w-1/3 md:w-1/3 sm: bg-slate-500 ">
                <div class="form-control flex justify">
                    <div className='flex justify-center'>
                        <h1 className='font-bold text-2xl mb-4 bg-red-400 rounded-xl text-center p-2 text-zinc-800 w-1/2 '>Change Password</h1>
                    </div>

                    <label class="label">
                        <span class="label-text text-white">Old Password</span>
                    </label> 
                    <input type="password" placeholder="Old Password" required name='oldPassword' value={oldPassword} onChange={handleInputChange} class="input"/>

                    <label class="label">
                        <span class="label-text text-white">Password</span>
                    </label> 
                    <input type="password" placeholder="Password" required name='password' value={password} onChange={handleInputChange} class="input"/>

                    <label class="label">
                        <span class="label-text text-white">Confirm Password</span>
                    </label> 
                    <input type="password" placeholder="New Password" required name='password2' value={password2} onChange={handleInputChange} class="input"/>

                    <div className='flex justify-center'>
                    <button 
                    type='submit'
                    className="btn border-none bg-blue-500 hover:bg-orange-400 w-1/2 text-lg mt-4">Change Password</button>
                    </div>
                </div>
                </div>
            </form>
        
    </div>
  )
}

export default ChangePassword;
