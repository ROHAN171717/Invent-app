import axios from 'axios';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaEnvelope, FaPhoneAlt, FaTwitter } from 'react-icons/fa';
import { GoLocation } from "react-icons/go";
import { toast } from 'react-toastify';
import useRedirectLoggedOutUser from '../../customeHook/useRedirectLoggedOutUser';

const Contact = () => {
    
    useRedirectLoggedOutUser("/login");

    const [subject, setSubject] = useState("");
    const [message, setMessage] = useState("");
    const data = {
        subject,
        message,
    }

    const sendEmail = async (e) => {
        e.preventDefault();
        try{
            const response = await axios.post("/api/contact", data);
            setSubject("");
            setMessage("");
            toast.success(response.data.message);
        } catch (error){
            toast.error(error.message);
        }
    };

  return (
    <div className='px-2 py-6 md:p-4 rounded-lg my-2 body relative'>
        <button className='btn btn-sm text-xl mt-2 pt-1 normal-case bg-slate-900 text-zinc-100
                        hover:bg-slate-400 hover:text-black absolute top-1 left-1 border-none'>
          <Link to="/dashboard" className='font-bold text-blue-500'>Back</Link>
     </button>
      <h3 className='text-5xl font-bold text-zinc-100 mt-8 mb-2 sm:mb-1 sm:mt-0 text-center'>Contact Us</h3>
      <div className='md:flex md:justify-center w-full'>
      <form 
      onSubmit={sendEmail}
      className='flex md:w-1/2 md:mr-4 mb-4'>
                <div class="p-4 card bg-slate-400 w-full">
                <div class="form-control">
                     
                    <label class="label">
                        <span class="label-text text-white text-lg">Subject</span>
                    </label> 
                    <input type="text" placeholder="subject" 
                    required 
                    name='name' 
                    value={subject} 
                    class="input"
                    onChange={(e) => setSubject(e.target.value)}/>


                    <label class="label">
                        <span class="label-text text-white text-lg">Message</span>
                    </label> 
                    <textarea className="textarea" placeholder="Message"
                    required
                    cols="30"
                    rows="5" 
                    name='description'
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}></textarea>

                    <div className='flex justify-center'>
                    <button className="btn btn-sm text-2xl mt-4 normal-case bg-blue-600 text-white
                        hover:bg-blue-400 border-none hover:text-black w-full h-12 shadow-md shadow-blue-300" type='submit' >Send Message</button>
                    </div>
                </div>
                </div>
            </form>
            <div className='bg-red-300 p-4 rounded-2xl h-1/2'>
                <h3 className='text-3xl font-bold my-2'>Our Contact Information</h3>
                <p className='text-bold text-xl mb-4'>Fill the form or contact us via other channels listed below.</p>
                <div >
                    <span className='flex text-xl mb-2'>
                        <FaPhoneAlt className='mt-1 mr-2'/>
                        <p>+123456789</p>
                    </span>
                    <span className='flex text-xl mb-2'>
                        <FaEnvelope className='mt-1 mr-2'/>
                        <p>Support@invet.com</p>
                    </span>
                    <span className='flex text-xl mb-2'>
                        <GoLocation className='mt-1 mr-2'/>
                        <p>Rajkot, Gujarat, India</p>
                    </span>
                    <span className='flex text-xl'>
                        <FaTwitter className='mt-1 mr-2'/>
                        <p>@Rohan</p>
                    </span>
                </div>
            </div>
      </div>
    </div>
  )
}

export default Contact;
