
import Link from 'next/link';
import React from 'react';

interface UserInfoProps {
  pharmacyStore: string;
  address: string;
  name: string;
  email: string;
}

const UserInfoForm: React.FC<UserInfoProps> = ({
  pharmacyStore,
  address,
  name,
  email
}) => {
  // Sample contacts data, you should replace this with actual data source
  const contacts: UserInfoProps[] = [
    {
      pharmacyStore: 'Green Pharmacy',
      name: 'John Doe',
      email: 'john.doe@example.com',
      address: '123 Main St, Anytown, USA'
    },
    {
      pharmacyStore: 'Health Hub',
      name: 'Jane Smith',
      email: 'jane.smith@example.com',
      address: '456 Oak Ave, Another City, USA'
    }
  ];

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
      
      <table className="w-full border-collapse">
        <thead>
          <tr className="text-black bg-gray-200">
            <th className="p-3 text-left">Pharmacy Store</th>
            <th className="p-3 text-left">Address</th>
            <th className="p-3 text-left">Name</th>
            <th className="p-3 text-left">Email</th>
            <th className="p-3 text-left"></th>
          </tr>
        </thead>
        <tbody>
          {contacts.map((contact, index) => (
            <tr
              key={contact.email}
              className={`${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'} hover:bg-gray-200 transition-colors`}
            >
              <td className="p-3">{contact.pharmacyStore}</td>
              <td className="p-3">{contact.address}</td>
              <td className="p-3">{contact.name}</td>
              <td className="p-3">{contact.email}</td>
              <td className="p-3">
                <Link 
                  href="/admin/UserDetails" 
                  className='text-blue-500 underline hover:text-blue-700 transition-colors'
                >
                  Edit
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
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