"use client"

import React from "react";
import Link from "next/link";
import { useState } from "react";
import { notify, warn, baseApiUrl } from "@/app/layout";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


export default function SignupForm() {

    const [response, setResponse] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)


    const [signupForm, setSignupForm] = useState({
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        confirm_password: "",
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setSignupForm((prevState) => {
            return {
            ...prevState,
            [name]: value,
            };
        });
    };

    // handle submit event for signup form.
    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true)
        setResponse(null)
        setError('')

        try {
            const response = await fetch(`${baseApiUrl}/user`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(signupForm),
            });

            if (response.ok) {
                const data = await response.json();
                setResponse(data.message);
                console.log(response);
            } else {
                const errorData = await response.json();
                setError(errorData.detail);
                console.log(error);
            }
          
            setLoading(false);
          } catch (err) {
            console.error(err);
            setError('An error occurred while processing your request.');
            console.log(error);
            setLoading(false);
          }
          
    };

    if (error) {
		warn(`${error}`);
        setError('');
	}

	if (response) {
		notify(`${response}`)
        setResponse('');
	}
 

    return(
        <>
            <div className="md:w-[400px] px-7 md:px-0 mx-auto pb-20 md:pb-0 my-10">
                <div className="pb-10 mt-5">
                    <p className=" font-bold text-[30px] text-center">Get Started</p>
                    <p>Get ready for a whole new collaboration experience.</p>
                </div>
                <form onSubmit={handleSubmit} className="flex flex-col text-[16px]">
                    <label htmlFor="fname">First Name</label>
                    <input type="text" value={signupForm.first_name} onChange={handleChange} name="first_name" className="border border-gray-300 rounded-md mb-2 p-1" required/>

                    <label htmlFor="lname">Last Name</label>
                    <input type="text" value={signupForm.last_name} onChange={handleChange} name="last_name" className="border border-gray-300 rounded-md mb-2 p-1" required/>

                    <label htmlFor="email">Email Address</label>
                    <input type="text" value={signupForm.email} onChange={handleChange} name="email" className="border border-gray-300 rounded-md mb-2 p-1" required/>

                    <label htmlFor="password">Password</label>
                    <input type="password" value={signupForm.password} onChange={handleChange} name="password" className="border border-gray-300 rounded-md mb-2 p-1" required/>

                    <label htmlFor="password">Confirm Password</label>
                    <input type="password" value={signupForm.confirm_password} onChange={handleChange} name="confirm_password" className="border border-gray-300 rounded-md mb-2 p-1" required/>

                    <div className="flex items-center gap-4 pl-2 py-2">
                        <input type="checkbox" id="policy" name="policy" value="Policy" />
                        <label htmlFor="policy"> I agree to the Terms and Policy.</label>
                    </div>
                    <button className="bg-[#145DA0] p-3 text-white rounded-md">{loading ? 'Loading...' : 'Signup'}</button>
                </form>
                <p className="text-[16px] py-2">Already have an account? <Link href="/auth/signin" className="text-blue-700 hover:underline">Sign In</Link></p>
            </div>
            <ToastContainer />
        </>
    )
}
