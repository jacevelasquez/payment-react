import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [userDetails, setUserDetails] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");

  // Fetch user data using Axios
  useEffect(() => {
    const fetchUserDetails = async () => {
      if (userId) {
        try {
          const response = await axios.get(
            `http://localhost:3000/user/${userId}`,
            { withCredentials: true }
          );
          setUserDetails(response.data);
        } catch (err) {
          setError("Unauthorized user");
          console.error("Error fetching user details:", err);
        }
      } else {
        setError("No user ID found.");
      }
    };

    fetchUserDetails();
  }, []);

  // Navigate to System Health Check 
  const handleHealthCheck = () => {
    navigate("/server/health");
  };

  return (
    <div className="relative min-h-screen bg-gray-100">
      <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/3 w-full max-w-md h-[320px] p-8 bg-white rounded-lg shadow-md">
        
        {error && <p>{error}</p>}
        {userDetails && (
          <div>
            <h2 className="text-2xl font-bold mb-2 text-gray-800">User Details</h2>
            <p className="text-lg font-small text-gray-700 mb-1"><b>First Name: </b>{userDetails.first_name}</p>
            <p className="text-lg font-small text-gray-700 mb-1"><b>Last Name: </b> {userDetails.last_name}</p>
            <p className="text-lg font-small text-gray-700 mb-1"><b>Username:</b> {userDetails.username}</p>
          </div>
        )}
        <button className="w-full py-2 px-4 mt-6 bg-indigo-600 text-white font-bold rounded-md shadow-sm"
        onClick={handleHealthCheck}>Check Server Health</button>
      </div>
    </div>
  );
};

export default Dashboard;
