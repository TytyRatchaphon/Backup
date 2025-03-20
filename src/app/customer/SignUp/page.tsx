"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

interface FormErrors {
  email?: string;
  confirmEmail?: string;
  password?: string;
  confirmPassword?: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  address?: {
    addressDescription?: string;
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
    email: "",
    confirmEmail: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
    phone: "",
    address: {
      addressDescription: "",
      subDistrict: "",
      district: "",
      province: "",
      zipCode: "",
    },
    healthInformation: {
      chronicDisease: "",
      medicationAllergy: "",
    },
  });
  const router = useRouter();
  const [errors, setErrors] = useState<FormErrors>({});
  
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    if (name.includes("address.")) {
      const key = name.split(".")[1];
      setFormData({
        ...formData,
        address: {
          ...formData.address,
          [key]: value,
        },
      });
    } else if (name.includes("healthInformation.")) {
      const key = name.split(".")[1];
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
    setErrors({ ...errors, [name]: "" });
  };

  const addChronicDisease = () => {
    if (formData.healthInformation.chronicDisease.trim()) {
      setFormData((prev) => ({
        ...prev,
        healthInformation: {
          ...prev.healthInformation,
          chronicDiseases: [
            ...prev.healthInformation.chronicDisease,
            prev.healthInformation.chronicDisease.trim(),
          ],
          chronicDiseaseInput: "",
        },
      }));
    }
  };

  const addMedicationAllergy = () => {
    if (formData.healthInformation.medicationAllergy.trim()) {
      setFormData((prev) => ({
        ...prev,
        healthInformation: {
          ...prev.healthInformation,
          medicationAllergies: [
            ...prev.healthInformation.medicationAllergy,
            prev.healthInformation.medicationAllergy.trim(),
          ],
          medicationAllergyInput: "",
        },
      }));
    }
  };

  const handleHealthInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      healthInformation: {
        ...prev.healthInformation,
        [name]: value,
      },
    }));
  };

  // const removeChronicDisease = (index: number) => {
  //     setFormData(prev => ({
  //         ...prev,
  //         healthInformation: {
  //             ...prev.healthInformation,
  //             chronicDiseases: prev.healthInformation.chronicDisease.filter((_, i) => i !== index)
  //         }
  //     }));
  // };

  // const removeMedicationAllergy = (index: number) => {
  //     setFormData(prev => ({
  //         ...prev,
  //         healthInformation: {
  //             ...prev.healthInformation,
  //             medicationAllergies: prev.healthInformation.medicationAllergy.filter((_, i) => i !== index)
  //         }
  //     }));
  // };

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
      router.push("/SignIn");
    } else {
      alert(`Error: ${result.error}`);
    }
  };

  return (
    <div>
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
        <div className="gap-8 items-center py-8 px-4 mx-auto max-w-screen-xl xl:gap-16 md:grid md:grid-cols-2 sm:py-16 lg:px-6">
          <div className="mt-4 md:mt-0 text-center">
            <div className="text-7xl font-semibold">
              <h1 className="">Create Account</h1>
              <span>as a </span>
              <span className="text-[#3EBE71]">Customer</span>

              <p className="text-xl font-medium text-gray-400 mt-4">
                Already have an account?{" "}
                <span className="underline text-blue-600">
                  <a href="/SignIn">Sign In</a>
                </span>
              </p>
            </div>
          </div>
          <img className="w-auto h-auto mt-7" src="/signUpImg.png" alt="" />
        </div>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="w-full px-4 md:px-6 lg:px-8 mt-5">
          <div className="flex flex-col lg:flex-row gap-4 lg:gap-8 lg:h-60">
            {/* Topic Block */}
            <div className="w-full lg:w-48 h-full border rounded-lg flex items-center justify-center bg-gray-50">
              <p className="font-medium text-center">
                Email
                <br />
                and
                <br />
                Password
              </p>
            </div>

            {/* Input Block */}
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
          </div>
        </div>

        <div className="w-full px-4 md:px-6 lg:px-8 mt-5">
          <div className="flex flex-col lg:flex-row gap-4 lg:gap-8 lg:h-60">
            {/* Topic Block */}
            <div className="w-full lg:w-48 h-full border rounded-lg flex items-center justify-center bg-gray-50">
              <p className="font-medium text-center">
                Personal <br />
                Information
              </p>
            </div>

            {/* Input Block */}
            <div className="flex-1 border rounded-lg p-4 md:p-6 lg:p-8 h-full">
              <div className="max-w-3xl mx-auto space-y-6">
                <div className="grid md:grid-cols-2 gap-4 lg:gap-6">
                  <div className="space-y-2">
                    {/* First Name Fields */}
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
                    {/* Last Name Fields */}
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
                </div>

                {/* Phone Number Fields */}
                <div className="grid md:grid-cols-2 gap-4 lg:gap-6">
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
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full px-4 md:px-6 lg:px-8 mt-5 h-full">
          <div className="flex flex-col lg:flex-row gap-4 lg:gap-8 lg:h-auto">
            {/* Topic Block */}
            <div className="w-full lg:w-48 h-100 border rounded-lg flex items-center justify-center bg-gray-50 py-3">
              <p className="font-medium text-center">Address</p>
            </div>

            {/* Input Block */}
            <div className="flex-1 border rounded-lg p-4 md:p-6 lg:p-8 h-full">
              <div className="max-w-3xl mx-auto space-y-6">
                <div className="grid md:grid-cols-1 gap-4 lg:gap-6">
                  <div className="space-y-2">
                    {/* Address Fields */}
                    <label className="block text-sm font-medium">Address</label>
                    <input
                      name="address.address"
                      value={formData.address.addressDescription}
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
          </div>
        </div>

        <div className="w-full px-4 md:px-6 lg:px-8 mt-5 mb-8">
          <div className="flex flex-col lg:flex-row gap-4 lg:gap-8 lg:h-auto">
            {/* Topic Block */}
            <div className="w-full lg:w-48 h-100 border rounded-lg flex items-center justify-center bg-gray-50 py-3">
              <p className="font-medium text-center">
                Health
                <br />
                Information
              </p>
            </div>

            {/* Input Block */}
            <div className="flex-1 border rounded-lg p-4 md:p-6 lg:p-8 h-full">
              <div className="max-w-3xl mx-auto space-y-6">
                <div className="grid md:grid-cols-2 gap-4 lg:gap-6">
                  {/* Chronic Disease */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium">
                      Chronic Disease
                    </label>
                    <div className="flex gap-2">
                      <input
                        name="chronicDiseaseInput"
                        value={formData.healthInformation.chronicDisease}
                        onChange={handleHealthInputChange}
                        placeholder="Enter your Chronic Disease"
                        className="flex-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <button
                        type="button"
                        onClick={addChronicDisease}
                        className="p-2 bg-green-100 text-green-600 rounded-lg hover:bg-green-200"
                      >
                        {" "}
                        +
                      </button>
                    </div>
                    {errors.healthInformation?.chronicDisease && (
                      <p className="text-sm text-red-500">
                        {errors.healthInformation.chronicDisease}
                      </p>
                    )}
                    {/* {formData.healthInformation.chronicDisease.length === 0 ? (
                                    <div className="text-sm text-gray-500 mt-1 p-2 bg-gray-50 rounded-lg">
                                        You don't have any chronic disease
                                    </div>
                                ) : (
                                    <div className="mt-2 space-y-2">
                                        {formData.healthInformation.chronicDisease.map((disease, index) => (
                                            <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                                                <span>{disease}</span>
                                                <button
                                                    type="button"
                                                    onClick={() => removeChronicDisease(index)}
                                                    className="text-red-500 hover:text-red-700"
                                                >
                                                    ×
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                )} */}
                  </div>

                  {/* Medication Allergy */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium">
                      Medication Allergy
                    </label>
                    <div className="flex gap-2">
                      <input
                        name="medicationAllergyInput"
                        value={formData.healthInformation.medicationAllergy}
                        onChange={handleHealthInputChange}
                        placeholder="Enter your Medication Allergy"
                        className="flex-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <button
                        type="button"
                        onClick={addMedicationAllergy}
                        className="p-2 bg-green-100 text-green-600 rounded-lg hover:bg-green-200"
                      >
                        {" "}
                        +
                      </button>
                    </div>
                    {errors.healthInformation?.medicationAllergy && (
                      <p className="text-sm text-red-500">
                        {errors.healthInformation.medicationAllergy}
                      </p>
                    )}
                    {/* {formData.healthInformation.medicationAllergy.length === 0 ? (
                                    <div className="text-sm text-gray-500 mt-1 p-2 bg-gray-50 rounded-lg">
                                        You don't have any medication allergy
                                    </div>
                                ) : (
                                    <div className="mt-2 space-y-2">
                                        {formData.healthInformation.medicationAllergy.map((allergy, index) => (
                                            <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                                                <span>{allergy}</span>
                                                <button
                                                    type="button"
                                                    onClick={() => removeMedicationAllergy(index)}
                                                    className="text-red-500 hover:text-red-700"
                                                >
                                                    ×
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                )} */}
                  </div>
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
        </div>
      </form>
    </div>
  );
}
