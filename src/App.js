import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [serverInfo, setServerInfo] = useState({});
  const [battery, setBattery] = useState("Fetching...");
  const [deviceInfo, setDeviceInfo] = useState({});
  const [networkInfo, setNetworkInfo] = useState("Unknown");

  // Fetch server system info
  const fetchServerInfo = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/system-info");
      setServerInfo(response.data);
    } catch (error) {
      console.error("Error fetching server info:", error);
    }
  };

  // Fetch battery status
  const fetchBatteryStatus = () => {
    if (navigator.getBattery) {
      navigator.getBattery().then((battery) => {
        setBattery(`${Math.round(battery.level * 100)}%`);
      });
    } else {
      setBattery("Battery API Not Supported");
    }
  };

  // Fetch device info
  const fetchDeviceInfo = () => {
    setDeviceInfo({
      platform: navigator.platform,
      memory: navigator.deviceMemory || "Unknown",
    });

    if (navigator.connection) {
      setNetworkInfo(navigator.connection.effectiveType || "Unknown");
    } else {
      setNetworkInfo("Not Supported");
    }
  };

  useEffect(() => {
    // Initial fetch
    fetchServerInfo();
    fetchBatteryStatus();
    fetchDeviceInfo();

    // Update every 5 seconds
    const interval = setInterval(() => {
      fetchServerInfo();
      fetchBatteryStatus();
    }, 5000);

    // Cleanup interval on unmount
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="app-container">
      <h1>System Resource Dashboard</h1>
      <div className="info-cards">
        <div className="card"><strong>Time:</strong> {serverInfo.time}</div>
        <div className="card"><strong>Python Version:</strong> {serverInfo.python_version}</div>
        <div className="card"><strong>Python Info:</strong> {serverInfo.python_info}</div>
        <div className="card"><strong>Battery:</strong> {serverInfo.battery}</div>
        <div className="card"><strong>CPU Usage:</strong> {serverInfo.cpu_usage}</div>
        <div className="card"><strong>RAM Usage:</strong> {serverInfo.ram_usage}</div>
        <div className="card"><strong>Current Time:</strong> {serverInfo.current_time}</div>
        <div className="card"><strong>Server Location:</strong> {serverInfo.location}</div>
      </div>

      <div className="info-cards">
        <div className="card"><strong>Battery Level:</strong> {battery}</div>
        <div className="card"><strong>Operating System:</strong> {deviceInfo.platform}</div>
        <div className="card"><strong>Approx RAM:</strong> {deviceInfo.memory} GB</div>
        <div className="card"><strong>Network Type:</strong> {networkInfo}</div>
      </div>
    </div>
  );
}

export default App;
