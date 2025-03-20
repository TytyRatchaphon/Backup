import Link from "next/link";

export default function StoreDetail() {
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

            <div className="relative">
                <div className="w-full bg-white border-b border-[#3EBE71] rounded-b-[100px]">
                    <div className="max-w-5xl mx-auto px-4 xl:px-0 py-12 lg:py-16 flex justify-center">
                        <div className="flex flex-col lg:flex-row justify-between items-center gap-8 lg:gap-10">
                            {/* Store Image */}
                            <div className="w-full lg:w-[300px] h-auto lg:h-[300px] border border-gray-500 rounded-3xl flex justify-center items-center">
                                <img src="/store.png" alt="Store" className="max-w-full h-auto mt-5 mb-5" />
                            </div>

                            {/* Store Details */}
                            <div className="flex-1 w-full lg:w-auto">
                            <div className="text-center lg:text-left">
                                <h1 className="text-[#3EBE71] font-bold text-2xl lg:text-3xl">Drug Store Name</h1>
                                <p className="text-gray-600">km.</p>
                            </div>

                            {/* Location Info */}
                            <div className="mt-4">
                                <div className="flex justify-center lg:justify-start items-center">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="text-[#3EBE71]"
                                >
                                    <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" />
                                    <circle cx="12" cy="10" r="3" />
                                </svg>
                                <div className="ml-4">
                                    <p className="text-[#3EBE71] text-xl font-semibold">Location</p>
                                </div>
                                </div>

                                <div className="flex justify-center lg:justify-start items-center mt-3">
                                    <svg width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"></svg>
                                    <div className="ml-4">
                                        <p className="text-[#8B8B8B] text-sm text-center lg:text-left">
                                        00, Lorem ipsum, dolor sit amet, consectetur adipiscing elit
                                        </p>
                                    </div>
                                </div>

                                {/* Search Form */}
                                <form className="w-full max-w-md mx-auto lg:mx-0 mt-5">
                                <label htmlFor="store-search" className="sr-only">
                                    Search
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                    <svg
                                        className="w-4 h-4 text-gray-500"
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 20 20"
                                    >
                                        <path
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                                        />
                                    </svg>
                                    </div>
                                    <input
                                    type="search"
                                    id="store-search"
                                    className="block w-full p-3 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-[#3EBE71] focus:border-[#3EBE71]"
                                    placeholder="Search this store"
                                    required
                                    />
                                    <button
                                    type="submit"
                                    className="text-white absolute end-2.5 bottom-2.5 bg-[#3EBE71] hover:bg-[#35a863] focus:ring-4 focus:outline-none focus:ring-[#3EBE71]/50 font-medium rounded-lg text-sm px-4 py-1 transition-colors"
                                    >
                                    Search
                                    </button>
                                </div>
                                </form>
                            </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="max-w-[85rem] w-full px-4 mx-auto">
                <div>
                    <nav className="-mb-0.5 flex justify-start gap-x-6">
                        <a className="py-4 px-1 inline-flex items-center gap-2 border-b-2 border-blue-500 text-xl font-medium whitespace-nowrap text-blue-600 hover:text-blue-600 focus:outline-none focus:text-blue-600" href="#">
                        All Products
                        </a>
                        <a className="py-4 px-1 inline-flex items-center gap-2 border-b-2 border-transparent text-xl whitespace-nowrap text-gray-500 hover:text-blue-600 focus:outline-none focus:text-blue-800" href="#" aria-current="page">
                        Category
                        </a>
                    </nav>
                </div>

                <div className="mt-5">
                    <div className="flex">
                        <h1 className="text-md font-medium">All Products</h1>
                        <p className="ml-3 text-[#C7C3C3]">(2 items)</p>
                    </div>

                    <div className="flex mt-5 justify-start gap-5">
                        <Link href="/customer/ProductDetail">
                            <div className="w-[240px] h-[300px] bg-white border rounded-2xl shadow-md grid justify-center items-center pt-2 pb-2">
                                <div className="w-[220px] h-[220px] border rounded-2xl flex justify-center items-center">
                                    <img src="/med2.png" alt="" className="defaultImg"/>
                                </div>
                                <div className="w-full h-[50px] mt-2 flex justify-between">
                                    <div>
                                        <p className="font-semibold">Product Name</p>
                                        <p>00.00฿</p>
                                    </div>
                                    <div className="flex justify-center items-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-circle-plus"><circle cx="12" cy="12" r="10" className="text-[#3EBE71]"/><path d="M8 12h8" className="text-[#3EBE71]"/><path d="M12 8v8" className="text-[#3EBE71]"/></svg>
                                    </div>
                                </div>
                            </div>
                        </Link>

                        <Link href="/customer/ProductDetail">
                            <div className="w-[240px] h-[300px] bg-white border rounded-2xl shadow-md grid justify-center items-center pt-2 pb-2">
                                <div className="w-[220px] h-[220px] border rounded-2xl flex justify-center items-center">
                                    <img src="/med2.png" alt="" className="defaultImg"/>
                                </div>
                                <div className="w-full h-[50px] mt-2 flex justify-between">
                                    <div>
                                        <p className="font-semibold">Product Name</p>
                                        <p>00.00฿</p>
                                    </div>
                                    <div className="flex justify-center items-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-circle-plus"><circle cx="12" cy="12" r="10" className="text-[#3EBE71]"/><path d="M8 12h8" className="text-[#3EBE71]"/><path d="M12 8v8" className="text-[#3EBE71]"/></svg>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </div>
                </div>

                <div className="mt-5">
                    <div className="flex">
                        <h1 className="text-md font-medium">Category</h1>
                        <p className="ml-3 text-[#C7C3C3]">(1 item)</p>
                    </div>

                    <div className="flex mt-5">
                        <Link href="/customer/ProductDetail">
                            <div className="w-[240px] h-[300px] bg-white border rounded-2xl shadow-md grid justify-center items-center pt-2 pb-2">
                                <div className="w-[220px] h-[220px] border rounded-2xl flex justify-center items-center">
                                    <img src="/med2.png" alt="" className="defaultImg"/>
                                </div>
                                <div className="w-full h-[50px] mt-2 flex justify-between">
                                    <div>
                                        <p className="font-semibold">Product Name</p>
                                        <p>00.00฿</p>
                                    </div>
                                    <button className="flex justify-center items-center z-1">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-circle-plus"><circle cx="12" cy="12" r="10" className="text-[#3EBE71]"/><path d="M8 12h8" className="text-[#3EBE71]"/><path d="M12 8v8" className="text-[#3EBE71]"/></svg>
                                    </button>
                                </div>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
            
            <footer className="bg-[#3EBE71] h-[100px] flex justify-center items-center mt-10">
                <span className="block text-sm text-white">© 2025 All Rights Reserved</span>
            </footer>
        </div>
    );
}