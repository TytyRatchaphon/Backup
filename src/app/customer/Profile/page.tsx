"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Profile() {
    const [fromData, setFormData] = useState({
        healthInformation: {
            chronicDisease: "",
            medicationAllergy: "",
        },
    });
    const router = useRouter();
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
                        <div className="flex gap-8">
                            <Link href="/customer/Message">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-message-circle-more"><path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" className="text-[#3EBE71]"/><path d="M8 12h.01" className="text-[#3EBE71]"/><path d="M12 12h.01" className="text-[#3EBE71]"/><path d="M16 12h.01" className="text-[#3EBE71]"/></svg>
                            </Link>
                            <Link href="/customer/Cart">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-shopping-cart"><circle cx="8" cy="21" r="1" className="text-[#3EBE71]"/><circle cx="19" cy="21" r="1" className="text-[#3EBE71]"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" className="text-[#3EBE71]"/></svg>
                            </Link>
                            <Link href="/customer/Profile">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-circle-user-round"><path d="M18 20a6 6 0 0 0-12 0" className="text-[#3EBE71]"/><circle cx="12" cy="10" r="4" className="text-[#3EBE71]"/><circle cx="12" cy="12" r="10" className="text-[#3EBE71]"/></svg>
                            </Link>
                            <Link href="/SignIn" className="text-[#3EBE71]">
                                Log Out
                            </Link>
                        </div>
                    </div>
                </nav>
            </header>

            <div className="max-w-[85rem] w-full px-4 mx-auto">
                <div className="flex justify-center items-center">
                    <h1 className="text-3xl font-semibold mt-10 mb-10 text-[#3EBE71]">My Profile</h1>
                </div>
                <div className="w-full px-4 md:px-6 lg:px-8 mt-5 mb-8">
                    <div className="flex flex-col lg:flex-row gap-4 lg:gap-8 lg:h-auto">
                        <div className="w-full lg:w-48 h-100 border rounded-lg flex items-center justify-center bg-gray-50 py-3">
                            <p className="font-medium text-center">
                                Health
                                <br />
                                Information
                            </p>
                        </div>
                        <div className="flex-1 border rounded-lg p-4 md:p-6 lg:p-8 h-full">
                            <div className="max-w-3xl mx-auto space-y-6">
                                <div className="grid md:grid-cols-2 gap-4 lg:gap-6">
                                    <div className="space-y-2">
                                        <label className="block text-sm font-medium">
                                            Chronic Disease
                                        </label>
                                        <div className="flex gap-2">
                                            <textarea id="message" rows="4" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 " placeholder="Fill your Chronic Disease"></textarea>

                                            {/* <input
                                                name="chronicDiseaseInput"
                                                value={formData.healthInformation.chronicDisease}
                                                onChange={handleHealthInputChange}
                                                placeholder="Enter your Chronic Disease"
                                                className="flex-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            />
                                            <button
                                                // type="button"
                                                // onClick={addChronicDisease}
                                                className="p-2 bg-green-100 text-green-600 rounded-lg hover:bg-green-200"
                                            >
                                                {" "}
                                                +
                                            </button> */}
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="block text-sm font-medium">
                                        Medication
                                        </label>
                                        <div className="flex gap-2">
                                            <textarea id="message" rows="4" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 " placeholder="Fill your Medication"></textarea>
                                            {/* <input
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
                                            </button> */}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex justify-center items-center">
                    <button className="bg-[#3EBE71] px-4 py-2 rounded-lg text-white">Save</button>
                </div>
            </div>
        </div>
    );
}