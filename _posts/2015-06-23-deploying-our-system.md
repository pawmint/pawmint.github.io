---
layout: page
title: "Deploying our system"
category: setting_up_our_platform
date: 2015-06-23 10:00:00
---


# Deployment of the gateway [THE OLD WAY]


## Macro presentation

The gateway is the whole system catching the sensors' signals, treating them, transforming them into events and transferring those to the Cloud.


![Global architecture](https://github.com/pawmint/techntuts/blob/gh-pages/images/architectureproject.png?raw=true)


The hardware part is composed of the following:

![Hardware architecture](https://github.com/pawmint/techntuts/blob/gh-pages/images/hardware.png?raw=true)


The UbiGATE Gateway includes several modules:

* The sensors capture de signals and send them to the Gate.
* The Gate is an object instanciated by the UbiGATE Library, which receives the signals, translates them, and send them to the next module.
* The next module is the broker: since we use the MQTT protocol for the Gate-Cloud communication, a broker is required to handle the publish&submit plateform. 


![Global architecture](https://github.com/pawmint/techntuts/blob/gh-pages/images/ArchiUbigate.png?raw=true)



## Setting up the Raspberry Pi: OS installation and SSH connection


For this step, you will need the following material:


* one Raspberry Pi and its power cable
* one SD card suitable to your Raspberry Pi version
* one Ethernet cable, and one Ethernet plug
* an access to the internet



### Download raspberry setup repo

You will need to install the Operating System and some packages on the SD card (the minimum size and speed of your SD card depend on raspberry pi model). In our case it was Raspberry Pi B with SD carte of 8 Mb 4 class.
Therefore, clone the following raspberrysetup git repository in your local directory:
mkdir IPALdepo
git init
git clone https://github.com/pawmint/raspberry_setup.git
Open it and make sure that the  file ./firmwareUpdate contains the right and up-to-date file name of the firmware version to be burned


### Insert and explore your SD card

Insert the card into the PC, and verify the name of its partition by typing df -h in the terminal. You will see all the partitions of both your local machine and the SD card. Here is what you get:

*When the SD card is not inserted in the computer*

```
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

```

*When SD card is inserted in the computer*

```
   
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

```

### Install the Raspbian OS by running firmwareUpdate.sh

Find the firmwareUpdate.sh script located in raspberry_setup. Run it as root (sudo firmwareUpdate.sh) and follow the execution.
Beware: make sure that the device proposed to burn is the SD card, otherwise all data on other partition will be lost. 
Now just do what you are asked for!


The two following sections aim to control our Raspberry Pi from our computer through the SSH protocol. To understand the concept, you may read this: (https://www.digitalocean.com/community/tutorials/how-to-use-ssh-to-connect-to-a-remote-server-in-ubuntu)


### Identifying our Raspberrys IP

Once the system is installed on the card, insert it into the SD card slot on the Raspberry, connected to Ethernet network.          
Then we identify Raspberry IP (I used nmap command to scan network [How to use nmap command] (https://www.raspberrypi.org/documentation/troubleshooting/hardware/networking/ip-address.md)). 


* Install nmap
``` apt-get install nmap```
* Get your computers IP address
``` hostname -I```, I get 192.168.1.101
* Scan the whole subnet surrounding your computer, which means look for internet connected devices (especially your Raspberry Pi!) on IP addresses from #192.168.1.0 to 192.168.1.255
``` nmap -sn 192.168.1.0/24``` You should get something like this:

```
Nmap scan report for hpprinter (192.168.1.2)
Host is up (0.00044s latency).
Nmap scan report for Gordons-MBP (192.168.1.4)
Host is up (0.0010s latency).
Nmap scan report for ubuntu (192.168.1.5)
Host is up (0.0010s latency).
Nmap scan report for raspberrypi (192.168.1.8)
Host is up (0.0030s latency).
Nmap done: 256 IP addresses (4 hosts up) scanned in 2.41 second

```

Here you can see a device with hostname raspberrypi has IP address 192.168.1.8.
I get the IP 192.168.2.33 so it's the one I will use for this presentation.

### Connect Raspberry to your PC

At this step we can remotely connect to RaspberryPi from our PC by entering:
ssh pi@<IP>  
password: raspberry 


### Configure to make your life easier

Two things left to go through, in order to make your everyday life easier. Here's what we'll do: 
- register pi@192.168.2.33 to save us from typing the IP every time we want to ssh connect.
- create a key and a public key (=keyhole of our RP) to be able to access the RP without entering the password every time.

To save the IP and port, create a .ssh/config file and edit it (vim .ssh/config) by writing:

```
Host pi
Hostname 192.168.2.33
User pi
```

To create the key-keyhole system:

```
ssh-keygen -t rsa -C "RaspberryIPAL" 

 Generating public/private rsa key pair. 
 Enter file in which to save the key (/home/laure/.ssh/id_rsa): /home/laure/.ssh/pi_rsa 
 Enter passphrase (empty for no passphrase): 
 Enter same passphrase again: 
 Your identification has been saved in /home/laure/.ssh/pi_rsa. 
 Your public key has been saved in /home/laure/.ssh/pi_rsa.pub. 
 The key fingerprint is: 
 db:86:3c:fd:35:b0:5d:15:82:5d:0f:62:8f:7f:9b:d5 RaspberryIPAL
```

We can see that a keyhole (```Your public key has been saved in /home/laure/.ssh/pi_rsa.pub.```) and a key have been generated. 
 Now we need to set our keyhole on our Raspberry. We will save it in the pre configured “allowed keys” folder. Finally, we will store or key on our computer's .ssh/config:
``` IdentityFile ~/.ssh/pi_rsa```

 Here you go! Now all you need to do to access your Raspberry Pi is to type “ssh pi” in your terminal!


### Install the Raspberry Setup!

Finally you can install the marmitek-gw and the UbiGATE library on your Raspberry Pi! The raspberry_setup also includes several packages that are required to make marmitek-gw work.
In order to install them, open the remoteSetup.sh script located in raspberry_setup, and set the right Raspberry IP. Then run remoteSetup.sh as root (sudo remoteSetup.sh). 

You now have everything you need to make the marmitek-gw work



## Assembly the gateway


### All the parts you need


In order to make this work, you will need:

* Motion sensors MS13E and door sensors DS90: make sure they have battery and they are on, read their notice before
* a transciever
* a set up Raspberry Pi, with the UbiGATE Library and the Marmitek-gw installed on it: to set this up, refer to the section [Setting up a raspberry pi] (http://pawmint.github.io/techntuts/getting-started-with-the-gateway/)
* your computer, used as an interface to the Raspberry Pi 


### Plug everything together


* Plug your transciever to your Raspberry Pi. In order to make sure that your RP detects the transciever, use ```lsusb```:

```
 ❯ lsusb                                                  [12:05:26 PM] 
 Bus 001 Device 002: ID 8087:8000 Intel Corp. 
 Bus 001 Device 001: ID 1d6b:0002 Linux Foundation 2.0 root hub 
 Bus 003 Device 001: ID 1d6b:0003 Linux Foundation 3.0 root hub 
 Bus 002 Device 004: ID 0eef:a107 D-WAV Scientific Co., Ltd 
 Bus 002 Device 003: ID 8087:07dc Intel Corp. 
 Bus 002 Device 006: ID 0bc7:0002 X10 Wireless Technology, Inc. Firecracker Interface (ACPI-compliant) 
 Bus 002 Device 002: ID 04f2:b40d Chicony Electronics Co., Ltd 
 Bus 002 Device 001: ID 1d6b:0002 Linux Foundation 2.0 root hub 
 ```

You should see the ```X10 Wireless Technology, Inc. Firecracker Interface (ACPI-compliant) ```.



* When you installed the raspberry_setup package on our Raspberry, it loaded a module called Mochad, which allows the transciever to communicate with the computer. Mochad is a Linux TCP gateway daemon for the X10 RF protocol (radio signals): it allows your Raspberry to receive and understand X10 RF (radio) signals. If you want details about it, [here you go!] (http://x10linux.blogspot.sg/2012/08/installing-mochad-on-raspberry-pi.html.

 You can now test Mochad with the ``` ps aux | grep mochad command ```:

 ```
  ❯ ps aux | grep mochad                                                                                                           [12:15:00 PM] 
  root      6394  0.0  0.0  29796   900 ?        Ssl  11:51   0:00 /usr/local/bin/mochad 
  laure     6790  0.0  0.0  15984   960 pts/4    S+   12:15   0:00 grep mo
  ```

  You should see the line:
  ``` root      6394  0.0  0.0  29796   900 ?        Ssl  11:51   0:00 /usr/local/bin/mochad ```
  If not, you may want to start it yourself by typing ```sudo mochad```


* Your signal arrives on the 1099 port of localhost, so you can visualize signals from the sensors on ```localhost 1099```. Everytime your activate a sensor, a new line corresponding to the event is added! :

  ```
  ❯ nc localhost 1099                                                                                                              [12:19:27 PM] 
  06/08 12:19:32 Rx RF HouseUnit: A1 Func: On 
  06/08 12:19:32 Rx RFSEC Addr: 6C:C7:80 Func: Contact_alert_max_DS10A 
  06/08 12:19:35 Rx RF HouseUnit: B2 Func: On 
  06/08 12:19:36 Rx RF HouseUnit: A4 Func: On 
  06/08 12:19:38 Rx RF HouseUnit: A3 Func: On 
  06/08 12:19:39 Rx RF HouseUnit: A1 Func: On 
  ```
  

### Test it!

In your shell terminal, run 
  ```marmitek-gw```

You should see the live visualization of the gate's activity appear: logs such as INFO, DEBUG and WARNING events show up.

* INFO: signals detected

* DEBUG: state of the mochad connection etc

* WARNING: for example, unknown sensor


Soon an error appears: "no MQTT connection"! 
Why?!!!

Because you need an MQTT enabled server to run marmitek-gw:


### Create a local MQTT enabled server for test purposes
  
The Ubigate Library connects to a server to send its processed information (UbiGATE/ubigate/gate.py, line 68: the method _connect requires a server). This server has to be an MQTT server (or broker), which means it needs to be able to recieve and send MQTT messages. In the case of our platform, the broker is a mosca server located on UbiSMART, port 1883. This is the address that should be specified in the configuration file (~/.config/marmitek-gw/conf.json), section "gateway":

```
"server": address of UbiSMART
"port": 1883
```

Nevertheless, you will need to test your Gateway on your own computer before sending your signals to UbiSMART, and therefore turn your computer into a broker. That's the purpose of Mosquitto: allowing your computer to understand the MQTT protocol. Please install it:
```sudo apt-get install mosquitto```
```sudo apt-get install mosquitto-clients```

Here's a good documentation for MQTT, mosquitto, mosquitto-sub and mosquitto-pub: (http://mosquitto.org/man/mqtt-7.html)

Here is the way you'll test your gateway locally:

* In the terminal, run ```mosquitto -p 8000``` →  create an MQTT enabled server on the port 8000 of your Raspberry Pi.

* In the marmitek config file (~/.config/marmitek-gw/conf.json), change the broker destination:
```
"server":"localhost" 
"port": 8000
```
From now on, when you launch the marmitek gateway, all the data will be sent on your MQTT server on port 8000 or your Raspberry Pi.

* In the terminal, run ```mosquitto_sub -t house/1/marmitek/sensor/A1 -p 8000 ``` →  subscribe to topic house/1/marmitek/sensor/A1 on your MQTT enabled server (located on port 8000). This will allow you to visualize what the UbiSMART broker recieves.
(Not to be confused with what you see when you launch "marmitek-gw", which is the live visualization of the gate activity)


### Communicate with UbiSMART!

Once it works, go back to your config file, and enter the UbiSMART broker address, for example:

```
  "gateways": 
  [
      {
            "name": "lolo",
            "server": "yoan.ubismart.org",
            "port": 1883,
            "username": "yoan",
            "password": "*******"
      } 
  ],
```

You will also need to specify your sensors:

```
  "houses": 
  [
      {
            "id": 3,
            "name": "House3",
            "prefix": "<housePrefix>",
            "sensors": [
                         "A4",
                         "A1"
                       ]
       }
   ]
```  

Launch "marmitek-gw": it works!


### Useful links:

  [Wikipedia Article on X10 protocol] (http://en.wikipedia.org/wiki/X10_(industry_standard))

  [Mochad installation] (http://x10linux.blogspot.sg/2012/08/installing-mochad-on-raspberry-pi.html)

  [Easy domotics (french version)] (http://www.domotiquefacile.fr/tous-les-tutoriaux/installation-x10-sur-un-raspberry-pi)


