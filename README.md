#System Resource Dashboard
##Overview
The System Resource Dashboard is a full-stack application that displays real-time system information such as:

CPU Usage
RAM Usage
Battery Status
System Temperature
Python Version
Current Time
Location (via IP-based API)
The application consists of a FastAPI backend and a React frontend, with deployment and containerization using modern tools:

Frontend: Hosted on Netlify
Backend: Hosted on Render
Containerization: Packaged using Docker for seamless portability.
Features
Real-time System Monitoring:

CPU Usage
RAM Usage
Battery Percentage
System Temperature
Python Version
Current Time
Location (via IP-based API)
Auto-refresh every 5 seconds for updated information.

Modern UI: Organized and clean layout for easy data visualization.

Cross-Origin Support: Smooth backend-to-frontend communication enabled via CORS.

Technologies Used
Frontend
React.js
Axios: For making API requests
CSS: For UI styling
Netlify: For frontend hosting
Backend
FastAPI: For creating RESTful APIs
psutil: For real-time system monitoring
requests: For fetching location data using external APIs
Render: For backend deployment
Containerization
Docker: For containerizing the frontend and backend applications
