import machine
from machine import Pin
import dht
import network
import time
import urequests as requests

def read_secrets(credential_path):
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

if machine.reset_cause() == machine.DEEPSLEEP_RESET:
    print('woke from a deep sleep')

# Sleep Specification
sleep_duration = 1
seconds_per_minute = 60
seconds_to_miliseconds_factor = 1000
deepsleep_length = sleep_duration * seconds_per_minute * seconds_to_miliseconds_factor

# Device Config
device_config = read_secrets('./device.secret')

# Wait for 2 seconds upon boot
time.sleep(2)

#Connect to WLAN
credentials = read_secrets('./wifi.secret')
connect_wlan(credentials['SSID'], credentials['PASSWORD'])

# Take DHT ambient measurement
# d = dht.DHT11(Pin(4))
# d.measure()
# d.temperature() # eg. 23 (°C)
# d.humidity()    # eg. 41 (% RH)

# Take analog soil moisture measurement
# add code here

# Post data to collector
api_config = read_secrets('./nodered-api.secret')
url = 'http://{}:{}/{}'.format(api_config['LANIP'], api_config['PORT'], api_config['ENDPOINT'])
url = url + '?temperature={}&humidity={}&device={}'.format(12.345, 45.678, device_config['NAME'])

response = requests.post(url)

# Go to deepsleep
machine.deepsleep(10000)
