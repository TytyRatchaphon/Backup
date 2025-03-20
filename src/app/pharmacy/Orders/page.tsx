import Link from 'next/link';
import React from 'react';

interface OrderInfo {
  orderID: string;
  price: string;
  paid: string;
  address: string;
  status: string;
}

const OrderInfoForm: React.FC<OrderInfo> = ({
  orderID,
  price,
  paid,
  address,
  status
}) => {
  // Sample contacts data, you should replace this with actual data source
  const order: OrderInfo[] = [
    {
        orderID: '0000000001',
        price: '74',
        paid: 'Yes',
        address: '123 ถนนสุขุมวิท ซอย 22 แขวงคลองตัน เขตคลองเตย กรุงเทพมหานคร 10110',
        status: 'Pending'
    },
    {
        orderID: '0000000002',
        price: '105',
        paid: 'No',
        address: '789 ถนนเจริญนคร แขวงบางลำภูล่าง เขตคลองสาน กรุงเทพมหานคร 10600',
        status: 'Delivery'
    },
    {
        orderID: '0000000003',
        price: '150',
        paid: 'Yes',
        address: '456 ถนนพระราม 9 แขวงห้วยขวาง เขตห้วยขวาง กรุงเทพมหานคร 10310',
        status: 'Complete'
    }
  ];

  // Function to determine status styles
  const getStatusStyles = (status: string) => {
    const statusLower = status.toLowerCase();
    
    if (statusLower === 'pending') {
      return 'bg-yellow-100 text-yellow-800'; // พื้นเหลือง ตัวอักษรเหลืองเข้ม
    } else if (statusLower === 'delivery') {
      return 'bg-blue-100 text-blue-800'; // พื้นฟ้า ตัวอักษรน้ำเงิน
    } else if (statusLower === 'complete') {
      return 'bg-green-100 text-green-800'; // พื้นเขียว ตัวอักษรเขียวเข้ม
    }
    
    return ''; // default - ไม่มีสี
  };

  return (
    <div className="w-full">
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
            <div>
                <h1 className="font-bold text-4xl text-center">Orders</h1>
            </div>
            <div className='mt-2'>
                <table className="w-full border-collapse">
                    <thead>
                    <tr className="text-black bg-gray-200">
                        <th className="p-3 text-left">Order ID</th>
                        <th className="p-3 text-left">Price</th>
                        <th className="p-3 text-left">Paid</th>
                        <th className="p-3 text-left">Address</th>
                        <th className="p-3 text-left">Status</th>
                        <th className="p-3 text-left"></th>
                    </tr>
                    </thead>
                    <tbody>
                        {order.map((order, index) => (
                            <tr className='' key={order.orderID}>
                                <td className="p-3">{order.orderID}</td>
                                <td className="p-3">{order.price} ฿</td>
                                <td className={`p-3 ${order.paid === 'Yes' ? 'text-green-600' : 'text-red-600'}`}>
                                    {order.paid}
                                </td>
                                <td className="p-3">{order.address}</td>
                                <td className="p-3">
                                    <span className={`px-2 py-1 rounded-md font-medium ${getStatusStyles(order.status)}`}>
                                        {order.status}
                                    </span>
                                </td>
                                <td className="p-3 underline text-right text-blue-600">
                                    <Link href='/pharmacy/OrderDetail'>View</Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    </div>
  );
};

export default OrderInfoForm;