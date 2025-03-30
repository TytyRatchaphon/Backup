"use client"

import Link from "next/link";
import { useEffect, useState } from 'react';

type Medicine = {
    id: number;
    product_name: string;
    price: number;
    description: string;
    quantity: number;
    expired_date: string;
    fda: string;
    image: string;
    stock: number;  
};

export default function Products() {
    const [medicines, setMedicines] = useState<Medicine[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [sidebarOpen, setSidebarOpen] = useState(true);

    // Toggle sidebar function
    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };
    
    useEffect(() => {
        const fetchMedicines = async () => {
          const pharmacyId = localStorage.getItem("pharmacy_id");
          if (!pharmacyId) {
            setError("Pharmacy ID not found. Please login again.");
            setLoading(false);
            return;
          }
      
          try {
            const response = await fetch(
              `http://localhost:3001/api/pharmacies/${pharmacyId}/medicines`
            );
            if (!response.ok) {
              throw new Error("Failed to fetch medicines");
            }
      
            const data = await response.json();
            console.log("Fetched medicines:", data); // ✅ Log ตรงนี้
            setMedicines(data);
          } catch (err) {
            console.error("Fetch error:", err);
            setError("Error loading medicines.");
          } finally {
            setLoading(false);
          }
        };
      
        fetchMedicines();
      }, []);

    // Handle window resize to show sidebar by default on larger screens
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 640) { // sm breakpoint in Tailwind
                setSidebarOpen(true);
            }
        };

        // Set initial state
        handleResize();

        // Add event listener
        window.addEventListener('resize', handleResize);

        // Clean up
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    // Fetch products from backend
    
    // Filter products based on search term
    const filteredMedicines = medicines.filter(medicines =>
        medicines.product_name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div>
            <button 
                onClick={toggleSidebar}
                type="button" 
                className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            >
                <span className="sr-only">Toggle sidebar</span>
                <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path clipRule="evenodd" fillRule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
                </svg>
            </button>

            <aside 
                id="default-sidebar" 
                className={`fixed top-0 left-0 z-40 w-64 h-screen transition-transform ${
                    sidebarOpen ? 'translate-x-0' : '-translate-x-full'
                } sm:translate-x-0 border border-gray-300`} 
                aria-label="Sidebar"
            >
                <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
                    <div className="flex items-center justify-between">
                        <h1 className="font-semibold text-2xl">GoMed</h1>
                        <button 
                            onClick={toggleSidebar}
                            className="p-2 text-gray-500 rounded-lg sm:hidden hover:bg-gray-100"
                        >
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path>
                            </svg>
                        </button>
                    </div>
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

            <div className={`p-4 ${sidebarOpen ? 'sm:ml-64' : ''} transition-all duration-300`}>
                <div>
                    <h1 className="font-bold text-4xl text-center mb-3">Products</h1>
                </div>
                
                <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-4">
                        {/* Search box */}
                        <div className="w-full md:w-1/3">
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                    <svg className="w-4 h-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                                    </svg>
                                </div>
                                <input
                                    type="search"
                                    className="block w-full p-2 pl-10 text-sm border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="Search products..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                        </div>
                        
                        {/* Add product button */}
                        <Link href="/pharmacy/AddProduct">
                            <button type="button" className="inline-flex items-center rounded-lg bg-gray-800 px-5 py-2.5 text-sm font-medium text-white border border-gray-800 hover:bg-white hover:border hover:border-black hover:text-black focus:outline-none focus:ring-4 focus:ring-blue-300">
                                <svg xmlns="http://www.w3.org/2000/svg" className="mr-2 h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <line x1="12" y1="5" x2="12" y2="19"></line>
                                    <line x1="5" y1="12" x2="19" y2="12"></line>
                                </svg>
                                Add Product
                            </button>
                        </Link>
                    </div>

                    {error && (
                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4" role="alert">
                            <span className="block sm:inline">{error}</span>
                        </div>
                    )}

                    {loading ? (
                        <div className="flex justify-center items-center h-64">
                            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                        </div>
                    ) : filteredMedicines.length === 0 ? (
                        <div className="text-center py-10">
                            <p className="text-gray-500 text-lg">No products found</p>
                            {searchTerm && (
                                <p className="text-gray-400 mt-2">Try adjusting your search or add a new product</p>
                            )}
                        </div>
                    ) : (
                        <div className="mb-4 grid gap-4 sm:grid-cols-2 md:mb-8 lg:grid-cols-3 xl:grid-cols-4">
                            {filteredMedicines.map((medicines) => (
                                <div key={medicines.id} className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                                    <div className="h-56 w-full border flex items-center justify-center">
                                        {medicines.image ? (
                                            <img
                                                className="block w-full h-full object-contain"
                                                src={"/med2.png"}
                                                alt={medicines.product_name}
                                            />
                                        ) : (
                                            <div className="flex items-center justify-center w-full h-full bg-gray-200">
                                                <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                                                </svg>
                                            </div>
                                        )}
                                    </div>
                                    <div className="pt-6 flex flex-col h-40">
                                        <div className="mb-4 flex items-center justify-between gap-4">
                                            <Link href={`/pharmacy/ProductDetails/${medicines.id}`} className="text-lg font-semibold leading-tight text-gray-900 hover:underline dark:text-white">
                                                {medicines.product_name}
                                            </Link>
                                        </div>
                                        <div className="mt-2">
                                            <p className="text-sm text-gray-500">Stock: {medicines.stock || 0}</p>
                                        </div>
                                        <div className="mt-auto flex items-center justify-between w-full">
                                            <p className="text-2xl font-extrabold leading-tight text-gray-900">
                                                ฿{medicines.price.toFixed(2)}
                                            </p>
                                            <Link href={`/pharmacy/ProductDetails/${medicines.id}`}>
                                                <button type="button" className="inline-flex rounded-lg bg-gray-700 px-5 py-2 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300">
                                                    View
                                                </button>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}