"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function SignIn() {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const [error, setError] = useState("");
    const router = useRouter();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        setError(""); // Clear error when user types
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    
        if (!formData.email || !formData.password) {
            setError("Please fill in all fields.");
            return;
        }
    
        console.log("Submitting login data:", formData);  //
    
        try {
            const response = await fetch("http://localhost:3001/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });
    
            const result = await response.json();
            console.log("Response Data:", result);  //
    
            if (response.ok) {
                alert("Login successful!");
                localStorage.setItem("token", result.token); //
    
                //Redirect ไปที่ `customer/Home`
                router.push("/customer/Home");  
            } else {
                setError(result.error || "Invalid email or password.");
            }
        } catch (error) {
            console.error("Login request failed:", error);  // 
            setError("Server error. Please try again later.");
        }
    };
    return(

        <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-lg">
                <h1 className="text-center text-2xl font-bold text-[#3EBE71] sm:text-3xl">Get started today</h1>

                <p className="text-center text-sm text-gray-500 mt-2">Don't have any account?
                    <span> </span>
                    <Link className="underline" href="/customer/SignUp">Sign Up</Link>
                </p>

                <form onSubmit={handleSubmit}  className="mb-0 mt-6 space-y-4 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8 border border-[#3EBE71] ">
                    <p className="text-center text-lg font-medium">Sign In to your account</p>

                    <div>
                        <label htmlFor="email" className="">Email</label>

                        <div className="relative mt-2">
                            <input 
                            type="email" 
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm" 
                            placeholder="Enter your email address"/>

                        </div>
                    </div>

                    <div>
                        <label htmlFor="password" className="">Password</label>

                        <div className="relative mt-2">
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                            placeholder="Enter your password"
                        />

                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full rounded-lg bg-[#3EBE71] hover:bg-white hover:text-[#3EBE71] hover:border-[#3EBE71] hover:border px-5 py-3 text-sm font-bold text-white"
                    >
                        Sign In
                    </button>
                </form>
            </div>
        </div>
    );
}
