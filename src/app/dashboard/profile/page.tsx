"use client"
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { IoBagRemoveOutline } from "react-icons/io5";
import { MdOutlineEmail } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { TiShoppingBag } from "react-icons/ti";
import { HiOutlineDocumentText } from "react-icons/hi";
import { RiShoppingBag4Line } from "react-icons/ri";
import { CiEdit } from "react-icons/ci";
import { IoIosArrowForward } from "react-icons/io";
import { FaRegBell } from "react-icons/fa";
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import { useForm } from 'react-hook-form';
import Image from 'next/image';


const Profile = () => {
    const [userProfile, setUserProfile] = useState({})
    const [open, setOpen] = useState(false)
    const { register, handleSubmit, setValue, reset, watch, control, formState: { errors } } = useForm();
    const getProfile = async () => {
        const token = localStorage.getItem('token');
        if (!token) {
            throw new Error("No token found");
        }
        try {
            const response = await axios.get('https://cyparta-backend-gf7qm.ondigitalocean.app/api/profile/', {
                headers: { Authorization: `Bearer ${token}` }
            });
            setUserProfile(response.data)
            console.log(response.data);
        } catch (error) {
            toast.error(error?.message)
            console.log(error);
        }
    }

    const onSubmit = async (data) => {
        const token = localStorage.getItem('token');
        if (!token) {
            throw new Error("No token found");
        }
        try {
            const response = await axios.patch('https://cyparta-backend-gf7qm.ondigitalocean.app/api/profile/', data, {
                headers: { Authorization: `Bearer ${token}` }
            })
            getProfile()
            toast.success("update success")
        } catch (error) {
            toast.error(error?.message)
        }
    };

    const handleUpdate = ()=>{
        setOpen(!open)
        if(userProfile){
            setValue('first_name', userProfile.first_name)
            setValue('last_name', userProfile.last_name)
            setValue('bio', userProfile.bio)
        }
    }
    useEffect(() => {
        getProfile()

    }, [])
    return (
        <>
            <div className='flex justify-end w-11/12'>
                <div className='me-5 p-3 rounded-md self-center bg-gray-100'>
                    <FaRegBell />
                </div>
                <Image src={userProfile?.image} alt="description" width={60} height={60} className='rounded-full' />
            </div>
            <div className='mb-2'>
                <p className='flex font-semibold'>Employees<span><IoIosArrowForward className='w-4 h-4 mt-1 mr-1 ml-1' /></span>Profile</p>
            </div>
            <div className='flex justify-between items-start w-5/6'>
                <div>
                    <div className='flex'>
                    <Image src={userProfile?.image} alt="description" width={100} height={100} />
                        <div className='ms-5'>
                            <h3 className='font-bold mb-2'>{userProfile?.name}</h3>
                            <div className='flex items-center'>
                                <IoBagRemoveOutline className='w-5 h-5 mr-2' />
                                <p> {userProfile?.bio} </p>
                            </div>
                            <div className='flex items-center'>
                                <MdOutlineEmail className='w-5 h-5 mr-2' />
                                <p> {userProfile?.email}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='self-end me-10'>
                    <button onClick={() => handleUpdate()} className="flex bg-black text-white py-2 px-4 rounded-md">
                        <CiEdit className='w-5 h-5 mr-2' /> Edit Profile
                    </button>
                </div>
            </div>

            <div className="pt-4">
                <div className="flex border-b mb-3">
                    <div className="flex items-center gap-2 px-4 py-2 text-red-600 border-b-2 border-red-600">
                        <FaUser className="h-5 w-5" />
                        <span className="hidden sm:inline">Personal Information</span>
                    </div>
                    <div className="flex items-center gap-2 px-4 py-2 text-gray-600">
                        <TiShoppingBag className="h-6 w-6" />
                        <span className="hidden sm:inline">Professional Information</span>
                    </div>
                    <div className="flex items-center gap-2 px-4 py-2 text-gray-600">
                        <HiOutlineDocumentText className="h-5 w-5" />
                        <span className="hidden sm:inline">Documents</span>
                    </div>
                    <div className="flex items-center gap-2 px-4 py-2 text-gray-600">
                        <RiShoppingBag4Line className="h-5 w-5" />
                        <span className="hidden sm:inline">Account Access</span>
                    </div>
                </div>

                <div className="space-y-2">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <p className="block text-gray-700 mb-1">First Name</p>
                            <div className="w-full border-b border-gray-300">
                                <p>{userProfile?.first_name}</p>
                            </div>
                        </div>
                        <div>
                            <p className="block text-gray-700 mb-1">Last Name</p>
                            <div className="w-full border-b border-gray-300">
                                <p>{userProfile?.last_name}</p>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <p className="block text-gray-700 mb-1">Mobile Number</p>
                            <div className="w-full border-b border-gray-300">
                                <p>{userProfile?.phone}</p>
                            </div>
                        </div>
                        <div>
                            <p className="block text-gray-700 mb-1">Email Address</p>
                            <div className="w-full border-b border-gray-300">
                                <p>{userProfile?.email}</p>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <p className="block text-gray-700 mb-1">Date of Birth</p>
                            <div className="w-full border-b border-gray-300">
                                <p>July 14, 1995</p>
                            </div>
                        </div>
                        <div>
                            <p className="block text-gray-700 mb-1">Marital Status</p>
                            <div className="w-full border-b border-gray-300">
                                <p>Single</p>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <p className="block text-gray-700 mb-1">Gender</p>
                            <div className="w-full border-b border-gray-300">
                                <p>Female</p>
                            </div>
                        </div>
                        <div>
                            <p className="block text-gray-700 mb-1">Nationality</p>
                            <div className="w-full border-b border-gray-300">
                                <p>Egypt</p>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <p className="block text-gray-700 mb-1">Address</p>
                            <div className="w-full border-b border-gray-300">
                                <p>Maadi</p>
                            </div>
                        </div>
                        <div>
                            <p className="block text-gray-700 mb-1">City</p>
                            <div className="w-full border-b border-gray-300">
                                <p>Cairo</p>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <p className="block text-gray-700 mb-1">State</p>
                            <div className="w-full border-b border-gray-300">
                                <p>Cairo</p>
                            </div>
                        </div>
                        <div>
                            <p className="block text-gray-700 mb-1">Zip Code</p>
                            <div className="w-full border-b border-gray-300">
                                <p>35624</p>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                        <div>
                            <p className="block text-gray-700 mb-1">{`Work's hours`}</p>
                            <div className="w-full border-b border-gray-300">
                                <p>180 hour</p>
                            </div>
                        </div>
                        <div>
                            <p className="block text-gray-700 mb-1">Salary/hour</p>
                            <div className="w-full border-b border-gray-300">
                                <p>300 EGP</p>
                            </div>
                        </div>
                        <div>
                            <p className="block text-red-600 mb-1 ">Total Salary</p>
                            <div className="w-full border-b border-gray-300">
                                <p>54000 EGP</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Dialog open={open} onClose={setOpen} className="relative z-10">
                <DialogBackdrop
                    transition
                    className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
                />

                <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                    <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                        <DialogPanel
                            transition
                            className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-lg data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
                        >
                            <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                                <div className="sm:flex sm:items-start">
                                    <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                                        <DialogTitle as="h3" className="text-base font-semibold leading-6 text-gray-900">
                                            Update profile
                                        </DialogTitle>
                                        <div className="mt-2">
                                            <form onSubmit={handleSubmit(onSubmit)}>
                                                <div>
                                                    <label htmlFor="firstName" className="block text-sm font-medium leading-6 text-gray-900">
                                                        First Name
                                                    </label>
                                                    <div className="mt-2">
                                                        <input
                                                            id="firstName"
                                                            type="text"
                                                            {...register('first_name')}
                                                            className="block w-full rounded-md border-0 p-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset  sm:text-sm sm:leading-6"
                                                        />
                                                        {errors.first_name && <p className="text-red-500">{errors.first_name.message}</p>}
                                                    </div>
                                                </div>
                                                <div>
                                                    <label htmlFor="lastName" className="block text-sm font-medium leading-6 text-gray-900">
                                                        Last Name
                                                    </label>
                                                    <div className="mt-2">
                                                        <input
                                                            id="lastName"
                                                            type="text"
                                                            {...register('last_name')}
                                                            className="block w-full rounded-md border-0 p-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset  sm:text-sm sm:leading-6"
                                                        />
                                                        {errors.last_name && <p className="text-red-500">{errors.last_name.message}</p>}
                                                    </div>
                                                </div>
                                                <div>
                                                    <label htmlFor="bio" className="block text-sm font-medium leading-6 text-gray-900">
                                                        Bio
                                                    </label>
                                                    <div className="mt-2">
                                                        <input
                                                            id="bio"
                                                            type="text"
                                                            {...register('bio')}
                                                            className="block w-full rounded-md border-0 p-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset  sm:text-sm sm:leading-6"
                                                        />
                                                        {errors.bio && <p className="text-red-500">{errors.bio.message}</p>}
                                                    </div>
                                                </div>
                                                <div className=" px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                                    <button
                                                        type="submit"
                                                        onClick={() => setOpen(false)}
                                                        className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                                                    >
                                                        Update
                                                    </button>
                                                    <button
                                                        type="button"
                                                        data-autofocus
                                                        onClick={() => setOpen(false)}
                                                        className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                                                    >
                                                        Cancel
                                                    </button>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </DialogPanel>
                    </div>
                </div>
            </Dialog>

        </>
    );
}

export default Profile;
