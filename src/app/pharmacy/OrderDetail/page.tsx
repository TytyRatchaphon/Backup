"use client"

import Link from "next/link";

import { useState } from 'react';

const OrderDetailsPage = () => {
    const [orderStatus, setOrderStatus] = useState("Delivery");
    
    const updateStatusToDelivery = () => {
        setOrderStatus("Delivery");
        
        console.log("Status updated to delivery");
        
        alert("Status updated to delivery, product is on the way!");
    };

    const updateStatusToComplete = () => {
        setOrderStatus("Complete");
        
        console.log("Status updated to Complete");
        
        alert("Status updated to delivery successfully!");
    };

    return(
        <div>
            <button data-drawer-target="default-sidebar" data-drawer-toggle="default-sidebar" aria-controls="default-sidebar" type="button" className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
            <span className="sr-only">Open sidebar</span>
            <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path clipRule="evenodd" fillRule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
            </svg>
            </button>

            <aside id="default-sidebar" className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0 border border-gray-300" aria-label="Sidebar">
                <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
                    <h1 className="font-semibold text-2xl">GoMed</h1>
                    <ul className="font-medium pt-5">
                        <Link href="/pharmacy/Products">
                            <li>
                                <div className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-shopping-basket"><path d="m15 11-1 9"/><path d="m19 11-4-7"/><path d="M2 11h20"/><path d="m3.5 11 1.6 7.4a2 2 0 0 0 2 1.6h9.8a2 2 0 0 0 2-1.6l1.7-7.4"/><path d="M4.5 15.5h15"/><path d="m5 11 4-7"/><path d="m9 11 1 9"/></svg>
                                    <span className="flex-1 ms-3 whitespace-nowrap">Products</span>
                                </div>
                            </li>
                        </Link>
                        <Link href="/pharmacy/Orders">
                            <li>
                                <div className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-list-ordered"><path d="M10 12h11"/><path d="M10 18h11"/><path d="M10 6h11"/><path d="M4 10h2"/><path d="M4 6h1v4"/><path d="M6 18H4c0-1 2-2 2-3s-1-1.5-2-1"/></svg>
                                    <span className="flex-1 ms-3 whitespace-nowrap">Orders</span>
                                </div>
                            </li>
                        </Link>
                        <Link href="/pharmacy/Chats">
                            <li>
                                <div className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-message-circle-more"><path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/><path d="M8 12h.01"/><path d="M12 12h.01"/><path d="M16 12h.01"/></svg>
                                    <span className="flex-1 ms-3 whitespace-nowrap">Chats</span>
                                </div>
                            </li>
                        </Link>
                    </ul>
                </div>
            </aside>

            <div className="p-4 sm:ml-64">
                <div className="max-w-xl mx-auto p-4 font-sans">

                    <div className="border border-black rounded-lg p-4 mb-4 flex justify-between items-center">
                        <span className="font-bold text-gray-800">Order No.</span>
                        <span className="text-gray-900">
                            {/* Order No. */}
                        </span>
                    </div>

                    {/* Order Status */}
                    <div className="border border-black rounded-lg p-4 mb-4">
                        <div className="flex justify-between items-center">
                            <span className="font-bold text-gray-800">Order Status</span>
                            <span className="text-gray-900">
                                {orderStatus}
                            </span>
                        </div>
                    </div>

                    {/* Delivery Information */}
                    <div className="border border-black rounded-lg p-4 mb-4">
                        <h2 className="font-bold text-gray-800 text-lg mb-4">Delivery</h2>
                        <div className="mb-2">
                            <div className="text-gray-700">
                                {/* customer name */}
                            </div>
                            <div className="text-gray-900">
                                {/* customer phone number */}
                            </div>
                        </div>
                        
                        <div className="flex mb-2">
                            <div className="text-red-500 mt-1 mr-2">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="12" cy="10" r="3" />
                                <path d="M12 21.7C17.3 17 20 13 20 10a8 8 0 1 0-16 0c0 3 2.7 7 8 11.7z" />
                                </svg>
                            </div>
                            <div className="text-gray-700">
                                {/* store address */}
                            </div>
                        </div>
                        
                        <div className="flex mb-2">
                            <div className="text-green-500 mt-1 mr-2">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="12" cy="10" r="3" />
                                <path d="M12 21.7C17.3 17 20 13 20 10a8 8 0 1 0-16 0c0 3 2.7 7 8 11.7z" />
                                </svg>
                            </div>
                            <div className="text-gray-700">
                                {/* delivery address */}
                            </div>
                        </div>
                    </div>

                    {/* Product Information */}
                    <div className="border border-black rounded-lg p-4 mb-4">
                        <h2 className="font-bold text-gray-800 text-lg mb-4">Product</h2>
                        
                        <div className="flex justify-between items-center mb-1">
                            <span className="text-gray-800">
                                {/* product name */}
                            </span>
                            <span className="text-gray-900 font-medium">
                                {/* product price */}
                            </span>
                        </div>
                        <div className="flex justify-end text-gray-600 text-sm">
                            {/* item total */}
                        </div>
                    </div>

                    {/* Total */}
                    <div className="border border-black rounded-lg p-4">
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-gray-700">Product</span>
                            <span className="text-gray-900">
                                {/* product price */}
                            </span>
                        </div>
                        
                        <div className="flex justify-between items-center mb-4">
                            <span className="text-gray-700">Delivery fee</span>
                            <span className="text-gray-900">
                                {/* delivery fee */}
                            </span>
                        </div>
                        
                        <div className="flex justify-between items-center font-bold">
                            <span className="text-gray-800 text-lg">Total</span>
                            <span className="text-gray-900 text-lg">
                                {/* total = product price + delivery fee */}
                            </span>
                        </div>
                    </div>

                    {orderStatus === "Pending" && (
                        <div className="mt-3 flex justify-end">
                            <button className="bg-blue-500 w-full hover:bg-blue-600 text-white px-4 py-2 rounded-md text-sm"
                                onClick={updateStatusToDelivery}>
                                Update Status to Delivery
                            </button>
                        </div>
                    )}

                    {orderStatus === "Delivery" && (
                        <div className="mt-3 flex justify-end">
                            <button className="bg-blue-500 w-full hover:bg-blue-600 text-white px-4 py-2 rounded-md text-sm"
                                onClick={updateStatusToComplete}>
                                Update Status to Complete
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default OrderDetailsPage;