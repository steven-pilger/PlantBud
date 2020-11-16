SERIAL_PORT = /dev/ttyUSB0
BAUDRATE = 115200
AMPY_CMD = ampy --port $(SERIAL_PORT) --baud $(BAUDRATE)
PICOCOM_CMD = picocom $(SERIAL_PORT) -b $(BAUDRATE)

.PHONY: upload console restart all

all: upload reset run terminal

reset:
	$(AMPY_CMD) reset

upload:
	$(AMPY_CMD) put boot.py
	$(AMPY_CMD) put main.py
	$(AMPY_CMD) put credentials.py

run:
	$(AMPY_CMD) run --no-output main.py

terminal:
	$(PICOCOM_CMD)
