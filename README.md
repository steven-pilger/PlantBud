# PlantBud

A set of distributed sensors that can gather metrics about your plants.

## Architecture



## Technologies

- ESP32: Measure plant metrics and use HTTP requests to relay these to a DB
- Micropython as the runtime on the ESP32
- Raspberry Pi: Host NodeRED to act as an interface between local network and internet
- Ansible to manage the RPi
- NodeRED: Run on Pi in local network to wire together the ESP32 sensors with APIs and DBs
- InfluxDB: Time-series database to aggregate and serve the plant metrics
- OracleCloud: Provide a free-tier VM for container deployments
- Docker/Docker-Compose: Run container based software
