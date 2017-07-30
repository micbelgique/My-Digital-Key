# Auteurs

Equipe Litt Up

- Corentin Bilotta
- Bainjamin Lafalize 
- Jérémy Moffa
- Aurélien Staquet

# Description

nom du projet
description avec techno utilisée


# Liste GPIO

LED VERT: GPIO 12 (OPEN)  
LED ROUGE: GPIO 16 (CLOSE)  
    3.3V: Raspberry Pi 3.3v  
    SCK: Raspberry Pi GPIO 25  
    MISO: Raspberry Pi GPIO 24  
    MOSI: Raspberry Pi GPIO 23  
    SSEL: Raspberry Pi GPIO 18  
    GND: Raspberry Pi GND  

# Install raspi server

sudo apt-get update -qq && sudo apt-get install -y -qq git cmake build-essential g++ gcc make
mkdir build
cd build
cmake ../src
nmake
cd ../bin
#cd Release
cd Debug
