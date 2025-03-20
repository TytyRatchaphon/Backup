import React from 'react';

interface UserInfoProps {
    pharmacyStore: string;
    email: string;
    name: string;
    address: string;
    subDistrict: string;
    district: string;
    province: string;
    zipCode: string;
    certificateLink: string;
    onAccept: () => void;
    onDecline: () => void;
}

const UserInfoForm: React.FC<UserInfoProps> = ({
    pharmacyStore,
    email,
    name,
    address,
    subDistrict,
    district,
    province,
    zipCode,
    certificateLink,
    onAccept,
    onDecline
  }) => {
    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
          <div className="w-[500px] bg-white p-8 rounded-lg shadow-md">
            <a href='/admin/Home' className="absolute top-4 left-4 text-gray-500">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-x"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
            </a>
            <div className="space-y-4">
                <div className='w-full flex justify-center'>
                    <div className="w-[370px] h-[370px] border border-red object-cover">
                        <img src="" alt="" className="w-full h-full"/>
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div className="text-gray-600">Pharmacy Store</div>
                    <div className="text-end">{pharmacyStore}</div>

                    <div className="text-gray-600">Email</div>
                    <div className="text-end">{email}</div>
                    
                    <div className="text-gray-600">Name</div>
                    <div className="text-end">{name}</div>
                    
                    <div className="text-gray-600">Address</div>
                    <div className="text-end">{address}</div>
                    
                    <div className="text-gray-600">Sub-District</div>
                    <div className="text-end">{subDistrict}</div>
                    
                    <div className="text-gray-600">District</div>
                    <div className="text-end">{district}</div>
                    
                    <div className="text-gray-600">Province</div>
                    <div className="text-end">{province}</div>
                    
                    <div className="text-gray-600">Zip Code</div>
                    <div className="text-end">{zipCode}</div>
                </div>

                <div className="mt-4">
                    <a href={certificateLink} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                    Certificate in Pharmacy
                    </a>
                </div>

                <div className="flex space-x-4 mt-6">
                    <button onClick={onDecline} className="flex-1 bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition">
                    Decline
                    </button>
                    <button onClick={onAccept} className="flex-1 bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition">
                    Accept
                    </button>
                </div>
            </div>
          </div>
        </div>
      );
    };
    export default UserInfoForm;