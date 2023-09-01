import React , { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import './Dashboard.css';

const Dashboard = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState(null);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await fetch(`https://merd-api.merakilearn.org/user/${userId}`);
        if (response.ok) {
          const userData = await response.json();
          setUserDetails(userData[0]);
        } else {
          // If the first API request fails, try the second API
          const secondApiResponse = await fetch(`https://merd-api.merakilearn.org/user/talk_mitra/${userId}`);
          if (secondApiResponse.ok) {
            const secondUserData = await secondApiResponse.json();
            setUserDetails(secondUserData);
          } else {
            // Handle the case when both APIs fail
            console.error('Error fetching user details:', secondApiResponse.status);
          }
        }
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };

    fetchUserDetails();
  }, [userId]);


  const handleLogout = () => {
    // Perform logout actions and navigate to the login page
    navigate('/');
  };

  if (!userDetails) {
    return <div>Loading...</div>;
  }
      
  return (
    <div className="dashboard">
      <h2>Welcome! {userDetails.first_name} {userDetails.last_name} </h2>
      <p>This is your dashboard. You can see your personalized content here.</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Dashboard;
