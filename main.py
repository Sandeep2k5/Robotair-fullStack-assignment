from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import psutil
import platform
import time
import requests

app = FastAPI()

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allow all methods
    allow_headers=["*"],  # Allow all headers
)

# Utility function to get approximate location (Server Location)
def get_location():
    try:
        response = requests.get("https://ipinfo.io/json")
        data = response.json()
        return data.get("city", "Unknown") + ", " + data.get("region", "Unknown")
    except:
        return "Unknown"

@app.get("/")
def read_root():
    return {"message": "System Resource Dashboard Backend"}

@app.get("/system-info")
def get_system_info():
    battery = psutil.sensors_battery()
    cpu_usage = psutil.cpu_percent(interval=1)
    memory_info = psutil.virtual_memory()

    # Calculate User RAM Usage
    user_ram_usage = f"{memory_info.used / (1024 ** 3):.2f} GB"

    # Construct system data (server-side info)
    system_info = {
        "time": time.strftime("%Y-%m-%d %H:%M:%S"),  # Server current time
        "python_version": platform.python_version(),
        "python_info": platform.platform(),  # Python system/platform info
        "battery": f"{battery.percent}%" if battery else "Not Available",
        "cpu_usage": f"{cpu_usage}%",
        "ram_usage": user_ram_usage,  # User RAM usage
        "current_time": time.strftime("%H:%M:%S"),  # Current time to replace GPU usage
        "location": get_location(),
    }
    return system_info
