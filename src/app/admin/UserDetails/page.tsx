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
  status: string;
}

const UserDetailsPage: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const userId = searchParams.get('id');
  
  const [userDetails, setUserDetails] = useState<UserDetailsProps | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [processing, setProcessing] = useState(false);

  // Fetch user details from backend
  useEffect(() => {
    const fetchUserDetails = async () => {
      if (!userId) {
        setError("User ID is missing");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const response = await fetch(`/api/users/${userId}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch user details');
        }
        
        const data = await response.json();
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
      const response = await fetch(`/api/users/${userId}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: 'accepted' }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to accept registration');
      }
      
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
      const response = await fetch(`/api/users/${userId}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: 'declined' }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to decline registration');
      }
      
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
          <div className='w-full flex justify-center'>
            <div className="w-[370px] h-[370px] border border-gray-300 object-cover">
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
            
            {userDetails.status && (
              <>
                <div className="text-gray-600">Status</div>
                <div className="text-end">
                  <span className={`px-2 py-1 rounded ${
                    userDetails.status === 'accepted' ? 'bg-green-100 text-green-800' : 
                    userDetails.status === 'declined' ? 'bg-red-100 text-red-800' : 
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {userDetails.status.charAt(0).toUpperCase() + userDetails.status.slice(1)}
                  </span>
                </div>
              </>
            )}
          </div>
          
          {userDetails.certificateLink && (
            <div className="mt-4">
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
          
          {(!userDetails.status || userDetails.status === 'pending') && (
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
          )}
        </div>
      </div>
    </div>
  );
};

export default UserDetailsPage;