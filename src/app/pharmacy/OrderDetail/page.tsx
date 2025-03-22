"use client"

import Link from "next/link";
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

const OrderDetailsPage = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const orderId = searchParams.get('id');
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [orderData, setOrderData] = useState({
        orderNumber: '',
        status: 'Loading...',
        customer: {
            name: '',
            phone: ''
        },
        addresses: {
            store: '',
            delivery: ''
        },
        product: {
            name: '',
            price: 0,
            quantity: 1
        },
        deliveryFee: 0,
        total: 0
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

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

    // Fetch order details from backend
    useEffect(() => {
        if (!orderId) return;
        
        const fetchOrderDetails = async () => {
            try {
                setLoading(true);
                const response = await fetch(`/api/orders/${orderId}`);
                
                if (!response.ok) {
                    throw new Error('Failed to fetch order details');
                }
                
                const data = await response.json();
                setOrderData(data);
            } catch (err) {
                console.error('Error fetching order details:', err);
                setError('Could not load order details. Please try again later.');
            } finally {
                setLoading(false);
            }
        };
        
        fetchOrderDetails();
    }, [orderId]);

    // Update order status to Delivery
    const updateStatusToDelivery = async () => {
        try {
            setLoading(true);
            const response = await fetch(`/api/orders/${orderId}/update-status`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ status: 'Delivery' }),
            });
            
            if (!response.ok) {
                throw new Error('Failed to update order status');
            }
            
            const updatedOrder = await response.json();
            setOrderData(prev => ({ ...prev, status: 'Delivery' }));
            
            console.log("Status updated to delivery");
            alert("Status updated to delivery, product is on the way!");
        } catch (err) {
            console.error('Error updating status:', err);
            setError('Failed to update status. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    // Update order status to Complete
    const updateStatusToComplete = async () => {
        try {
            setLoading(true);
            const response = await fetch(`/api/orders/${orderId}/update-status`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ status: 'Complete' }),
            });
            
            if (!response.ok) {
                throw new Error('Failed to update order status');
            }
            
            const updatedOrder = await response.json();
            setOrderData(prev => ({ ...prev, status: 'Complete' }));
            
            console.log("Status updated to Complete");
            alert("Order completed successfully!");
        } catch (err) {
            console.error('Error updating status:', err);
            setError('Failed to update status. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return(
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
                <div className="max-w-xl mx-auto p-4 font-sans">
                    {error && (
                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4" role="alert">
                            <span className="block sm:inline">{error}</span>
                        </div>
                    )}

                    {loading ? (
                        <div className="flex justify-center items-center h-64">
                            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                        </div>
                    ) : (
                        <>
                            <div className="border border-black rounded-lg p-4 mb-4 flex justify-between items-center">
                                <span className="font-bold text-gray-800">Order No.</span>
                                <span className="text-gray-900">
                                    {orderData.orderNumber}
                                </span>
                            </div>

                            {/* Order Status */}
                            <div className="border border-black rounded-lg p-4 mb-4">
                                <div className="flex justify-between items-center">
                                    <span className="font-bold text-gray-800">Order Status</span>
                                    <span className="text-gray-900">
                                        {orderData.status}
                                    </span>
                                </div>
                            </div>

                            {/* Delivery Information */}
                            <div className="border border-black rounded-lg p-4 mb-4">
                                <h2 className="font-bold text-gray-800 text-lg mb-4">Delivery</h2>
                                <div className="mb-2">
                                    <div className="text-gray-700">
                                        {orderData.customer.name}
                                    </div>
                                    <div className="text-gray-900">
                                        {orderData.customer.phone}
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
                                        {orderData.addresses.store}
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
                                        {orderData.addresses.delivery}
                                    </div>
                                </div>
                            </div>

                            {/* Product Information */}
                            <div className="border border-black rounded-lg p-4 mb-4">
                                <h2 className="font-bold text-gray-800 text-lg mb-4">Product</h2>
                                
                                <div className="flex justify-between items-center mb-1">
                                    <span className="text-gray-800">
                                        {orderData.product.name}
                                    </span>
                                    <span className="text-gray-900 font-medium">
                                        ฿{orderData.product.price.toFixed(2)}
                                    </span>
                                </div>
                                <div className="flex justify-end text-gray-600 text-sm">
                                    x{orderData.product.quantity} = ฿{(orderData.product.price * orderData.product.quantity).toFixed(2)}
                                </div>
                            </div>

                            {/* Total */}
                            <div className="border border-black rounded-lg p-4">
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-gray-700">Product</span>
                                    <span className="text-gray-900">
                                        ฿{(orderData.product.price * orderData.product.quantity).toFixed(2)}
                                    </span>
                                </div>
                                
                                <div className="flex justify-between items-center mb-4">
                                    <span className="text-gray-700">Delivery fee</span>
                                    <span className="text-gray-900">
                                        ฿{orderData.deliveryFee.toFixed(2)}
                                    </span>
                                </div>
                                
                                <div className="flex justify-between items-center font-bold">
                                    <span className="text-gray-800 text-lg">Total</span>
                                    <span className="text-gray-900 text-lg">
                                        ฿{orderData.total.toFixed(2)}
                                    </span>
                                </div>
                            </div>

                            {orderData.status === "Pending" && (
                                <div className="mt-3 flex justify-end">
                                    <button 
                                        className="bg-blue-500 w-full hover:bg-blue-600 text-white px-4 py-2 rounded-md text-sm"
                                        onClick={updateStatusToDelivery}
                                        disabled={loading}
                                    >
                                        {loading ? 'กำลังอัปเดต...' : 'Update Status to Delivery'}
                                    </button>
                                </div>
                            )}

                            {orderData.status === "Delivery" && (
                                <div className="mt-3 flex justify-end">
                                    <button 
                                        className="bg-blue-500 w-full hover:bg-blue-600 text-white px-4 py-2 rounded-md text-sm"
                                        onClick={updateStatusToComplete}
                                        disabled={loading}
                                    >
                                        {loading ? 'กำลังอัปเดต...' : 'Update Status to Complete'}
                                    </button>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default OrderDetailsPage;