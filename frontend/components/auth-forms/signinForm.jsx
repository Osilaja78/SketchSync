"use client"
import {React, useState, useContext} from "react";
import Link from "next/link";
import { warn, notify, baseApiUrl } from "@/app/layout";
import { ToastContainer } from "react-toastify";
import { useRouter } from "next/navigation";
import { AuthContext } from "../auth/AuthContext";


export default function LoginForm() {

    const [response, setResponse] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { login } = useContext(AuthContext);

    const router = useRouter();

    const [loginForm, setLoginForm] = useState({
        username: "",
        password: "",
    });

    const handleChange = (event) => {
        setError('');
        setResponse('');
        const { name, value } = event.target;
        setLoginForm((prevState) => {
            return {
            ...prevState,
            [name]: value,
            };
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true)
        setResponse('')
        setError('')

        try {
            const response = await fetch(`${baseApiUrl}/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: new URLSearchParams(loginForm).toString(),
            });
          
            if (response.ok) {
                const data = await response.json();
                if (data.user) {
                    setResponse("Login successful! You're being redirected.");
                    login(data.access_token, data.user, data.user.id);
                    router.push("/");
                } else {
                    setResponse(data.message);
                }
            } else {
                const errorData = await response.json();
                setError(errorData.detail);
            }
          
        setLoading(false);
        } catch (err) {
            console.error(err);
            setError('An error occurred while processing your request.');
            setLoading(false);
        }
    };

    
    if (error) {
		warn(`${error}`);
        setError('');
	}

	if (response) {
		notify(`${response}`);
        setResponse('');
	}


    return(
        <>
            <div className="md:w-[400px] px-7 md:px-0 mx-auto pb-20 md:pb-0 my-10">
                <div className="pb-10">
                    <p className="font-bold text-[30px] text-center">Welcome Back</p>
                    <p>Enter your details to access your account.</p>
                </div>
                <form onSubmit={handleSubmit} className="flex flex-col text-[16px]">

                    <label htmlFor="email">Email Address</label>
                    <input type="text" value={loginForm.username} onChange={handleChange} name="username" className=" border border-gray-300 rounded-md mb-2 p-1" required/>

                    <label htmlFor="password">Password</label>
                    <input type="password" value={loginForm.password} onChange={handleChange} name="password" className=" border border-gray-300 rounded-md mb-2 p-1" required/>

                    <button className="bg-[#145DA0] p-3 text-white rounded-md my-3">{loading ? 'Loading...' : 'Login'}</button>
                </form>
                <p className="text-[16px] py-2">Don&apos;t have an account? <Link href="/auth/signup" className="text-blue-700 hover:underline">Sign Up</Link></p>
            </div>
            <ToastContainer />
        </>
    )
}