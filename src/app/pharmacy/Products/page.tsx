import Link from "next/link";

export default function Products() {
    return (
        <div>
            <button data-drawer-target="default-sidebar" data-drawer-toggle="default-sidebar" aria-controls="default-sidebar" type="button" className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
            <span className="sr-only">Open sidebar</span>
            <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path clip-rule="evenodd" fill-rule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
            </svg>
            </button>

            <aside id="default-sidebar" className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0 border border-gray-300" aria-label="Sidebar">
            <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
                <h1 className="font-semibold text-2xl">GoMed</h1>
                <ul className="font-medium pt-5">
                    <Link href="/pharmacy/Products">
                        <li>
                            <div className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-shopping-basket"><path d="m15 11-1 9"/><path d="m19 11-4-7"/><path d="M2 11h20"/><path d="m3.5 11 1.6 7.4a2 2 0 0 0 2 1.6h9.8a2 2 0 0 0 2-1.6l1.7-7.4"/><path d="M4.5 15.5h15"/><path d="m5 11 4-7"/><path d="m9 11 1 9"/></svg>
                                <span className="flex-1 ms-3 whitespace-nowrap">Products</span>
                            </div>
                        </li>
                    </Link>
                    <Link href="/pharmacy/Orders">
                        <li>
                            <div className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-list-ordered"><path d="M10 12h11"/><path d="M10 18h11"/><path d="M10 6h11"/><path d="M4 10h2"/><path d="M4 6h1v4"/><path d="M6 18H4c0-1 2-2 2-3s-1-1.5-2-1"/></svg>
                                <span className="flex-1 ms-3 whitespace-nowrap">Orders</span>
                            </div>
                        </li>
                    </Link>
                    <Link href="/pharmacy/Chats">
                        <li>
                            <div className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-message-circle-more"><path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/><path d="M8 12h.01"/><path d="M12 12h.01"/><path d="M16 12h.01"/></svg>
                                <span className="flex-1 ms-3 whitespace-nowrap">Chats</span>
                            </div>
                        </li>
                    </Link>
                </ul>
            </div>
        </aside>

            <div className="p-4 sm:ml-64">
                <div className="">
                    <h1 className="font-bold text-4xl text-center">Products</h1>

                    <div>
                        <div className="flex justify-end">
                            <Link href="/pharmacy/AddProduct">
                                <div className="flex p-2 rounded-full border border-black hover:bg-black hover:text-white">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-plus"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
                                    <p className="font-medium pl-2">Add Product</p>
                                </div>
                            </Link>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-5">
                            <Link href="/pharmacy/ProductDetail">
                                <div className="w-[240px] h-[300px] bg-white border rounded-2xl shadow-md grid justify-center items-center pt-2 pb-2">
                                    <div className="w-[220px] h-[220px] border rounded-2xl flex justify-center items-center">
                                        <img src="/med2.png" alt="" className="defaultImg"/>
                                    </div>
                                    <div className="w-full h-[50px] mt-2 flex justify-between">
                                        <div>
                                            <p className="font-semibold">Product Name</p>
                                            <p>00.00฿</p>
                                        </div>
                                    </div>
                                </div>
                            </Link>

                            <Link href="/pharmacy/ProductDetail">
                                <div className="w-[240px] h-[300px] bg-white border rounded-2xl shadow-md grid justify-center items-center pt-2 pb-2">
                                    <div className="w-[220px] h-[220px] border rounded-2xl flex justify-center items-center">
                                        <img src="/med2.png" alt="" className="defaultImg"/>
                                    </div>
                                    <div className="w-full h-[50px] mt-2 flex justify-between">
                                        <div>
                                            <p className="font-semibold">Product Name</p>
                                            <p>00.00฿</p>
                                        </div>
                                    </div>
                                </div>
                            </Link>

                            <Link href="/pharmacy/ProductDetail">
                                <div className="w-[240px] h-[300px] bg-white border rounded-2xl shadow-md grid justify-center items-center pt-2 pb-2">
                                    <div className="w-[220px] h-[220px] border rounded-2xl flex justify-center items-center">
                                        <img src="/med2.png" alt="" className="defaultImg"/>
                                    </div>
                                    <div className="w-full h-[50px] mt-2 flex justify-between">
                                        <div>
                                            <p className="font-semibold">Product Name</p>
                                            <p>00.00฿</p>
                                        </div>
                                    </div>
                                </div>
                            </Link>

                            <Link href="/pharmacy/ProductDetail">
                                <div className="w-[240px] h-[300px] bg-white border rounded-2xl shadow-md grid justify-center items-center pt-2 pb-2">
                                    <div className="w-[220px] h-[220px] border rounded-2xl flex justify-center items-center">
                                        <img src="/med2.png" alt="" className="defaultImg"/>
                                    </div>
                                    <div className="w-full h-[50px] mt-2 flex justify-between">
                                        <div>
                                            <p className="font-semibold">Product Name</p>
                                            <p>00.00฿</p>
                                        </div>
                                    </div>
                                </div>
                            </Link>

                            <Link href="/pharmacy/ProductDetail">
                                <div className="w-[240px] h-[300px] bg-white border rounded-2xl shadow-md grid justify-center items-center pt-2 pb-2">
                                    <div className="w-[220px] h-[220px] border rounded-2xl flex justify-center items-center">
                                        <img src="/med2.png" alt="" className="defaultImg"/>
                                    </div>
                                    <div className="w-full h-[50px] mt-2 flex justify-between">
                                        <div>
                                            <p className="font-semibold">Product Name</p>
                                            <p>00.00฿</p>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}