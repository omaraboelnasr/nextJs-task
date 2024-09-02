"use client"
import React, { useEffect } from 'react';
import { redirect } from 'next/navigation';
const Page = () => {

    useEffect(()=>{
        let token = localStorage.getItem('token')
        if (!token) {
            redirect('/')
        }
    },[])
    return (
        <div>
            <h1>Dashboard page</h1>
        </div>
    );
}

export default Page;
