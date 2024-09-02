"use client"
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { MdOutlineSpaceDashboard } from "react-icons/md";
import { FaPeopleLine } from "react-icons/fa6";
import { IoPersonOutline } from "react-icons/io5";
import { FaRegCalendarCheck } from "react-icons/fa6";
import { RiNewspaperLine } from "react-icons/ri";
import { CiDollar } from "react-icons/ci";
import { BiTask } from "react-icons/bi";
import { IoWalletOutline } from "react-icons/io5";
import { useAuth } from '@/app/context/authContext';
import { TbLogout2 } from "react-icons/tb";
import { useRouter } from 'next/navigation';
import { IoIosArrowForward } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";

const Sidebar = () => {
    const [openEmp, setOpenEmp] = useState(false)
    const { auth, setAuth } = useAuth()
    const router = useRouter()
    const handelLogOut = () => {
        localStorage.removeItem('token')
        router.push('/')
        setAuth(false)
    }
    useEffect(() => {

    }, [auth])
    return (
        <>
            <aside className="h-full rounded-3xl bg-white shadow-md border-2 border-rgba(233, 233, 233, 1)">
                <div className="flex justify-center p-9">
                    <Image src='/imgs/cypartal logo 1.png' alt="Company logo" width={150} height={158} />
                </div>
                {auth ? <nav className="mt-8 flex flex-col text-center  w-full">
                    <Link href="/dashboard" className="flex items-center justify-center px-4 py-2  hover:bg-gray-100 ">
                        <MdOutlineSpaceDashboard className='w-5 h-5 mr-2' />
                        Dashboard
                    </Link>
                    <div
                        className={`flex items-center justify-between px-4 py-2 cursor-pointer ${openEmp
                                ? 'bg-red-50 text-red-600 border-l-4 border-red-600'
                                : 'hover:bg-gray-100'
                            }`}
                        onClick={() => setOpenEmp(!openEmp)}
                    >
                        <div className="flex-grow flex justify-center items-center">
                            <FaPeopleLine className="w-5 h-5 mr-2" />
                            Employees
                        </div>
                        <div className="flex items-center">
                            {openEmp?<IoIosArrowDown />:<IoIosArrowForward />}
                        </div>
                    </div>
                    {openEmp && <>
                        <div className="flex flex-col  ">
                            <Link href="/dashboard/profile" className="flex items-center justify-center px-4 py-2 hover:bg-gray-100">
                                <IoPersonOutline className='w-5 h-5 mr-2' />
                                Profile
                            </Link>
                            <Link href="/profile" className="flex items-center justify-center px-4 py-2 hover:bg-gray-100">
                                <FaRegCalendarCheck className='w-5 h-5 mr-2' />
                                Attendance
                            </Link>
                            <Link href="/profile" className="flex items-center justify-center px-4 py-2 hover:bg-gray-100">
                                <RiNewspaperLine className='w-5 h-5 mr-2' />
                                Tasks
                            </Link>
                        </div>
                    </>
                    }
                    <Link href="/profile" className="flex items-center justify-center px-4 py-2 hover:bg-gray-100">
                        <CiDollar className='w-5 h-5 mr-2' />
                        Payrol
                    </Link>

                    <Link href="/profile" className="flex items-center justify-center px-4 py-2 hover:bg-gray-100">
                        <BiTask className='w-5 h-5 mr-2' />
                        Holidays
                    </Link>

                    <Link href="/profile" className="flex items-center justify-center px-4 py-2 hover:bg-gray-100">
                        <IoWalletOutline className='w-5 h-5 mr-2' />
                        Advanced Payment
                    </Link>

                    <div className="flex items-center cursor-pointer justify-center px-4 py-2 hover:bg-gray-100" onClick={handelLogOut}>
                        <TbLogout2 className='w-5 h-5 mr-2' />
                        Logout
                    </div>
                </nav> :
                    <nav className="mt-8 flex flex-col text-center  w-full">
                        <Link href="/" className="flex items-center justify-center px-4 py-2  hover:bg-gray-100 ">
                            <MdOutlineSpaceDashboard className='w-5 h-5 mr-2' />
                            Login
                        </Link>
                    </nav>
                }
            </aside>
        </>
    );
}

export default Sidebar;
