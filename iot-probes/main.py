import usocket as socket
import machine
from machine import Pin, ADC
import dht
import network
from time import sleep
import urequests as requests
from random import randrange
from math import sqrt

def read_secrets(credential_path):
    credentials = {}
    with open(credential_path, 'r') as f:
        for line in f:
            entry = line.strip().split('=')
            if len(entry) == 2:
                credentials[entry[0]] = entry[1]
    return credentials

def connect_wlan(SSID, PW, NAME):
    wlan = network.WLAN(network.STA_IF)
    wlan.active(True)
    if not wlan.isconnected():
        print('connecting to network...')
        wlan.config(dhcp_hostname=NAME)
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
connect_wlan(credentials['SSID'], credentials['PASSWORD'], device_config['NAME'])

# Take analog soil moisture measurement
adc = ADC(Pin(34))
sleep(1)
attempt = 0
acclimated = False
while True:
    buf = []
    if acclimated:
        print('Measuring!')
        for i in range(10):
            value = adc.read_u16()
            buf.append(value)
            sleep(0.3)
        moisture = sum(buf) / len(buf)
        moisture = round((1 - (moisture / 24000)) * 100)
        break
    elif not acclimated and attempt >= 15:
        print('Could not acclimate. Measurement skipped.')
        moisture = 999
        break
    else:
        attempt += 1
        print('Acclimating: ', attempt)
        for i in range(25):
            value = adc.read_u16()
            buf.append(value)
            sleep(0.2)
        # calculate mean
        m = sum(buf) / len(buf)
        # calculate variance using a list comprehension
        var_res = sum([(xi - m) ** 2 for xi in buf]) / (len(buf) -1)
        stdv = sqrt(var_res)
        print(buf)
        print(m)
        print('Variance: ', var_res)
        print('Std.dev.: ', stdv)

        if stdv <= 400 and attempt >= 3 and stdv != 0.0:
            acclimated = True



# Take DHT ambient measurement
d = dht.DHT11(Pin(32, Pin.IN, Pin.PULL_UP))
d.measure()
temp = d.temperature() # eg. 23 (°C)
humid = d.humidity()    # eg. 41 (% RH)

data = {
    'temperature': temp,
    'humidity': humid,
    'moisture': moisture,
    'device': device_config['NAME']
}

print(data)
# p = Pin(23, Pin.OUT)
# p.on()

api_config = read_secrets('./nodered-api.secret')
request(
    ip = api_config['LANIP'],
    port = api_config['PORT'],
    endpoint = api_config['ENDPOINT'],
    request_type = 'POST',
    data = data
)

# p.off()
sleep(1)

# Go to deepsleep
machine.deepsleep(deepsleep_length)
