import React, { useEffect, useState } from "react";
import axios from "axios";

const Health = () => {
  const [health, setHealth] = useState({
    info: {},
  });

  useEffect(() => {
    const fetchHealth = async () => {
        try {
          const response = await axios.get("http://localhost:3000/health");
          setHealth(response.data);
        } catch (error) {
          if (error.response && error.response.status === 503) {
            console.log("Response data:", error.response.data);
            setHealth(error.response.data);
          } else {
            console.error("Error fetching health data:", error);
          }
        }
      };

    fetchHealth();
  }, []);

  const StatusCard = ({ status, type }) => {
    const isUp = status === "up";
    return (
      <div
        className={`p-4 m-2 border-4 ${
          isUp ? "border-green-500" : "border-red-500"
        } rounded`}
      >
        <h2
          className={`text-xl font-bold ${
            isUp ? "text-green-700" : "text-red-700"
          }`}
        >
          {isUp ? type + " is Up" : type + " is Down"}
        </h2>
      </div>
    );
  };

  return (
    <div className="relative min-h-screen bg-gray-100">
      <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/3 w-full max-w-md h-[340px] p-8 bg-white rounded-lg shadow-md">
        <h1 className="text-3xl font-bold mb-4">System Health Status</h1>
        <StatusCard status={health.info?.database?.status} type="Database" />
        <StatusCard status={health.info?.storage?.status} type="Storage" />
        <StatusCard status={health.info?.memory_heap?.status} type="Memory Heap" />
      </div>
    </div>
  );
};

export default Health;
