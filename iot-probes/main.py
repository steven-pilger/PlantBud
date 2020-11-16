from machine import deepsleep
from machine import Pin
import dht
import network
import time
import urequests

def read_credentials(credential_path):
    credentials = {}
    with open(credential_path, 'r') as f:
        for line in f:
            entry = line.strip().split('=')
            if len(entry) == 2:
                credentials[entry[0]] = entry[1]
    return credentials

def connect_wlan(SSID, PW):
    wlan = network.WLAN(network.STA_IF)
    wlan.active(True)
    if not wlan.isconnected():
        print('connecting to network...')
        wlan.connect(SSID, PW)
        while not wlan.isconnected():
            pass
    print('Network Config:', wlan.ifconfig())

# Sleep Specification
sleep_duration = 15
seconds_per_minute = 60
seconds_to_miliseconds_factor = 1000
deepsleep_length = sleep_duration * seconds_per_minute * seconds_to_miliseconds_factor

# Wait for 2 seconds upon boot
time.sleep(2)

#Connect to WLAN
credentials = read_credentials('./wifi.secret')
connect_wlan(credentials['SSID'], credentials['PASSWORD'])

# Take DHT ambient measurement
d = dht.DHT11(Pin(4))
d.measure()
d.temperature() # eg. 23 (°C)
d.humidity()    # eg. 41 (% RH)

# Take analog soil moisture measurement
# add code here

# Post data to collector
response = urequests.get('http://httpbin.org/ip')
print(response.text)

# Go to deepsleep
deepsleep(deepsleep_length)
