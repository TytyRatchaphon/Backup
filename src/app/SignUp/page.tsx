'use client';

import React, { useState } from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Link from 'next/link';


interface FormErrors {
    email?: string;
    confirmEmail?: string;
    password?: string;
    confirmPassword?: string;
    firstName?: string;
    lastName?: string;
    gender?: string;
    dateOfBirth?: string;
    phone?: string;
    chronicDisease?: string;
    medicationAllergy?: string;
}

export default function SignUp() {
    const [formData, setFormData] = useState({
        email: '',
        confirmEmail: '',
        password: '',
        confirmPassword: '',
        firstName: '',
        lastName: '',
        gender: '',
        dateOfBirth: '',
        phone: '',
        chronicDisease: '',
        medicationAllergy: '',
    });

    const [errors, setErrors] = useState<FormErrors>({});

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });


        setErrors({ ...errors, [name]: '' });
    };

    const validateForm = () => {
        const newErrors: FormErrors = {};

        if (!formData.email) newErrors.email = 'Email is required';
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Invalid email format';

        if (!formData.confirmEmail) newErrors.confirmEmail = 'Confirm email is required';
        else if (formData.email !== formData.confirmEmail) newErrors.confirmEmail = 'Emails do not match';

        if (!formData.password) newErrors.password = 'Password is required';
        else if (formData.password.length < 8) newErrors.password = 'Password must be at least 8 characters';
        
        if (!formData.confirmPassword) newErrors.confirmPassword = 'Confirm password is required';
        else if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';

        if (!formData.firstName) newErrors.firstName = 'First name is required';
        if (!formData.lastName) newErrors.lastName = 'Last name is required';

        if (!formData.gender) newErrors.gender = 'Gender is required';
        if (!formData.phone) newErrors.phone = 'Phone number is required';
        else if (!/^\d{10,15}$/.test(formData.phone)) newErrors.phone = 'Phone number must be 10-15 digits';

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        const response = await fetch('http://localhost:3001/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });

        const result = await response.json();

        if (response.ok) {
            alert('Registration successful!');
        } else {
            alert(`Error: ${result.error}`);
        }
    };

    return (
        <div>
            <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-lg text-center">
                    <h1 className="text-2xl font-bold sm:text-3xl">Create New Account</h1>
                    <p className="mt-4 text-gray-500 text-left">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Et libero nulla eaque error neque
                        ipsa culpa autem, at itaque nostrum!
                    </p>
                    <p className="mt-4 text-sm text-gray-500 text-left">
                        Already have an account?{' '}
                        <Link className="underline" href="/SignIn">
                            Sign In
                        </Link>
                    </p>
                    <hr className="my-10" />
                </div>
                <div className="mx-auto max-w-lg">
                    <form onSubmit={handleSubmit} className="mx-auto mb-0 max-w-md space-y-4">
                        <div>
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                                placeholder="Enter email"
                            />
                            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                        </div>
                        <div>
                            <label htmlFor="confirmEmail">Confirm Email</label>
                            <input
                                type="email"
                                name="confirmEmail"
                                value={formData.confirmEmail}
                                onChange={handleChange}
                                className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                                placeholder="Confirm email"
                            />
                            {errors.confirmEmail && <p className="text-red-500 text-sm">{errors.confirmEmail}</p>}
                        </div>
                        <div>
                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                                placeholder="Enter password"
                            />
                            {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
                        </div>
                        <div>
                            <label htmlFor="confirmPassword">Confirm Password</label>
                            <input
                                type="password"
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                                placeholder="Confirm password"
                            />
                            {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword}</p>}
                        </div>
                        <div className="flex justify-between items-center gap-5">
                            <div>
                                <label htmlFor="firstName">First Name</label>
                                <input
                                    type="text"
                                    name="firstName"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                    className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                                    placeholder="First Name"
                                />
                                {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName}</p>}
                            </div>
                            <div>
                                <label htmlFor="lastName">Last Name</label>
                                <input
                                    type="text"
                                    name="lastName"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                    className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                                    placeholder="Last Name"
                                />
                                {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName}</p>}
                            </div>
                        </div>
                        <div>
                            <label>Gender</label>
                            <RadioGroup
                                row
                                name="gender"
                                value={formData.gender}
                                onChange={handleChange}
                            >
                                <FormControlLabel value="female" control={<Radio />} label="Female" />
                                <FormControlLabel value="male" control={<Radio />} label="Male" />
                                <FormControlLabel value="other" control={<Radio />} label="Other" />
                            </RadioGroup>
                            {errors.gender && <p className="text-red-500 text-sm">{errors.gender}</p>}
                        </div>
                        <div>
                            <label htmlFor="phone">Phone</label>
                            <input
                                type="text"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                                placeholder="Phone number"
                            />
                            {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
                        </div>
                        <div>
                            <label htmlFor="chronicDisease">Chronic Disease</label>
                            <input
                                type="text"
                                name="chronicDisease"
                                value={formData.chronicDisease}
                                onChange={handleChange}
                                className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                                placeholder="Chronic Disease"
                            />
                        </div>
                        <div>
                            <label htmlFor="medicationAllergy">Medication Allergy</label>
                            <input
                                type="text"
                                name="medicationAllergy"
                                value={formData.medicationAllergy}
                                onChange={handleChange}
                                className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                                placeholder="Medication Allergy"
                            />
                        </div>
                        <div className="flex items-center justify-between my-10">
                            <button
                                type="submit"
                                className="w-full inline-block rounded-lg bg-blue-500 px-5 py-3 text-sm font-medium text-white"
                            >
                                Sign Up
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
