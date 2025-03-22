"use client"

import Link from "next/link";
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function ProductDetail() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const productId = searchParams.get('id');
    const [product, setProduct] = useState({
        id: '',
        name: 'Loading...',
        price: 0,
        description: '',
        imageUrl: '',
        stock: 0
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [sidebarOpen, setSidebarOpen] = useState(true);

    // Toggle sidebar function
    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

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

    // Fetch product details from backend
    useEffect(() => {
        if (!productId) return;
        
        const fetchProductDetails = async () => {
            try {
                setLoading(true);
                const response = await fetch(`/api/products/${productId}`);
                
                if (!response.ok) {
                    throw new Error('Failed to fetch product details');
                }
                
                const data = await response.json();
                setProduct(data);
            } catch (err) {
                console.error('Error fetching product details:', err);
                setError('Could not load product details. Please try again later.');
            } finally {
                setLoading(false);
            }
        };
        
        fetchProductDetails();
    }, [productId]);

    const handleDelete = async () => {
        if (!confirm('Are you sure you want to delete this product?')) {
            return;
        }

        try {
            setLoading(true);
            const response = await fetch(`/api/products/${productId}`, {
                method: 'DELETE',
            });
            
            if (!response.ok) {
                throw new Error('Failed to delete product');
            }
            
            alert('Product deleted successfully');
            router.push('/pharmacy/Products');
        } catch (err) {
            console.error('Error deleting product:', err);
            setError('Failed to delete product. Please try again.');
        } finally {
            setLoading(false);
        }
    };

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
                    <h1 className="font-bold text-4xl text-center">Product Detail</h1>
                </div>

                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 mt-4" role="alert">
                        <span className="block sm:inline">{error}</span>
                    </div>
                )}

                {loading ? (
                    <div className="flex justify-center items-center h-64">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                    </div>
                ) : (
                    <section className="py-8 bg-white md:py-16 antialiased">
                        <div className="max-w-screen-xl px-4 mx-auto 2xl:px-0">
                            <div className="lg:grid lg:grid-cols-2 lg:gap-8 xl:gap-16">
                                <div className="">
                                    {product.imageUrl ? (
                                        <img 
                                            className="block object-cover w-full rounded-lg h-96" 
                                            src={product.imageUrl} 
                                            alt={product.name} 
                                        />
                                    ) : (
                                        <div className="flex items-center justify-center w-full h-96 bg-gray-300 rounded-lg">
                                            <svg className="w-10 h-10 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                                            </svg>
                                        </div>
                                    )}
                                </div>

                                <div className="mt-6 sm:mt-8 lg:mt-0">
                                    <h1 className="text-xl font-semibold text-gray-900 sm:text-2xl">
                                        {product.name}
                                    </h1>
                                    <div className="mt-4 sm:items-center sm:gap-4 sm:flex">
                                        <p className="text-2xl font-extrabold text-gray-900 sm:text-3xl">
                                            ฿{product.price.toFixed(2)}
                                        </p>
                                    </div>

                                    <div className="mt-4">
                                        <p className="text-gray-700">
                                            <span className="font-medium">Stock:</span> {product.stock} units
                                        </p>
                                    </div>

                                    <div className="mt-6 sm:gap-4 sm:items-center sm:flex sm:mt-8">
                                        <Link 
                                            href={`/pharmacy/EditProduct?id=${productId}`} 
                                            title="Edit product" 
                                            className="flex items-center justify-center py-2.5 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-100 mr-2"
                                        >
                                            Edit
                                        </Link>
                                        <button 
                                            onClick={handleDelete}
                                            disabled={loading}
                                            className="flex items-center justify-center py-2.5 px-5 text-sm font-medium text-white focus:outline-none bg-red-500 rounded-lg border border-red-600 hover:bg-red-600 focus:z-10 focus:ring-4 focus:ring-red-100"
                                        >
                                            Delete
                                        </button>
                                    </div>

                                    <hr className="my-4 md:my-8 border-gray-200" />

                                    <p className="mb-6 text-gray-500">
                                        {product.description || 'No description available.'}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </section>
                )}
            </div>
        </div>
    );
}