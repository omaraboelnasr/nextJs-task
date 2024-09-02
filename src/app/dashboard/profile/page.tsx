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


const Profile = () => {
    const [userProfile, setUserProfile] = useState({})
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
    useEffect(() => {
        getProfile()

    }, [])
    return (
        <>
            <div className='flex justify-end w-11/12'>
            <div className='me-5 p-3 rounded-md self-center bg-gray-100'>
            <FaRegBell />
            </div>
            
            <img src={userProfile?.image} alt="" width={60} height={60} className='rounded-full' />
            </div>
            <div className='mb-2'>
            <p className='flex font-semibold'>Employees<span><IoIosArrowForward className='w-4 h-4 mt-1 mr-1 ml-1' /></span>Profile</p>
            </div>
            <div className='flex justify-between items-start w-5/6'>
                <div>
                    <div className='flex'>
                        <img src={userProfile?.image} alt="" width={100} height={100} />
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
                    <button type="submit" className="flex bg-black text-white py-2 px-4 rounded-md">
                    <CiEdit className='w-5 h-5 mr-2'/> Edit Profile
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
                            <p className="block text-gray-700 mb-1">Work's hours</p>
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


        </>
    );
}

export default Profile;
