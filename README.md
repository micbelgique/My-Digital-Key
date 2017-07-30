# My Digital key !

My digital key vous permet de déverrouiller votre porte à l'aide de la technologie NFC de votre smartphone. Prêtez la clé de votre maison à votre famille ou à vos amis à l'aide de l'application où vous leur donnerez l’accès à votre serrure connectée ! Gardez le contrôle total sur votre serrure grâce à l'historique des ouvertures de porte ou encore grâce au paramétrage des différents accès à votre porte (heures d'accès, nombre d'ouvertures autorisées, …).

Equipe Litt Up

- Corentin Bilotta
- Bainjamin Lafalize 
- Jérémy Moffa
- Aurélien Staquet

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
