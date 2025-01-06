'use client';

import React, { useState } from 'react';
import FormControlLabel from '@mui/material/FormControlLabel';
import Link from 'next/link';
import { RadioGroup, RadioGroupItem } from '@components/components/ui/radio-group';
import { Label } from '@components/components/ui/label';



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

        if (!formData.password) {
            newErrors.password = 'Password is required';
        } else if (formData.password.length < 8) {
            newErrors.password = 'Password must be at least 8 characters';
        } else if (formData.password.includes(' ')) {
            newErrors.password = 'Password cannot contain spaces';
        }

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
            <header className="relative flex flex-wrap sm:justify-start sm:flex-nowrap w-full text-sm py-3" style={{backgroundColor: '#EAF8EE'}}>
                <nav className="max-w-[85rem] w-full mx-auto px-4 sm:flex sm:items-center sm:justify-between">
                    <div className="flex items-center justify-between">
                        <a style={{color: '#3EBE71'}} className="flex-none text-2xl font-bold focus:outline-none focus:opacity-80" href="#" aria-label="Brand">
                            GoMed
                        </a>
                        <a href="" className="px-10 text-gray-500">Products</a>
                        <div className="sm:hidden">
                            <button type="button" className="hs-collapse-toggle relative size-7 flex justify-center items-center gap-x-2 rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none" id="hs-navbar-example-collapse" aria-expanded="false" aria-controls="hs-navbar-example" aria-label="Toggle navigation" data-hs-collapse="#hs-navbar-example">
                                <svg className="hs-collapse-open:hidden shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" x2="21" y1="6" y2="6"/><line x1="3" x2="21" y1="12" y2="12"/><line x1="3" x2="21" y1="18" y2="18"/></svg>
                                <svg className="hs-collapse-open:block hidden shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
                                <span className="sr-only">Toggle navigation</span>
                            </button>
                        </div>
                    </div>
                    <div id="hs-navbar-example" className="hidden hs-collapse overflow-hidden transition-all duration-300 basis-full grow sm:block" aria-labelledby="hs-navbar-example-collapse">
                        <div className="flex flex-col gap-5 mt-5 sm:flex-row sm:items-center sm:justify-end sm:mt-0 sm:ps-5">
                            <Link style={{color: '#3EBE71',fontWeight: 'bold'}} className="font-medium focus:outline-none" href="/signUp" aria-current="page">Register</Link>
                            <Link style={{fontWeight: 'bold'}} className="font-medium text-gray-600 hover:text-black-400 focus:outline-none focus:text-gray-400" href="/signIn">Sign In</Link>
                        </div>
                    </div>
                </nav>
            </header>

            <div style={{backgroundColor: '#EAF8EE', borderRadius: '0 0 100px 100px', borderBottom: '1px solid #3EBE71', height: '500px', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <div className="max-w-5xl mx-auto px-4 xl:px-0 pt-24 lg:pt-32 pb-24 text-center">
                    <h1 className="font-semibold text-[#3EBE71] text-5xl md:text-6xl">Create New Account</h1>
                    <div className='mt-4 font-bold text-xl'>
                        <span>Already have an account? </span><Link href="/signIn" className='text-[#4073F4] underline'>Sign In</Link>
                    </div>
                </div>
            </div>

            <section className="bg-white">
                <div className="lg:grid">
                    <main className="flex items-center justify-center px-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6">
                        <div className="max-w-2xl w-[1000px] lg:max-w-3xl">
                            <form action="#" onSubmit={handleSubmit}>
                                <div>
                                    <div className='w-full border border-[#3EBE71] bg-[#3EBE71] text-white text-center col-span-6' style={{borderRadius: '20px 20px 0 0'}}>
                                        <p className='m-2 font-bold'>Email and Password</p>
                                    </div>

                                    <div className='grid grid-cols-6 gap-6 border border-[#3EBE71] px-6 py-6 rounded-2xl' style={{borderRadius: '0 0 20px 20px'}}>
                                        <div className="col-span-6 sm:col-span-3">
                                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                                Email
                                            </label>

                                            <input type="email" name="email" className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm placeholder:text-gray-400"
                                                value={formData.email}
                                                onChange={handleChange}
                                                placeholder='Enter your Email'
                                                />
                                                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                                        </div>

                                        <div className="col-span-6 sm:col-span-3">
                                            <label htmlFor="confirmEmail" className="block text-sm font-medium text-gray-700">
                                                Confirm Email
                                            </label>

                                            <input type="email" name="confirm_Email" className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm placeholder:text-gray-400" placeholder='Enter your Confirm Email'/>
                                                {errors.confirmEmail && <p className="text-red-500 text-sm mt-1">{errors.confirmEmail}</p>}
                                            </div>

                                            <div className="col-span-6 sm:col-span-3">
                                                <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password </label>

                                                <input type="password" name="password" className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm placeholder:text-gray-400" placeholder='Enter your Password'/>
                                                
                                                {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
                                            </div>

                                            <div className="col-span-6 sm:col-span-3">
                                                <label htmlFor="PasswordConfirmation" className="block text-sm font-medium text-gray-700">
                                                    Confirm Password
                                                </label>

                                                <input type="password" name="confirmPassword" className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm placeholder:text-gray-400" placeholder='Enter your Confirm Password'/>

                                                {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
                                            </div>
                                        </div>
                                    </div>

                                    <div className='pt-5'>
                                        <div className='w-full border border-[#3EBE71] bg-[#3EBE71] text-white text-center col-span-6' style={{borderRadius: '20px 20px 0 0'}}>
                                            <p className='m-2 font-bold'>Personal Information</p>
                                        </div>
                                        <div className='grid grid-cols-6 gap-6 border border-[#3EBE71] px-6 py-6 rounded-2xl' style={{borderRadius: '0 0 20px 20px'}}>

                                            <div className="col-span-6 sm:col-span-3">
                                                <label htmlFor="FirstName" className="block text-sm font-medium text-gray-700">
                                                First Name
                                                </label>

                                                <input
                                                type="text"
                                                name="first_name"
                                                value={formData.firstName}
                                                onChange={handleChange}
                                                className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm placeholder:text-gray-400"
                                                placeholder='Enter your First Name'
                                                />
                                                {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}

                                            </div>

                                            <div className="col-span-6 sm:col-span-3">
                                                <label htmlFor="LastName" className="block text-sm font-medium text-gray-700">
                                                Last Name
                                                </label>

                                                <input
                                                type="text"
                                                value={formData.lastName}
                                                onChange={handleChange}
                                                name="last_name"
                                                className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm placeholder:text-gray-400"
                                                placeholder='Enter your Last Name'
                                                />
                                                {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}

                                            </div>

                                            <div className='col-span-6 sm:col-span-3'>
                                                <label htmlFor="" className="block text-sm font-medium text-gray-700 mb-3">Gender</label>
                                                <RadioGroup defaultValue="female">
                                                    <div className='flex gap-10'>
                                                        <div className="flex items-center space-x-2">
                                                            <RadioGroupItem value="female" id="female" />
                                                            <Label htmlFor="female">Female</Label>
                                                        </div>
                                                        <div className="flex items-center space-x-2">
                                                            <RadioGroupItem value="male" id="male" />
                                                            <Label htmlFor="male">Male</Label>
                                                        </div>
                                                        <div className="flex items-center space-x-2">
                                                            <RadioGroupItem value="other" id="other" />
                                                            <Label htmlFor="other">Other</Label>
                                                        </div>
                                                    </div>
                                                </RadioGroup>
                                            </div>
                                            
                                            <div className="col-span-6 sm:col-span-3">
                                                <label htmlFor="" className="block text-sm font-medium text-gray-700">
                                                Phone Number
                                                </label>

                                                <input
                                                type="text"
                                                value={formData.phone}
                                                onChange={handleChange}
                                                name="phoneNumber"
                                                className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm placeholder:text-gray-400"
                                                placeholder='+66'
                                                />
                                                {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                                            </div>

                                        </div>
                                    </div>

                                    {/* Address */}
                                    <div className='pt-5'>
                                        <div className='w-full border border-[#3EBE71] bg-[#3EBE71] text-white text-center col-span-6' style={{borderRadius: '20px 20px 0 0'}}>
                                            <p className='m-2 font-bold'>Address</p>
                                        </div>
                                        <div className='grid grid-cols-6 gap-6 border border-[#3EBE71] px-6 py-6 rounded-2xl' style={{borderRadius: '0 0 20px 20px'}}>

                                            <div className="col-span-6">
                                                <label htmlFor="userAddress" className="block text-sm font-medium text-gray-700">
                                                Address
                                                </label>

                                                <input
                                                type="text"
                                                name="address"
                                                className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm placeholder:text-gray-400"
                                                placeholder='Address'
                                                />

                                                {/* {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>} */}
                                            </div>

                                            <div className="col-span-6 sm:col-span-3">
                                                <label htmlFor="subDistrict" className="block text-sm font-medium text-gray-700">
                                                Sub District
                                                </label>

                                                <input
                                                type="text"
                                                name="subDistrict"
                                                className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm placeholder:text-gray-400"
                                                placeholder='Sub District'
                                                />
                                                {/* errors.subDistrict && <p className="text-red-500 text-sm mt-1">{errors.subDistrict}</p> */}
                                            </div>

                                            <div className="col-span-6 sm:col-span-3">
                                                <label htmlFor="district" className="block text-sm font-medium text-gray-700">
                                                District
                                                </label>

                                                <input
                                                type="text"
                                                name="district"
                                                className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm placeholder:text-gray-400"
                                                placeholder='District'
                                                />
                                                {/* errors.district && <p className="text-red-500 text-sm mt-1">{errors.district}</p> */}
                                            </div>

                                            <div className="col-span-6 sm:col-span-3">
                                                <label htmlFor="province" className="block text-sm font-medium text-gray-700">
                                                Province
                                                </label>

                                                <input
                                                type="text"
                                                name="province"
                                                className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm placeholder:text-gray-400"
                                                placeholder='Province'
                                                />
                                                {/* errors.province && <p className="text-red-500 text-sm mt-1">{errors.province}</p> */}
                                            </div>

                                            <div className="col-span-6 sm:col-span-3">
                                                <label htmlFor="postCode" className="block text-sm font-medium text-gray-700">
                                                Post Code
                                                </label>

                                                <input
                                                type="text"
                                                name="postCode"
                                                className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm placeholder:text-gray-400"
                                                placeholder='Post Code'
                                                />
                                                {/* errors.postCode && <p className="text-red-500 text-sm mt-1">{errors.postCode}</p> */}
                                            </div>

                                        </div>
                                    </div>

                                    <div className='pt-5'>
                                        <div className='w-full border border-[#3EBE71] bg-[#3EBE71] text-white text-center col-span-6' style={{borderRadius: '20px 20px 0 0'}}>
                                            <p className='m-2 font-bold'>Health Information</p>
                                        </div>
                                        <div className='grid grid-cols-6 gap-6 border border-[#3EBE71] px-6 py-6 rounded-2xl' style={{borderRadius: '0 0 20px 20px'}}>

                                            <div className="col-span-3">
                                                <label htmlFor="userAddress" className="block text-sm font-medium text-gray-700">
                                                Chronic Disease
                                                </label>

                                                <div className='flex gap-3'>
                                                    <input
                                                    type="text"
                                                    name="chronicDisease"
                                                    value={formData.chronicDisease}
                                                    onChange={handleChange}
                                                    className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm placeholder:text-gray-400"
                                                    placeholder='Enter your Chronic Disease'
                                                    />

                                                    <button className='mt-1 w-[49px] rounded-md bg-[#3EBE71] text-sm text-white shadow-sm font-bold'>add</button>
                                                </div>
                                            </div>

                                            <div className="col-span-6 sm:col-span-3">
                                                <label htmlFor="userAddress" className="block text-sm font-medium text-gray-700">
                                                    Medication Allergy
                                                </label>

                                                <div className='flex gap-3'>
                                                    <input
                                                    type="text"
                                                    name="medicationAllergy"
                                                    value={formData.medicationAllergy}
                                                    onChange={handleChange}
                                                    className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm placeholder:text-gray-400"
                                                    placeholder='Enter your Medication Allergy'
                                                    />

                                                    <button className='mt-1 w-[49px] rounded-md bg-[#3EBE71] text-sm text-white shadow-sm font-bold'>add</button>
                                                </div>
                                            </div>

                                        </div>
                                    </div>

                                    <div className="col-span-6 sm:flex sm:items-center sm:gap-4 mt-3">
                                        <button
                                        type='submit'
                                        className="w-full inline-block shrink-0 rounded-md border bg-[#3EBE71]  px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-green-500 focus:outline-none focus:ring active:text-blue-500"
                                        >
                                        Create an account
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </main>
                    </div>
            </section>
        </div>
    );
}
