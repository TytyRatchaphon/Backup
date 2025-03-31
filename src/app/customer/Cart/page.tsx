"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

interface Medicine {
    id: number;
    product_name: string;
    price: number;
    description: string;
    quantity: number;
    expired_date: string;
  }
  
  interface CartItem {
    CartItemID: number;
    CartID: number;
    MedicineID: number;
    Quantity: number;
    Medicine: Medicine;
  }
  
  interface Cart {
    CartID: number;
    UserID: number;
    PharmacyID: number;
    Status: string;
    CartItems: CartItem[];
  }
  
  interface CartResponse {
    success: boolean;
    message: string;
    cart: Cart | null;
  }

export default function Cart() {
    const [cart, setCart] = useState<Cart | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  // ทำให้แน่ใจว่าคุณดึงค่า userId จาก localStorage อย่างถูกต้อง
const [userId, setUserId] = useState<number>(() => {
  try {
    const storedUser = localStorage.getItem("user");
    console.log("Raw user data from localStorage:", storedUser);
    
    if (storedUser) {
      const user = JSON.parse(storedUser);
      console.log("Parsed user object:", user);
      
      // ตรวจสอบว่า property ชื่ออะไร - ID หรือ id
      const id = user.ID || user.id;
      console.log("Extracted user ID:", id);
      
      if (id && typeof id === 'number') {
        return id;
      }
    }
    
    // ดึงค่า user_id ที่อาจถูกบันทึกแยกต่างหาก
    const storedUserId = localStorage.getItem("user_id");
    if (storedUserId) {
      console.log("Found user_id in localStorage:", storedUserId);
      return parseInt(storedUserId, 10);
    }
  } catch (error) {
    console.error("Error parsing user data:", error);
  }
  
  console.log("Falling back to default userId: 1");
  return 1;
});

  // คำนวณราคารวมของรายการที่เลือก
  const calculateTotal = () => {
    if (!cart) return { totalPrice: 0, totalItems: 0 };
    
    let totalPrice = 0;
    let totalItems = 0;
    
    cart.CartItems.forEach(item => {
      if (selectedItems.includes(item.CartItemID)) {
        totalPrice += item.Medicine.price * item.Quantity;
        totalItems += item.Quantity;
      }
    });
    
    return { totalPrice, totalItems };
  };

  // โหลดข้อมูลตะกร้า
  useEffect(() => {
    const fetchCart = async () => {
      try {
        setLoading(true);
        
        // ใส่ console.log เพื่อตรวจสอบ userId ที่ใช้
        console.log("Fetching cart for userId:", userId);
        
        const response = await fetch(`http://localhost:3001/api/cart/${userId}`);
        console.log("Cart API response status:", response.status);
        
        if (!response.ok) {
          throw new Error(`Server responded with ${response.status}`);
        }
        
        const data = await response.json();
        console.log("Full cart API response:", data);
        
        // ตรวจสอบโครงสร้างข้อมูลที่ได้รับ
        if (data.success && data.cart) {
          console.log("Cart data found:", data.cart);
          setCart(data.cart);
          
          // ตรวจสอบ CartItems
          if (data.cart.CartItems && Array.isArray(data.cart.CartItems)) {
            console.log("CartItems found:", data.cart.CartItems);
            setSelectedItems(data.cart.CartItems.map((item: { CartItemID: any; }) => item.CartItemID));
          } else {
            console.log("No CartItems found or not in expected format");
            setSelectedItems([]);
          }
        } else {
          console.log("Setting cart to null, API response format not as expected:", data);
          setCart(null);
        }
      } catch (err) {
        console.error("Error fetching cart:", err);
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("เกิดข้อผิดพลาดในการโหลดข้อมูลตะกร้า");
        }
      } finally {
        setLoading(false);
      }
    };
  
    if (userId) {
      fetchCart();
    } else {
      console.log("No userId available, skipping cart fetch");
    }
  }, [userId]);

  // อัปเดตจำนวนสินค้าในตะกร้า
  const updateCartItem = async (cartItemId: number, quantity: number) => {
    try {
      const response = await fetch("http://localhost:3001/api/cart/item", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          cartItemId: cartItemId,
          quantity: quantity
        }),
      });
      
      if (!response.ok) {
        throw new Error(`Server responded with ${response.status}`);
      }
      
      const data = await response.json();
      
      if (data.success) {
        // รีโหลดข้อมูลตะกร้า
        const cartResponse = await fetch(`http://localhost:3001/api/cart/${userId}`);
        const cartData: CartResponse = await cartResponse.json();
        
        if (cartData.success && cartData.cart) {
          setCart(cartData.cart);
        }
      } else {
        alert("ไม่สามารถอัปเดตจำนวนสินค้าได้: " + data.message);
      }
    } catch (err) {
      if (err instanceof Error) {
        alert("เกิดข้อผิดพลาด: " + err.message);
      } else {
        alert("เกิดข้อผิดพลาดในการอัปเดตจำนวนสินค้า");
      }
    }
  };

  // ลบสินค้าออกจากตะกร้า
  const removeCartItem = async (cartItemId: number) => {
    if (confirm("คุณต้องการลบสินค้านี้ออกจากตะกร้าหรือไม่?")) {
      try {
        const response = await fetch(`http://localhost:3001/api/cart/item/${cartItemId}`, {
          method: "DELETE",
        });
        
        if (!response.ok) {
          throw new Error(`Server responded with ${response.status}`);
        }
        
        const data = await response.json();
        
        if (data.success) {
          // รีโหลดข้อมูลตะกร้า
          const cartResponse = await fetch(`http://localhost:3001/api/cart/${userId}`);
          const cartData: CartResponse = await cartResponse.json();
          
          if (cartData.success && cartData.cart) {
            setCart(cartData.cart);
            // อัปเดตรายการที่เลือก
            setSelectedItems(prev => prev.filter(id => id !== cartItemId));
          } else {
            setCart(null);
          }
        } else {
          alert("ไม่สามารถลบสินค้าได้: " + data.message);
        }
      } catch (err) {
        if (err instanceof Error) {
          alert("เกิดข้อผิดพลาด: " + err.message);
        } else {
          alert("เกิดข้อผิดพลาดในการลบสินค้า");
        }
      }
    }
  };

  // จัดการการเลือกสินค้า
  const handleItemSelection = (cartItemId: number) => {
    setSelectedItems(prev => {
      if (prev.includes(cartItemId)) {
        return prev.filter(id => id !== cartItemId);
      } else {
        return [...prev, cartItemId];
      }
    });
  };

  const { totalPrice, totalItems } = calculateTotal();
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

            <section>
            <h1 className="text-4xl font-extrabold text-[#160058] text-center pt-10">My Shopping Cart</h1>
        
        {loading ? (
          <div className="text-center mt-10">กำลังโหลดข้อมูล...</div>
        ) : error ? (
          <div className="text-center mt-10 text-red-500">{error}</div>
        ) : !cart || !cart.CartItems || cart.CartItems.length === 0 ? (
          <div className="text-center mt-10">
            <p>ไม่มีสินค้าในตะกร้า</p>
            <Link href="/customer/Stores">
              <button className="bg-[#3EBE71] px-4 py-2 text-white font-bold rounded-xl mt-4">
                เลือกซื้อสินค้าเพิ่มเติม
              </button>
            </Link>
          </div>
        ) : (
          <div>
            <div className="flex justify-center mt-10">
              <div className="w-[600px] h-auto">
                <p className="font-bold text-[#3EBE71]">(ร้านขายยา)</p>
                
                {cart.CartItems.map((item) => (
                  <div key={item.CartItemID} className="mt-3">
                    <div className="flex items-center">
                      <input 
                        id={`item-${item.CartItemID}`} 
                        type="checkbox" 
                        checked={selectedItems.includes(item.CartItemID)}
                        onChange={() => handleItemSelection(item.CartItemID)}
                        className="w-4 h-4 text-[#3EBE71] bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500"
                      />
                      <div className="w-24 h-20 border border-[#3EBE71] bg-[#EAF8EE] rounded-lg ml-10 flex justify-center items-center">
                        <img src="/med2.png" alt={item.Medicine.product_name} className="max-w-full max-h-full" />
                      </div>
                      <div className="flex justify-between w-full ml-5">
                        <div>
                          <p className="font-medium">{item.Medicine.product_name}</p>
                          <div className="flex gap-2">
                            <button 
                              onClick={() => updateCartItem(item.CartItemID, Math.max(1, item.Quantity - 1))}
                              className="text-[#3EBE71]"
                            >
                              -
                            </button>
                            <span>{item.Quantity}</span>
                            <button 
                              onClick={() => updateCartItem(item.CartItemID, item.Quantity + 1)}
                              className="text-[#3EBE71]"
                            >
                              +
                            </button>
                            <button 
                              onClick={() => removeCartItem(item.CartItemID)}
                              className="ml-2 text-red-500"
                            >
                              remove
                            </button>
                          </div>
                        </div>
                        <div className="text-right">
                          <p>฿{item.Medicine.price.toFixed(2)}</p>
                          <p>x {item.Quantity}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                
                <hr className="mt-5 border-t" />
                <div className="flex justify-center">
                  <div className="w-[400px]">
                    <div className="flex justify-between w-full mt-2">
                      <h1 className="font-bold">Total</h1>
                      <h1>฿{totalPrice.toFixed(2)}</h1>
                    </div>
                    <h1 className="text-right">x {totalItems}</h1>
                    <Link href={selectedItems.length > 0 ? '/customer/CheckOut' : '#'}>
                      <button 
                        className={`w-full mt-2 py-2 text-white font-bold rounded-xl ${
                          selectedItems.length > 0 ? 'bg-[#3EBE71]' : 'bg-gray-400 cursor-not-allowed'
                        }`}
                        disabled={selectedItems.length === 0}
                        onClick={(e) => {
                          if (selectedItems.length === 0) {
                            e.preventDefault();
                            alert("กรุณาเลือกสินค้าอย่างน้อย 1 รายการ");
                          }
                        }}
                      >
                        Check Out
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
            </section>
        </div>
    );
}