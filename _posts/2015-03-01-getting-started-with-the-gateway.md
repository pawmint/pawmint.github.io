---
layout: page
title: "Getting Started with the Gateway"
category: home
date: 2015-03-01 20:08:03
---

# Setting up a Raspberry Pi

## How to run the setup script

For this step, you will need the following material:
* one Raspberry Pi and its power cable
* one SD card suitable to your Raspberry Pi version
* one Ethernet cable, and one Ethernet plug
* an access to the internet


[x] You will need to install the Operating System and some packages on the SD carte (the minimum size and speed of your SD card depend on raspberry pi model). In our case it was Raspberry Pi B with SD carte of 8 Mb 4 class.
Therefore, download the following git repository under zip file format: [Clic Here] (https://github.com/pawmint/raspberry_setup) Extract it in your local directory.


[x] Insert the card into the PC, and verify the name of its partition by typing df -h in the terminal. You will see all the partitions of both your local machine and the SD card. Here is what you get:

*When the SD card is not inserted*
'''sh
        laure@laure-HP-Pavilion-TS-14-Notebook-PC:~$ df -h 
        Sys. de fichiers Taille Utilisé Dispo Uti% Monté sur 
        /dev/sda7           28G    5.5G   21G  22% / 
        none               4.0K       0  4.0K   0% /sys/fs/cgroup 
        udev               3.9G    4.0K  3.9G   1% /dev 
        tmpfs              792M    1.2M  791M   1% /run 
        none               5.0M       0  5.0M   0% /run/lock 
        none               3.9G     15M  3.9G   1% /run/shm 
        none               100M     60K  100M   1% /run/user 
        /dev/sda4          649G    285G  364G  44% /media/windows 
        /dev/sda2          256M    112M  145M  44% /boot/efi 
        /dev/sda1          400M    287M  114M  72% /media/laure/WINRE 

'''
*When SD card is inserted*
'''sh
        laure@laure-HP-Pavilion-TS-14-Notebook-PC:~$ df -H 
        Sys. de fichiers Taille Utilisé Dispo Uti% Monté sur 
        /dev/sda7           30G    5.9G   22G  22% / 
        none               4.1k       0  4.1k   0% /sys/fs/cgroup 
        udev               4.2G    4.1k  4.2G   1% /dev 
        tmpfs              830M    1.3M  829M   1% /run 
        none               5.3M       0  5.3M   0% /run/lock 
        none               4.2G     16M  4.2G   1% /run/shm 
        none               105M     66k  105M   1% /run/user 
        /dev/sda4          697G    306G  391G  44% /media/windows 
        /dev/sda2          269M    118M  152M  44% /boot/efi 
        /dev/sda1          420M    301M  120M  72% /media/laure/WINRE 
        /dev/mmcblk0p2     2.8G    2.4G  301M  89% /media/laure/5d18be51-3217-4679-9c72-a54e0fc53d6b 
        /dev/mmcblk0p1      59M     10M   49M  17% /media/laure/boot 
'''

[x] Run the firmwareUpdate.sh - contained in the previously downloaded git file - as root (sudo), and follow the execution. Beware: make sure that the device proposed to burn is the SD card, otherwise all data on other partition will be lost. Here is what you get: 

'''sh
        laure@laure-HP-Pavilion-TS-14-Notebook-PC:~$ cd Bureau/LienIPAL/Raspberry/raspberry_setup-master 
        laure@laure-HP-Pavilion-TS-14-Notebook-PC:~/Bureau/LienIPAL/Raspberry/raspberry_setup-master$ sudo ./firmwareUpdate.sh 
        [sudo] password for laure: 

        ---------------------------------------------------------- 
        Burning eMMC flasher of Rasbian for Raspberry Pi on SD card. 

        Getting firmware image 
        --2015-05-18 11:36:39--  http://downloads.raspberrypi.org/raspbian_latest 
        Résolution de downloads.raspberrypi.org (downloads.raspberrypi.org)... 93.93.128.211, 93.93.128.230, 93.93.130.39, ... 
        Connexion vers downloads.raspberrypi.org (downloads.raspberrypi.org)|93.93.128.211|:80... connecté. 
        requête HTTP transmise, en attente de la réponse... 302 Found 
        Emplacement: http://downloads.raspberrypi.org/raspbian/images/raspbian-2015-05-07/2015-05-05-raspbian-wheezy.zip [suivant] 
        --2015-05-18 11:36:41--  http://downloads.raspberrypi.org/raspbian/images/raspbian-2015-05-07/2015-05-05-raspbian-wheezy.zip 
        Réutilisation de la connexion existante vers downloads.raspberrypi.org:80. 
        requête HTTP transmise, en attente de la réponse... 302 Found 
        Emplacement: http://director.downloads.raspberrypi.org/raspbian/images/raspbian-2015-05-07/2015-05-05-raspbian-wheezy.zip [suivant] 
        --2015-05-18 11:36:41--  http://director.downloads.raspberrypi.org/raspbian/images/raspbian-2015-05-07/2015-05-05-raspbian-wheezy.zip 
        Résolution de director.downloads.raspberrypi.org (director.downloads.raspberrypi.org)... 93.93.130.39, 93.93.130.214, 93.93.128.211, ... 
        Réutilisation de la connexion existante vers downloads.raspberrypi.org:80. 
        requête HTTP transmise, en attente de la réponse... 302 Moved temporarily 
        Emplacement: http://files.velocix.com/c1410/newdownloads/raspbian/images/raspbian-2015-05-07/2015-05-05-raspbian-wheezy.zip [suivant] 
        --2015-05-18 11:36:42--  http://files.velocix.com/c1410/newdownloads/raspbian/images/raspbian-2015-05-07/2015-05-05-raspbian-wheezy.zip 
        Résolution de files.velocix.com (files.velocix.com)... 212.187.212.226 
        Connexion vers files.velocix.com (files.velocix.com)|212.187.212.226|:80... connecté. 
        requête HTTP transmise, en attente de la réponse... 302 Found 
        Emplacement: http://202.166.85.154/bt/0e19598eba0e05d0be045394081575189cdaf075/data/2015-05-05-raspbian-wheezy.zip [suivant] 
        --2015-05-18 11:36:43--  http://202.166.85.154/bt/0e19598eba0e05d0be045394081575189cdaf075/data/2015-05-05-raspbian-wheezy.zip 
        Connexion vers 202.166.85.154:80... connecté. 
        requête HTTP transmise, en attente de la réponse... 200 OK 
        Taille : 1038523231 (990M) [application/zip] 
        Enregistre : «raspbian_latest» 
'''

[x] When the system is installed on the card, insert it into the SD card slot on the Raspberry, connected to Ethernet network.          
Then we identify Raspberry IP (I used nmap command to scan network [How to use nmap command] (https://www.raspberrypi.org/documentation/troubleshooting/hardware/networking/ip-address.md)). 

* Install nmap
'''sh apt-get install nmap'''
* Get your computers IP address
'''sh hostname -I''', I get 192.168.1.101
* Scan the whole subnet surrounding your computer, which means look for internet connected devices (especially your Raspberry Pi!) on IP addresses from #192.168.1.0 to 192.168.1.255
'''sh  nmap -sn 192.168.1.0/24''' You should get something like this:

'''sh
        Nmap scan report for hpprinter (192.168.1.2)
        Host is up (0.00044s latency).
        Nmap scan report for Gordons-MBP (192.168.1.4)
        Host is up (0.0010s latency).
        Nmap scan report for ubuntu (192.168.1.5)
        Host is up (0.0010s latency).
        Nmap scan report for raspberrypi (192.168.1.8)
        Host is up (0.0030s latency).
        Nmap done: 256 IP addresses (4 hosts up) scanned in 2.41 seconds'''
 Here you can see a device with hostname raspberrypi has IP address 192.168.1.8.

[x] At this step we can remotely connect to RaspberryPi from our PC 
'''sh   
ssh pi@<IP> 
password: raspberry 
'''

[x] In order to install some other packages, change script remoteSetup.sh by setting Raspberry IP  and run remoteSetup.sh as root 
It is a last step, but in order to improve and facilitate installation process we should burn the image of complete system with all packages 

[x] Remove the SD card and reinsert in PC. Then verify the size of its partition with df -h, as you did earlier. dd command duplicates partition into bootable image, 
'''sh        
sudo dd bs=<byte size> if=<source> of=<target> count=<number of blocks> 
source= partition on the SD-card, 
target=name_of_iso_image where the data gets written. 
bs=byte size per block 
count=number of blocks 
'''     
   
So, for example, if our partition size=2,9 Gb, bs=1M count=3000 
   
'''sh
sudo dd bs=1M if=/dev/mmcblk0 of=/home/newraspberry/raspberry.img count=3000 
'''
Done!

## What is in the Raspberry Pi

* An internet connection, either through 3G, Wifi or ethernet
* Marmitek-gw
* Zigbee-gw
* SSH Reverse-proxy
* Weaved reverse-proxy

# Ubigate

Ubigate is a Python library which purpose is mostly to exchange MQTT messages with the server. It isn't meant to be started directly, but rather used by `marmitek-gw`, `zigbee-gw` and possibly others.

## TODO

* List the useful methods of Ubigate
* Give the format of input messages (mochad, zigbee...)
* Give the format of output MQTT messages (events...)
* Describe the config
* Mention the log/cache files
* Mention the listening part (even though it is not active yet)
