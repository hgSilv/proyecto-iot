#!/bin/bash

python3 /home/gipsy/Documents/IoT/proyecto/script.py
echo "Inicializando script de python"
echo "Comenzando sampleo"
edge-impulse-linux-runner
./servo.py
