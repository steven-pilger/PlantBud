# PlantBud

A set of distributed sensors that can gather metrics about your plants.

## Architecture



## Technologies

- ESP32: Measure plant metrics and use HTTP requests to relay these to a DB
- Micropython as the runtime on the ESP32
- Raspberry Pi: Host NodeRED to act as an interface between local network and internet
- Ansible to manage the RPi
- NodeRED: Run on Pi in local network to wire together the ESP32 sensors with APIs and DBs
- HomeAssistant: Run on Pi in local network to orchestrate and display information about IoT devices in the home
- InfluxDB: Time-series database to aggregate and serve the plant metrics
- OracleCloud: Provide a free-tier VM for container deployments
- Docker/Docker-Compose: Run container based software

## Get Started

### Prepare a Raspberry Pi for use with ansible

1. Get the ip of the raspi on your network
2. SSH in with the standard user `pi` and pw `raspberry`
3. Create a new user `sudo useradd $NEWUSER`
4. Add that new user to the sudo group `sudo usermod -aG sudo $NEWUSER``
5. Allow the user to execute sudo commands without password:
    1. `sudo visudo -f /etc/sudoers.d/$NEWUSER_nopasswd`
    2. change all to NOPASSWD
6. Logout, log in as new user check that it works (no password prompt): `sudo ls`
7. Create a new ssh-key to login to the pi: `ssh-keygen -t rsa`
8. Copy the key to the pi: `ssh-copy-id $KEY $NEWUSER@pi.networkip`
9. SSH to the pi with key to see that it works: `ssh -i $KEY $NEWUSER@pi.networkip`
10. Similarly ansible should now be usable with this key to execute commands on the pi
