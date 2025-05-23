"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type Pharmacy = {
    ID: number;
    Email: string;
    Password: string;
    FirstName: string;
    LastName: string;
    Phone: string;
    Certificate: string;
    StoreImg: string;
    AddressDescription: string;
    SubDistrict: string;
    District: string;
    Province: string;
    ZipCode: string;
    Contact: string;
    Status: string;
    Role: string;
    Medicines: Medicine[] | null;
};

type Medicine = {
    ID: number;
    Name: string;
    Price: number;
    Description: string;
    Quantity: number;
    ExpiredDate: string;
};



export default function Home() {
    const [pharmacies, setPharmacies] = useState<Pharmacy[]>([]);


    useEffect(() => {
        fetch("http://localhost:3001/api/pharmacies")
            .then((res) => res.json())
            .then((data) => {
                console.log("Fetched Pharmacies:", data);
                setPharmacies(data);
            })
            .catch((error) => console.error("Error fetching pharmacies:", error));
    }, []);

    return (
        <div className="">
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
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-message-circle-more"><path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" className="text-[#3EBE71]"/><path d="M8 12h.01" className="text-[#3EBE71]"/><path d="M12 12h.01" className="text-[#3EBE71]"/><path d="M16 12h.01" className="text-[#3EBE71]"/></svg>
                            </Link>
                            <Link href="/customer/Cart">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-shopping-cart"><circle cx="8" cy="21" r="1" className="text-[#3EBE71]"/><circle cx="19" cy="21" r="1" className="text-[#3EBE71]"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" className="text-[#3EBE71]"/></svg>
                            </Link>
                            <Link href="/customer/Profile">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-circle-user-round"><path d="M18 20a6 6 0 0 0-12 0" className="text-[#3EBE71]"/><circle cx="12" cy="10" r="4" className="text-[#3EBE71]"/><circle cx="12" cy="12" r="10" className="text-[#3EBE71]"/></svg>
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
                    <h1 className="text-3xl font-semibold mt-10 mb-10 text-[#3EBE71]">Pharmacy Near Me</h1>
                </div>
                <div className="max-w-full" style={{
                    display: 'grid',
                    gridTemplateColumns: 'auto auto auto auto',
                    gap: '5px',
                    justifyItems: 'center'
                }}>
                    {pharmacies.map((pharmacy) => (
                           <Link key={pharmacy.ID || Math.random()} href={`/customer/StoreDetail/${pharmacy.ID}`}>
                            <div className="w-[250px] h-[290px]">
                                <div className="h-[220px] border border-[#3EBE71] rounded-tr-2xl rounded-tl-2xl flex justify-center items-center">
                                <img
                                    src={"/store.png"}
                                    alt={`${pharmacy.FirstName}`}
                                    className="defaultImg"
                                />
                                </div>
                                <div className="h-[70px] bg-[#3EBE71] rounded-br-2xl rounded-bl-2xl flex flex-col items-center px-5 font-medium text-white">
                                    <p className="text-lg">
                                        {pharmacy.FirstName}
                                    </p>
                                    <p className="text-sm">
                                    </p>
                                </div>
                            </div>
                        </Link>
                    ))} 
                </div>
            </div>
            
        </div>
    );
}
