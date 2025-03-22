"use client"
import Link from "next/link";
import { useState } from "react";

export default function ProductDetail() {
    const [quantity, setQuantity] = useState(1);

    const increaseQuantity = () => {
        setQuantity(prev => prev + 1);
    };

    const decreaseQuantity = () => {
        setQuantity(prev => prev > 1 ? prev - 1 : 1);
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

            <section className="py-8 bg-white md:py-16 antialiased">
                <div className="max-w-screen-xl px-4 mx-auto 2xl:px-0">
                    <div className="lg:grid lg:grid-cols-2 lg:gap-8 xl:gap-16">
                        <div className="shrink-0 max-w-md lg:max-w-lg mx-auto">

                        {/* img */}
                        <img className="w-full dark:hidden" src="" alt="" />
                        </div>

                        <div className="mt-6 sm:mt-8 lg:mt-0">

                            {/* Product Name */}
                            <h1 className="text-xl font-semibold text-gray-900 sm:text-2xl">Product Name</h1>

                            {/* Category */}
                            <p>Category</p>


                            <div className="mt-4 sm:items-center sm:gap-4 sm:flex">
                                {/* Price */}
                                <p className="text-2xl font-extrabold text-gray-900 sm:text-3xl">฿1,249.99</p>
                            </div>

                            <div className="mt-6 pb-5 flex flex-col items-start sm:mt-8">
                                {/* Quantity Selector */}
                                <div className="flex items-center mb-4">
                                    <span className="mr-3 text-sm font-medium text-gray-700">Choose quantity:</span>
                                    <div className="flex items-center border border-gray-300 rounded-md ml-5">
                                        <button 
                                            onClick={decreaseQuantity}
                                            className="px-3 py-1 text-gray-600 hover:bg-gray-100 rounded-l-md focus:outline-none"
                                        >
                                            -
                                        </button>
                                        <span className="px-4 py-1 text-center">{quantity}</span>
                                        <button 
                                            onClick={increaseQuantity}
                                            className="px-3 py-1 text-gray-600 hover:bg-gray-100 rounded-r-md focus:outline-none"
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>
                                
                                <button className="bg-[#3EBE71] border border-[#3EBE71] p-1 px-5 text-white rounded-md font-semibold hover:bg-white hover:border hover:border-[#3EBE71] hover:text-[#3EBE71]">Add to Cart</button>
                            </div>

                            <hr className="my-6 md:my-8 pt-5 border-gray-200 dark:border-gray-800" />


                            {/* description */}
                            <p className="mb-6 text-gray-500 dark:text-gray-400">
                                Studio quality three mic array for crystal clear calls and voice
                                recordings. Six-speaker sound system for a remarkably robust and
                                high-quality audio experience. Up to 256GB of ultrafast SSD storage.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}