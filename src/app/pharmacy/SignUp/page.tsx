"use client";

import Link from "next/link";
import React, { useState } from "react";

interface FormErrors {
    email?: string;
    confirmEmail?: string;
    password?: string;
    confirmPassword?: string;
    firstName?: string;
    lastName?: string;
    phone?: string;
    certificate?: string;
    address?: {
        address?: string;
        subDistrict?: string;
        district?: string;
        province?: string;
        zipCode?: string;
        contact?: string;
        storeImg?: string;
    };
}

export default function SignUp() {
    const [formData, setFormData] = useState({
        email: "",
        confirmEmail: "",
        password: "",
        confirmPassword: "",
        firstName: "",
        lastName: "",
        phone: "",
        certificate: "",
        address: {
            address: "",
            subDistrict: "",
            district: "",
            province: "",
            zipCode: "",
            contact: "",
            storeImg: "",
        }
    });

    const [errors, setErrors] = useState<FormErrors>({});

    const handleChange = (
        e: React.ChangeEvent<HTMLElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        if (name.includes("address")) {
            const key = name.split(".")[1];
            setFormData({
                ...formData,
                address: {
                    ...formData.address,
                    [key]: value,
                },
            });
        } else {
            setFormData({ ...formData, [name]: value });
        }
        setErrors({ ...errors, [name]: "" });
    }

    const validateForm = () => {
        const newErrors: FormErrors = {};

        if (!formData.email) newErrors.email = "Email is required";
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
        newErrors.email = "Invalid email format";

        if (!formData.confirmEmail)
        newErrors.confirmEmail = "Confirm email is required";
        else if (formData.email !== formData.confirmEmail)
        newErrors.confirmEmail = "Emails do not match";

        if (!formData.password) {
        newErrors.password = "Password is required";
        } else if (formData.password.length < 8) {
        newErrors.password = "Password must be at least 8 characters";
        } else if (formData.password.includes(" ")) {
        newErrors.password = "Password cannot contain spaces";
        }

        if (!formData.confirmPassword)
        newErrors.confirmPassword = "Confirm password is required";
        else if (formData.password !== formData.confirmPassword)
        newErrors.confirmPassword = "Passwords do not match";

        if (!formData.firstName) newErrors.firstName = "First name is required";
        if (!formData.lastName) newErrors.lastName = "Last name is required";

        if (!formData.phone) newErrors.phone = "Phone number is required";
        else if (!/^\d{10,15}$/.test(formData.phone))
        newErrors.phone = "Phone number must be 10-15 digits";

        if (!formData.address.address)
        newErrors.address = { address: "Address is required" };
        if (!formData.address.subDistrict)
        newErrors.address = { subDistrict: "Sub District is required" };
        if (!formData.address.district)
        newErrors.address = {
            ...newErrors.address,
            district: "District is required",
        };
        if (!formData.address.province)
        newErrors.address = {
            ...newErrors.address,
            province: "Province is required",
        };
        if (!formData.address.zipCode)
        newErrors.address = {
            ...newErrors.address,
            zipCode: "Zip Code is required",
        };
        if (!formData.address.contact)
        newErrors.address = {
            ...newErrors.address,
            province: "Contact is required",
        };
        if (!formData.address.storeImg)
        newErrors.address = {
            ...newErrors.address,
            zipCode: "Store Image is required",
        };

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!validateForm()) {
        return;
        }

        const response = await fetch("http://localhost:3001/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
        });

        const result = await response.json();

        if (response.ok) {
        alert("Registration successful!");
        } else {
        alert(`Error: ${result.error}`);
        }
    };

  return (
    <div className="min-h-screen">
        <header
        className="relative flex flex-wrap sm:justify-start sm:flex-nowrap w-full text-sm py-3"
        style={{ backgroundColor: "#EAF8EE" }}
      >
        <nav className="max-w-[85rem] w-full mx-auto px-4 sm:flex sm:items-center sm:justify-between">
          <div className="flex items-center justify-between w-full">
            <div>
              <a
                style={{ color: "#3EBE71" }}
                className="flex-none text-2xl font-bold focus:outline-none focus:opacity-80"
                href="#"
                aria-label="Brand"
              >
                GoMed
              </a>
            </div>
            <div>
              <Link
                style={{ fontWeight: "bold" }}
                className="font-medium text-gray-600 hover:text-black-400 focus:outline-none focus:text-gray-400"
                href="/SignIn"
              >
                Sign In
              </Link>
            </div>
          </div>
        </nav>
        </header>

        <div
            className="h-full"
            style={{
            backgroundColor: "#EAF8EE",
            borderRadius: "0 0 100px 100px",
            borderBottom: "1px solid #3EBE71",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            }}
        >
            <div className="flex justify-center gap-8 items-center py-8 px-4 mx-auto max-w-screen-xl">
                <div className="mt-5 md:mt-0 text-center">
                    <div className="text-7xl font-semibold mt-5 mb-5">
                        <h1 className="">Create Account</h1>
                        <span>as a </span>
                        <span className="text-[#3EBE71]">Pharmacy</span>

                        <p className="text-xl font-medium text-gray-400 mt-4">
                            Already have an account?{" "}
                            <span className="underline text-blue-600">
                            <a href="/SignIn">Sign In</a>
                            </span>
                        </p>
                    </div>
                </div>
            </div>
        </div>

        <div className="min-h-screen p-4">
            <form onSubmit={handleSubmit}>
                <div className="flex-1 border rounded-lg p-4 md:p-6 lg:p-8 h-full">
                    <div className="max-w-3xl mx-auto space-y-6">
                        {/* Email Fields */}
                        <div className="grid md:grid-cols-2 gap-4 lg:gap-6">
                        <div className="space-y-2">
                            <label className="block text-sm font-medium">Email</label>
                            <input
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Enter your email address"
                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="block text-sm font-medium">
                            Confirm Email
                            </label>
                            <input
                            name="confirmEmail"
                            value={formData.confirmEmail}
                            onChange={handleChange}
                            placeholder="Enter your confirm email address"
                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        </div>

                        {/* Password Fields */}
                        <div className="grid md:grid-cols-2 gap-4 lg:gap-6">
                        <div className="space-y-2">
                            <label className="block text-sm font-medium">
                            Password
                            </label>
                            <input
                            name="password"
                            type="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Enter your password"
                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="block text-sm font-medium">
                            Confirm Password
                            </label>
                            <input
                            name="confirmPassword"
                            type="password"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            placeholder="Enter your confirm password"
                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        </div>
                    </div>
                </div>

                <div className="flex-1 border rounded-lg p-4 md:p-6 lg:p-8 h-full mt-5">
                    <div className="max-w-3xl mx-auto space-y-6">
                        <div className="grid md:grid-cols-2 gap-4 lg:gap-6">
                            <div className="space-y-2">
                                <label className="block text-sm font-medium">
                                First Name
                                </label>
                                <input
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleChange}
                                placeholder="Enter your first name"
                                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="block text-sm font-medium">
                                Last Name
                                </label>
                                <input
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleChange}
                                placeholder="Enter your last name"
                                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="block text-sm font-medium">
                                Phone Number
                                </label>
                                <input
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                placeholder="Enter your phone number"
                                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="block text-sm font-medium" for="file_input">Certificate in Pharmacy</label>
                                <input className="block w-full px-2 py-2 border border-[#6B7280] rounded-md text-sm text-[#ACACAC] focus:outline-none" id="file_input" type="file"/>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex-1 border rounded-lg p-4 md:p-6 lg:p-8 h-full mt-5">
                <div className="max-w-3xl mx-auto space-y-6">
                    <div className="grid md:grid-cols-1 gap-4 lg:gap-6">
                    <div className="space-y-2">
                        {/* Address Fields */}
                        <label className="block text-sm font-medium">Address</label>
                        <input
                        name="address.address"
                        value={formData.address.address}
                        onChange={handleChange}
                        placeholder="Address"
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4 lg:gap-6">
                    {/* Sub District Fields */}
                    <div className="space-y-2">
                        <label className="block text-sm font-medium">
                        Sub District
                        </label>
                        <input
                        name="address.subDistrict"
                        value={formData.address.subDistrict}
                        onChange={handleChange}
                        placeholder="Sub District"
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    {/* District Fields */}
                    <div className="space-y-2">
                        <label className="block text-sm font-medium">
                        District
                        </label>
                        <input
                        name="address.district"
                        value={formData.address.district}
                        onChange={handleChange}
                        placeholder="District"
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4 lg:gap-6">
                    {/* Province Fields */}
                    <div className="space-y-2">
                        <label className="block text-sm font-medium">
                        Province
                        </label>
                        <input
                        name="address.province"
                        value={formData.address.province}
                        onChange={handleChange}
                        placeholder="Province"
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    {/* Zip Code Fields */}
                    <div className="space-y-2">
                        <label className="block text-sm font-medium">
                        Zip Code
                        </label>
                        <input
                        name="address.zipCode"
                        value={formData.address.zipCode}
                        onChange={handleChange}
                        placeholder="Zip Code"
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    </div>
                </div>
                </div>

                <div className="flex justify-center items-center mt-5">
                    <button
                    type="submit"
                    className="w-[300px] bg-green-500 font-semibold text-white text-2xl py-1 rounded-lg"
                    >
                    Create Account
                    </button>
                </div>
            </form>
        </div>
    </div>
  );
}

