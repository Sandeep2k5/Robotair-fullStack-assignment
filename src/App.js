import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:8000/system-info");
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="app-container">
      <div className="center-title">System Info</div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="info-cards">
          <div className="card">
            <strong>Time</strong>
            <span>{data.time}</span>
          </div>
          <div className="card">
            <strong>Python Version</strong>
            <span>{data.python_version}</span>
          </div>
          <div className="card">
            <strong>Battery</strong>
            <span>{data.battery}</span>
          </div>
          <div className="card">
            <strong>CPU Usage</strong>
            <span>{data.cpu_usage}</span>
          </div>
          <div className="card">
            <strong>RAM Usage</strong>
            <span>{data.ram_usage}</span>
          </div>
          <div className="card">
            <strong>Temperature</strong>
            <span>{data.temperature}</span>
          </div>
          <div className="card">
            <strong>GPU Usage</strong>
            <span>{data.gpu_usage}</span>
          </div>
          <div className="card">
            <strong>Location</strong>
            <span>{data.location}</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
