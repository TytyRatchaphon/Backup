"use client"
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';

interface UserDetailsProps {
  id: string;
  pharmacyStore: string;
  email: string;
  name: string;
  address: string;
  subDistrict: string;
  district: string;
  province: string;
  zipCode: string;
  certificateLink: string;
  storeImage: string; // Added store image field
}

// API endpoint configuration
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000/api';

// API service functions
const apiService = {
  // Function to get user details by ID
  getUserDetails: async (userId: string): Promise<UserDetailsProps> => {
    const response = await fetch(`${API_BASE_URL}/users/${userId}`);
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    
    return await response.json();
  },
  
  // Function to accept user registration
  acceptRegistration: async (userId: string): Promise<void> => {
    const response = await fetch(`${API_BASE_URL}/users/${userId}/accept`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    
    return await response.json();
  },
  
  // Function to decline user registration
  declineRegistration: async (userId: string): Promise<void> => {
    const response = await fetch(`${API_BASE_URL}/users/${userId}/decline`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    
    return await response.json();
  },
};

const UserDetailsPage: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const userId = searchParams.get('id');
  const [userDetails, setUserDetails] = useState<UserDetailsProps | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [processing, setProcessing] = useState(false);
  const [activeTab, setActiveTab] = useState<'store' | 'certificate'>('store');

  // Fetch user details from backend API
  useEffect(() => {
    const fetchUserDetails = async () => {
      if (!userId) {
        setError("User ID is missing");
        setLoading(false);
        return;
      }
      try {
        setLoading(true);
        
        // Get user details from API
        const data = await apiService.getUserDetails(userId);
        setUserDetails(data);
      } catch (err) {
        console.error('Error fetching user details:', err);
        setError('Could not load user details. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchUserDetails();
  }, [userId]);

  // Handle accept registration
  const handleAccept = async () => {
    if (!userId || !userDetails) return;
    
    try {
      setProcessing(true);
      await apiService.acceptRegistration(userId);
      alert('User registration has been accepted successfully');
      router.push('/admin/Home');
    } catch (err) {
      console.error('Error accepting registration:', err);
      setError('Failed to accept registration. Please try again.');
    } finally {
      setProcessing(false);
    }
  };

  // Handle decline registration
  const handleDecline = async () => {
    if (!userId || !userDetails) return;
    
    if (!confirm('Are you sure you want to decline this registration?')) {
      return;
    }
    
    try {
      setProcessing(true);
      await apiService.declineRegistration(userId);
      alert('User registration has been declined');
      router.push('/admin/Home');
    } catch (err) {
      console.error('Error declining registration:', err);
      setError('Failed to decline registration. Please try again.');
    } finally {
      setProcessing(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="w-[500px] bg-white p-8 rounded-lg shadow-md">
          <div className="text-red-500 text-center">{error}</div>
          <div className="mt-4 text-center">
            <Link href="/admin/Home" className="text-blue-500 hover:underline">
              Go back to Dashboard
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (!userDetails) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="w-[500px] bg-white p-8 rounded-lg shadow-md">
          <div className="text-center">User not found</div>
          <div className="mt-4 text-center">
            <Link href="/admin/Home" className="text-blue-500 hover:underline">
              Go back to Dashboard
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-[500px] bg-white p-8 rounded-lg shadow-md relative">
        <Link href='/admin/Home' className="absolute top-4 left-4 text-gray-500">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-x">
            <path d="M18 6 6 18"/>
            <path d="m6 6 12 12"/>
          </svg>
        </Link>
        
        {processing && (
          <div className="absolute inset-0 bg-white bg-opacity-70 flex justify-center items-center z-10">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        )}

        <div className="space-y-4">
          {/* Image tabs for Store and Certificate */}
          <div className="border-b border-gray-200">
            <ul className="flex flex-wrap -mb-px text-sm font-medium text-center">
              <li className="mr-2">
                <button 
                  onClick={() => setActiveTab('store')}
                  className={`inline-block p-4 border-b-2 rounded-t-lg ${
                    activeTab === 'store' 
                      ? 'border-blue-600 text-blue-600' 
                      : 'border-transparent hover:text-gray-600 hover:border-gray-300'
                  }`}
                >
                  Store Image
                </button>
              </li>
              <li className="mr-2">
                <button 
                  onClick={() => setActiveTab('certificate')}
                  className={`inline-block p-4 border-b-2 rounded-t-lg ${
                    activeTab === 'certificate' 
                      ? 'border-blue-600 text-blue-600' 
                      : 'border-transparent hover:text-gray-600 hover:border-gray-300'
                  }`}
                >
                  Certificate
                </button>
              </li>
            </ul>
          </div>

          {/* Images Section */}
          <div className="w-full flex justify-center">
            {/* Store Image */}
            <div className={`w-[370px] h-[370px] border border-gray-300 object-cover ${activeTab === 'store' ? 'block' : 'hidden'}`}>
              {userDetails.storeImage ? (
                <img
                  src={userDetails.storeImage}
                  alt="Pharmacy store preview"
                  className="w-full h-full object-contain"
                  onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
                    e.currentTarget.src = "/placeholder-image.jpg"; // Fallback image
                  }}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400">
                  No store image available
                </div>
              )}
            </div>

            {/* Certificate Image */}
            <div className={`w-[370px] h-[370px] border border-gray-300 object-cover ${activeTab === 'certificate' ? 'block' : 'hidden'}`}>
              {userDetails.certificateLink ? (
                <img
                  src={userDetails.certificateLink}
                  alt="Pharmacy certificate preview"
                  className="w-full h-full object-contain"
                  onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
                    e.currentTarget.src = "/placeholder-image.jpg"; // Fallback image
                  }}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400">
                  No certificate image available
                </div>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="text-gray-600">Pharmacy Store</div>
            <div className="text-end">{userDetails.pharmacyStore}</div>
            <div className="text-gray-600">Email</div>
            <div className="text-end">{userDetails.email}</div>
            <div className="text-gray-600">Name</div>
            <div className="text-end">{userDetails.name}</div>
            <div className="text-gray-600">Address</div>
            <div className="text-end">{userDetails.address}</div>
            <div className="text-gray-600">Sub-District</div>
            <div className="text-end">{userDetails.subDistrict}</div>
            <div className="text-gray-600">District</div>
            <div className="text-end">{userDetails.district}</div>
            <div className="text-gray-600">Province</div>
            <div className="text-end">{userDetails.province}</div>
            <div className="text-gray-600">Zip Code</div>
            <div className="text-end">{userDetails.zipCode}</div>
          </div>

          {/* Links to view full images */}
          <div className="mt-4 space-y-2">
            {userDetails.storeImage && (
              <div>
                <a
                  href={userDetails.storeImage}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  View Full Store Image
                </a>
              </div>
            )}
            
            {userDetails.certificateLink && (
              <div>
                <a
                  href={userDetails.certificateLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  View Full Certificate
                </a>
              </div>
            )}
          </div>

          <div className="flex space-x-4 mt-6">
            <button
              onClick={handleDecline}
              disabled={processing}
              className="flex-1 bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition disabled:opacity-50"
            >
              Decline
            </button>
            <button
              onClick={handleAccept}
              disabled={processing}
              className="flex-1 bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition disabled:opacity-50"
            >
              Accept
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetailsPage;