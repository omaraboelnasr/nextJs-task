"use client"
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { redirect, useRouter } from 'next/navigation';
import axios from 'axios';
import { FaRegEye } from "react-icons/fa6";
import { FaRegEyeSlash } from "react-icons/fa6";
import { toast } from "react-toastify";
import { useAuth } from '@/app/context/authContext';

const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const router = useRouter()
    const { setAuth } = useAuth();
    const [showPassword,setShowPassword]=useState(false)
    const handleShowPassword=()=>{
        setShowPassword(!showPassword)
    }
    const onSubmit = async (data) => {
        try {
            const response = await axios.post('https://cyparta-backend-gf7qm.ondigitalocean.app/api/login/', data)
            localStorage.setItem("token", response.data.access)
            setAuth(true)
            toast.success("login success")
            router.push('/dashboard')
            console.log(response);
        } catch (error) {
            toast.error(error?.message)
            console.log(error);
        }
    };

    useEffect(()=>{
        let token = localStorage.getItem('token')
        if (token) {
            redirect('/dashboard')
        }
    },[])

    return (
        <>
            <div className='h-full flex flex-col items-center justify-center'>
                <div className='mb-3'>
                    <Image src='/imgs/cypartal logo 1.png' alt="Company logo" width={225} height={102} />
                </div>
                <div className="flex border-2 border-rgba(233, 233, 233, 1) shadow rounded-lg w-full max-w-md sm:max-w-lg lg:max-w-xl" >
                    <div className=" w-full flex justify-center">
                        <form onSubmit={handleSubmit(onSubmit)} className='w-3/4 pt-16 pb-16'>
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                    Email Address
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="email"
                                        type="email"
                                        autoComplete="email"
                                        {...register('email', { required: 'Email is required' })}
                                        className="block w-full rounded-md border-0 p-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset  sm:text-sm sm:leading-6"
                                    />
                                    {errors.email && <p className="text-red-500">{errors.email.message}</p>}
                                </div>
                            </div>

                            <div className=" mt-2">
                                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                    Password
                                </label>
                                <div className="mt-2 relative flex">
                                    <input
                                        id="password"
                                        type={showPassword?'text':'password'}
                                        {...register('password', { required: 'password is required' })}
                                        className="block w-full rounded-md border-0 p-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset  sm:text-sm sm:leading-6"
                                    />
                                    <div className='absolute end-0 pt-2 pe-2'>
                                    <span onClick={handleShowPassword}>{showPassword?<FaRegEye className='text-gray-500' />:<FaRegEyeSlash className='text-gray-500' />}</span>
                                    </div>
                                </div>
                                {errors.password && <p className="text-red-500">{errors.password.message}</p>}
                            </div>
                            <button type="submit" className="w-full mt-16 bg-black text-white py-2 px-4 rounded-md">Login</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Login;
