import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Profile.css';

// Define the interface for the user data
interface ProfileData {
  name: string;
  email: string;
  mobile: string;
  profilePic: {
    picName: string;
    picPath: string;
  };
}

const Profile: React.FC = () => {
  const [userData, setUserData] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const apiUrl = `${process.env.REACT_APP_API_URL}/api/v1/getAdmin/xvuvL0N5gW1wu01VFjsA57bQT9/tc0qSUh0NMuoy4VmH3L3T3tV0fDKFCZnLU9FbghoDHUKrfKcUgK`; // Replace with your actual API URL

  useEffect(() => {
    // GET request to fetch user data
    axios.get<{ status: boolean, message: string, data: ProfileData }>(apiUrl)
      .then(response => {
        setUserData(response.data.data);
        setLoading(false);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });
  }, []);

  const handleUpdate = (updatedData: Partial<ProfileData>) => {
    // PUT request to update user data
    axios.put<{ status: boolean, message: string, data: ProfileData }>(apiUrl, updatedData)
      .then(response => {
        setUserData(response.data.data);
        alert('Profile updated successfully');
      })
      .catch(error => {
        setError(error);
        alert('Failed to update profile');
      });
  };

  const handleCreate = (newData: ProfileData) => {
    // POST request to create new user data
    axios.post<{ status: boolean, message: string, data: ProfileData }>(apiUrl, newData)
      .then(response => {
        setUserData(response.data.data);
        alert('Profile created successfully');
      })
      .catch(error => {
        setError(error);
        alert('Failed to create profile');
      });
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
       {userData && (
        <>
        <div className='container'>
        <img  className='profilepic' src={`${userData.profilePic.picPath}${userData.profilePic.picName}`} alt="Profile" />
          <p className='username'>Name: {userData.name}</p>
          </div>
        </>
      )}
      

    </div>
  );
};

export default Profile;
