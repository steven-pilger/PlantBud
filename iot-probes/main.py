import usocket as socket
import machine
from machine import Pin
import dht
import network
from time import sleep
import urequests as requests
from random import randrange

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


def request(ip, port, endpoint, request_type = 'GET', data = {}, use_stream=False):
    s = socket.socket()

    ai = socket.getaddrinfo(ip, port)
    addr = ai[0][-1]
    query_parameters = parse_data_to_query_params(data)
    url = '/{}{}'.format(endpoint, query_parameters)

    print("Connect address:", addr)
    s.connect(addr)
    s.send(b"{} {} HTTP/1.0\r\n\r\n".format(request_type, url))

    s.close()

def parse_data_to_query_params(data = {}):
    query_params = ''
    for i, element in enumerate(data.items()):
        prefix = '&' if i != 0 else '?'
        param_element = prefix + '='.join([str(element[0]), str(element[1])])
        query_params += param_element
    return query_params



if machine.reset_cause() == machine.DEEPSLEEP_RESET:
    print('woke from a deep sleep')

# Sleep Specification
sleep_duration = 10
seconds_per_minute = 60
seconds_to_miliseconds_factor = 1000
deepsleep_length = sleep_duration * seconds_per_minute * seconds_to_miliseconds_factor

# Device Config
device_config = read_secrets('./device.secret')

# Wait for 2 seconds upon boot
sleep(2)

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

# build data object for post request
temp = randrange(18,35)
humid = randrange(1,100)
data = {
    'temperature': temp,
    'humidity': humid,
    'device': device_config['NAME']
}
p = Pin(23, Pin.OUT)
p.on()

api_config = read_secrets('./nodered-api.secret')
request(
    ip = api_config['LANIP'],
    port = api_config['PORT'],
    endpoint = api_config['ENDPOINT'],
    request_type = 'POST',
    data = data
)

p.off()
sleep(1)

# Go to deepsleep
machine.deepsleep(deepsleep_length)
