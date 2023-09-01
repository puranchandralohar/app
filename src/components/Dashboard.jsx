import React from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();


    function logout() {
      navigate('/');
      }

      
  return (
    <div className="dashboard">
      <h2>Welcome!</h2>
      <p>This is your dashboard. You can see your personalized content here.</p>
      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default Dashboard;
