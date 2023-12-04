import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import crudAxios from '../config/axios';

export default function Me() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null); // State to store the user data

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('x-token');
        const config = {
          headers: { 'x-token': token }
        };

        const res = await crudAxios.get('/me', config);
        setUserData(res.data); // Store the fetched data in state
      } catch (error) {
        console.error('Error fetching user data:', error);
        // Optionally, handle errors more specifically here
      }
    };

    fetchData(); // Call the async function
  }, []);

  useEffect(() => {
    if (!localStorage.getItem('x-token')) {
      navigate('/signin');
    }
  }, [navigate]);

  return (
    <div>
    
        <div>
          <h2>User Data</h2>
          <pre>{JSON.stringify(userData, null, 2)}</pre> {/* Display user data */}
        </div>
   
    </div>
  );
}
