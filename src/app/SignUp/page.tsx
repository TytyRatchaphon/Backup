'use client';

import React, { useState } from 'react';
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
    phone?: string;
    address?: {
        subDistrict?: string;
        district?: string;
        province?: string;
        zipCode?: string;
    };
    healthInformation?: {
        chronicDisease?: string;
        medicationAllergy?: string;
    };
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
        phone: '',
        address: {
            subDistrict: '',
            district: '',
            province: '',
            zipCode: '',
        },
        healthInformation: {
            chronicDisease: '',
            medicationAllergy: '',
        },
    });

    const [errors, setErrors] = useState<FormErrors>({});

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        if (name.includes('address.')) {
            const key = name.split('.')[1];
            setFormData({
                ...formData,
                address: {
                    ...formData.address,
                    [key]: value,
                },
            });
        } else if (name.includes('healthInformation.')) {
            const key = name.split('.')[1];
            setFormData({
                ...formData,
                healthInformation: {
                    ...formData.healthInformation,
                    [key]: value,
                },
            });
        } else {
            setFormData({ ...formData, [name]: value });
        }
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

        if (!formData.address.subDistrict) newErrors.address = { subDistrict: 'Sub District is required' };
        if (!formData.address.district) newErrors.address = { ...newErrors.address, district: 'District is required' };
        if (!formData.address.province) newErrors.address = { ...newErrors.address, province: 'Province is required' };
        if (!formData.address.zipCode) newErrors.address = { ...newErrors.address, zipCode: 'Zip Code is required' };

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
            <header className="relative flex flex-wrap sm:justify-start sm:flex-nowrap w-full text-sm py-3" style={{ backgroundColor: '#EAF8EE' }}>
                <nav className="max-w-[85rem] w-full mx-auto px-4 sm:flex sm:items-center sm:justify-between">
                    <div className="flex items-center justify-between">
                        <a style={{ color: '#3EBE71' }} className="flex-none text-2xl font-bold" href="/" aria-label="Brand">
                            GoMed
                        </a>
                        <div className="sm:hidden">
                            <button type="button" className="hs-collapse-toggle">Menu</button>
                        </div>
                    </div>
                </nav>
            </header>

            <div className="flex justify-center items-center" style={{ height: '500px', backgroundColor: '#EAF8EE' }}>
                <div>
                    <h1 className="text-5xl font-bold text-[#3EBE71]">Create New Account</h1>
                    <div>
                        Already have an account? <Link href="/SignIn">Sign In</Link>
                    </div>
                </div>
            </div>

            <form onSubmit={handleSubmit}>
                <h2>Email and Password</h2>
                <input name="email" value={formData.email} onChange={handleChange} placeholder="Email" />
                <input name="confirmEmail" value={formData.confirmEmail} onChange={handleChange} placeholder="Confirm Email" />
                <input name="password" type="password" value={formData.password} onChange={handleChange} placeholder="Password" />
                <input name="confirmPassword" type="password" value={formData.confirmPassword} onChange={handleChange} placeholder="Confirm Password" />
                <h2>Personal Information</h2>
                <input name="firstName" value={formData.firstName} onChange={handleChange} placeholder="First Name" />
                <input name="lastName" value={formData.lastName} onChange={handleChange} placeholder="Last Name" />
                <input name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone Number" />
                <input name="address.subDistrict" value={formData.address.subDistrict} onChange={handleChange} placeholder="Sub District" />
                <input name="address.district" value={formData.address.district} onChange={handleChange} placeholder="District" />
                <input name="address.province" value={formData.address.province} onChange={handleChange} placeholder="Province" />
                <input name="address.zipCode" value={formData.address.zipCode} onChange={handleChange} placeholder="Zip Code" />
                <h2>Health Information</h2>
                <input name="healthInformation.chronicDisease" value={formData.healthInformation.chronicDisease} onChange={handleChange} placeholder="Chronic Disease" />
                <input name="healthInformation.medicationAllergy" value={formData.healthInformation.medicationAllergy} onChange={handleChange} placeholder="Medication Allergy" />
                <button type="submit">Register</button>
            </form>
        </div>
    );
}
