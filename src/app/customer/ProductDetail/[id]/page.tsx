"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

type Medicine = {
    id: number;
    product_name: string;
    price: number;
    description: string;
    quantity: number;
    expired_date: string;
};

export default function ProductDetail() {
    const { id } = useParams(); // รับค่า id ของยา
    const router = useRouter();
    const [medicine, setMedicine] = useState<Medicine | null>(null);
    const [quantity, setQuantity] = useState(1);
    const [isAddingToCart, setIsAddingToCart] = useState(false);
    
    const [userId, setUserId] = useState<number>(() => {
        // ดึงข้อมูล user จาก localStorage
        const storedUser = localStorage.getItem("user");
        // ถ้ามีข้อมูล user ใน localStorage
        if (storedUser) {
          try {
            const user = JSON.parse(storedUser);
            console.log("User data from localStorage:", user);
            
            // ใช้ ID จากข้อมูล user
            // จากข้อมูลที่เห็น property ชื่อ "ID" (ตัวใหญ่) ไม่ใช่ "id" (ตัวเล็ก)
            const userId = user.ID || 1;
            console.log("Using user ID:", userId);
            return userId;
          } catch (error) {
            console.error("Failed to parse user data from localStorage:", error);
            return 1;
          }
        }
        console.log("No user data in localStorage, using default ID: 1");
        return 1;
      });

    // ดึงข้อมูล userId จาก localStorage
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const storedUserId = localStorage.getItem('userId');
            if (storedUserId) {
                setUserId(parseInt(storedUserId));
            }
        }
    }, []);

    useEffect(() => {
        console.log("Stored userId:", localStorage.getItem('userId'));
      }, []);
    
    useEffect(() => {
        if (!id) return;

        // Fetch Medicine by ID
        fetch(`http://localhost:3001/api/medicines/${id}`)
        .then((res) => res.json())
        .then((data) => setMedicine(data))
        .catch((error) => console.error("Error fetching medicine:", error));
    }, [id]);

    const increaseQuantity = () => {
        setQuantity(prev => prev + 1);
    };

    const decreaseQuantity = () => {
        setQuantity(prev => prev > 1 ? prev - 1 : 1);
    };

    const handleAddToCart = async () => {
        console.log("Sending userId:", userId);
        console.log("Add to Cart clicked");
        console.log("All localStorage keys:", Object.keys(localStorage));
        if (isAddingToCart) {
            console.log("Already adding to cart");
            return;
        }
        
        setIsAddingToCart(true);
        
        try {
            // ตรวจสอบว่ามี userId หรือไม่
            if (!userId) {
                alert("กรุณาเข้าสู่ระบบก่อนเพิ่มสินค้าลงตะกร้า");
                router.push('/SignIn');
                return;
            }
            
            const medicineId = Number(id);
            // สมมติว่า pharmacyId เป็น 1 หรือมาจากข้อมูลของยา
            const pharmacyId = 1; 
            
            const requestBody = {
                userId: userId,
                pharmacyId: pharmacyId,
                medicineId: medicineId,
                quantity: quantity
            };
            
            console.log("Sending request:", requestBody);
            
            const response = await fetch("http://localhost:3001/api/cart", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(requestBody),
            });
            
            // ตรวจสอบว่า response เป็น 2xx หรือไม่
            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Server responded with ${response.status}: ${errorText}`);
            }
            
            const data = await response.json();
            
            if (data.success) {
                alert("เพิ่มสินค้าลงตะกร้าเรียบร้อยแล้ว");
            } else {
                alert("ไม่สามารถเพิ่มสินค้าลงตะกร้าได้: " + data.message);
            }
        } catch (err) {
            console.error("Error adding to cart:", err);
            
            if (err instanceof Error) {
                alert("เกิดข้อผิดพลาดในการเพิ่มสินค้า: " + err.message);
            } else {
                alert("เกิดข้อผิดพลาดในการเพิ่มสินค้า");
            }
        } finally {
            setIsAddingToCart(false);
        }
    };

    if (!medicine) return <p className="text-center text-xl">Loading...</p>;
    
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
                        <img className="w-full dark:hidden" src="/med2.png" alt="" />
                        </div>

                        <div className="mt-6 sm:mt-8 lg:mt-0">

                            {/* Product Name */}
                            <h1 className="text-xl font-semibold text-gray-900 sm:text-2xl">{medicine.product_name}</h1>

                            {/* Category */}
                            <p>Category</p>


                            <div className="mt-4 sm:items-center sm:gap-4 sm:flex">
                                {/* Price */}
                                <p className="text-2xl font-extrabold text-gray-900 sm:text-3xl">{medicine.price}฿</p>
                            </div>

                            <div className="mt-6 pb-5 flex flex-col items-start sm:mt-8">
                                {/* Quantity Selector */}
                                <div className="flex items-center mb-4">
                                    <span className="mr-3 text-sm font-medium text-gray-700">จำนวน:</span>
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
                                
                                <button 
                                    type="button"
                                    onClick={() => handleAddToCart()}
                                    className="bg-[#3EBE71] border border-[#3EBE71] p-1 px-5 text-white rounded-md font-semibold hover:bg-white hover:border hover:border-[#3EBE71] hover:text-[#3EBE71]"
                                >
                                    Add to Cart
                                </button>
                            </div>

                            <hr className="my-6 md:my-8 pt-5 border-gray-200 dark:border-gray-800" />


                            {/* description */}
                            <p className="mb-6 text-gray-500 dark:text-gray-400">
                                {medicine.description}
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}