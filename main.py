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
    allow_origins=["*"],  
    allow_credentials=True,
    allow_methods=["*"],  
    allow_headers=["*"],  
)

# Utility function to get approximate location
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
    temperature = psutil.sensors_temperatures() if hasattr(psutil, "sensors_temperatures") else {}
    gpu_usage = "N/A"

    # Safely retrieve temperature data
    cpu_temperature = "N/A"
    if "cpu" in temperature and temperature["cpu"]:
        try:
            cpu_temperature = f"{temperature['cpu'][0].current} °C"
        except (AttributeError, IndexError):
            cpu_temperature = "N/A"

    # Construct system data
    system_info = {
        "time": time.strftime("%Y-%m-%d %H:%M:%S"),
        "python_version": platform.python_version(),
        "battery": f"{battery.percent}%" if battery else "Not Available",
        "cpu_usage": f"{cpu_usage}%",
        "ram_usage": f"{memory_info.percent}%",
        "temperature": cpu_temperature,
        "gpu_usage": gpu_usage,
        "location": get_location(),
    }
    return system_info
