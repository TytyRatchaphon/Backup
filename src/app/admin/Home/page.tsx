
"use client"

import Link from 'next/link';
import React, { useEffect, useState } from 'react';

interface UserInfoProps {
  id: string;
  pharmacyStore: string;
  address: string;
  name: string;
  email: string;
}

const UserInfoForm: React.FC = () => {
  const [users, setUsers] = useState<UserInfoProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Fetch users from backend
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/pharmacies/unapproved');
        
        if (!response.ok) {
          throw new Error('Failed to fetch pharmacies');
        }
        
        const data = await response.json();
        setUsers(data);
      } catch (err) {
        console.error('Error fetching users:', err);
        setError('Could not load users. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchUsers();
  }, []);

  // Handle user deletion
  const handleDeleteUser = async (userId: string) => {
    if (!confirm('Are you sure you want to delete this user?')) {
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(`/api/users/${userId}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) {
        throw new Error('Failed to delete user');
      }
      
      setUsers(users.filter(user => user.id !== userId));
      alert('User deleted successfully');
    } catch (err) {
      console.error('Error deleting user:', err);
      setError('Failed to delete user. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Filter users based on search term
  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.pharmacyStore.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="w-full">
      <header className="relative flex flex-wrap sm:justify-start sm:flex-nowrap w-full text-sm py-3 bg-black">
        <nav className="max-w-[85rem] w-full mx-auto px-4 sm:flex sm:items-center sm:justify-between">
          <div className="flex items-center justify-between w-full">
            <div>
              <a
                className="flex-none text-2xl text-white font-bold focus:outline-none focus:opacity-80"
                href="#"
              >
                GoMed
              </a>
            </div>
            <div className="flex gap-8 text-white">
              <Link href="/SignIn" className="hover:text-gray-300 transition-colors">
                Log Out
              </Link>
            </div>
          </div>
        </nav>
      </header>

      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center mb-6">
          <h1 className="text-2xl font-bold mb-4 md:mb-0">User Management</h1>
          
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
                placeholder="Search users..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4" role="alert">
            <span className="block sm:inline">{error}</span>
          </div>
        )}

        {loading && users.length === 0 ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : filteredUsers.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-gray-500 text-lg">No users found</p>
            {searchTerm && (
              <p className="text-gray-400 mt-2">Try adjusting your search</p>
            )}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="text-black bg-gray-200">
                  <th className="p-3 text-left">Pharmacy Store</th>
                  <th className="p-3 text-left">Address</th>
                  <th className="p-3 text-left">Name</th>
                  <th className="p-3 text-left">Email</th>
                  <th className="p-3 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user, index) => (
                  <tr
                    key={user.id}
                    className={`${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'} hover:bg-gray-200 transition-colors`}
                  >
                    <td className="p-3">{user.pharmacyStore}</td>
                    <td className="p-3 max-w-xs truncate" title={user.address}>{user.address}</td>
                    <td className="p-3">{user.name}</td>
                    <td className="p-3">{user.email}</td>
                    <td className="p-3 flex space-x-2">
                      <Link
                        href={`/admin/UserDetails?id=${user.id}`}
                        className='text-blue-500 underline hover:text-blue-700 transition-colors'
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDeleteUser(user.id)}
                        className='text-red-500 underline hover:text-red-700 transition-colors'
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserInfoForm;



// export default function Home() {
//     return (
//         <div>
//             <header
//                 className="relative flex flex-wrap sm:justify-start sm:flex-nowrap w-full text-sm py-3 bg-gray-100">
//                 <nav className="max-w-[85rem] w-full mx-auto px-4 sm:flex sm:items-center sm:justify-between ">
//                     <div className="flex items-center justify-between w-full">
//                         <div>
//                             <a
//                                 className="flex-none text-2xl font-bold focus:outline-none focus:opacity-80"
//                                 href="#"
//                                 aria-label="Brand"
//                             >
//                                 GoMed
//                             </a>
//                         </div>
//                         <div className="flex gap-8">
//                             <Link href="/SignIn">
//                                 Log Out
//                             </Link>
//                         </div>
//                     </div>
//                 </nav>
//             </header>

//             <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
//                 <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
//                     <caption className="p-5 text-lg font-semibold text-left rtl:text-right text-gray-900 bg-white dark:text-white dark:bg-gray-800">
//                         Our products
//                         <p className="mt-1 text-sm font-normal text-gray-500 dark:text-gray-400">Browse a list of Flowbite products designed to help you work and play, stay organized, get answers, keep in touch, grow your business, and more.</p>
//                     </caption>
//                     <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
//                         <tr>
//                             <th scope="col" className="px-6 py-3">
//                                 Address
//                             </th>
//                             <th scope="col" className="px-6 py-3">
//                                 Pharmacy Store
//                             </th>
//                             <th scope="col" className="px-6 py-3">
//                                 Name
//                             </th>
//                             <th scope="col" className="px-6 py-3">
//                                 Email
//                             </th>
//                             <th scope="col" className="px-6 py-3">
//                                 <span className="sr-only">Edit</span>
//                             </th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
//                             <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
//                                 456 Ocean Avenue, Miami, FL 33139, USA
//                             </th>
//                             <td className="px-6 py-4">
//                                 MediCare Hub
//                             </td>
//                             <td className="px-6 py-4">
//                                 Sirinda Kasetsart
//                             </td>
//                             <td className="px-6 py-4">
//                                 sirinda.k@gmail.com
//                             </td>
//                             <td className="px-6 py-4 text-right">
//                                 <Link href="/admin/UserDetails" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</Link>
//                             </td>
//                         </tr>
//                     </tbody>
//                 </table>
//             </div>


//         </div>
//     );
// }