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



### Download raspberry_setup repo

Install the Operating System and required packages on the SD card: <br>

```
mkdir IPALdepo
git init
git clone https://github.com/pawmint/raspberry_setup.git
cd raspberry_setup
```
Make sure that the firmwareUpdate.sh contains the latest version of the firmware version to be burned


### Install Raspbian OS by running firmwareUpdate.sh

Insert the card into the PC. <br>
Get the name of your SD card's partition to be burned: `df -h` shows you all the partitions of both your local machine and the SD card. <br>

Run firmwareUpdate.sh as root and follow the execution: <br>
`sudo firmwareUpdate.sh` <br>
!!! Make sure that the device proposed to burn is the SD card, otherwise all data on other partition will be lost. <br>

### SSH connect the Raspberry to your machine

Explainations about SSH protocol: https://www.digitalocean.com/community/tutorials/how-to-use-ssh-to-connect-to-a-remote-server-in-ubuntu <br>

Connect your Raspberry and your local machine on the same local network. <br>
Identify Raspberry's IP with the `nmap` command: [How to use nmap command] (https://www.raspberrypi.org/documentation/troubleshooting/hardware/networking/ip-address.md)). <br>

``` 
apt-get install nmap
hostname -I
nmap -sn your.local.ip.0/24
```

`hostname -I` gives your local machine's IP address. ex: `192.168.1.101` <br>
`nmap -sn your.local.ip.0/24` scans all IP addresses from `your.local.ip.0` to `your.local.ip.255`. ex: `nmap -sn 192.168.1.0/24` <br>

Find your Raspberry and its IP on the list. <br>
At this step you can remotely connect to your Raspberry from our local machine: <br>

```
ssh pi@<Raspberry's IP> 
password: raspberry 
```

To register the Raspberry in your ssh connected machines: <br>

* Go back to your local machine's terminal and generate a public/private key: <br>

`ssh-keygen -t rsa -C "RaspberryIPAL"` <br>

In `~/.ssh`, you should now be able to see a public (pi_rsa.pub) and a private key (pi_rsa).
In `~/.ssh/config` add the lines, replacing `<Raspberry's IP>` with your Raspberry's IP:

```
Host pi
Hostname <Raspberry's IP> 
User pi
IdentityFile ~/.ssh/pi_rsa
```

* Provide your Raspberry with the public key that you just generated:

```
sudo mkdir .ssh
cd .ssh
sudo touch authorized_keys
```
Open authorized_keys and paste the public key in it.
Now all you need to do to access your Raspberry Pi is to type `ssh pi` in your terminal!


### Install the Raspberry Setup!

Install the marmitek-gw and the UbiGATE library on your Raspberry: <br>
Open `remoteSetup.sh` script located in raspberry_setup, and set the right Raspberry's IP. <br>
Then: `sudo ./remoteSetup.sh` <br>

You have now everything you need to make the marmitek-gw work.


## Assembly the gateway


### All the parts you need


In order to make this work, you will need:

* Motion sensors MS13E and door sensors DS90: make sure they have battery and they are on, read their notice before
* a transciever
* a set up Raspberry Pi, with the UbiGATE Library and the Marmitek-gw installed on it: to set this up, refer to the section [Setting up a raspberry pi] (http://pawmint.github.io/techntuts/getting-started-with-the-gateway/)
* your computer, used as an interface to the Raspberry Pi 


### Plug everything together


* Plug your transciever to your Raspberry Pi. Make sure that your Raspberry detects it with the command `lsusb`: You should see the ```X10 Wireless Technology, Inc. Firecracker Interface (ACPI-compliant) ```


* The Marmitek uses a module called Mochad (Linux TCP gateway daemon for the X10 RF protocol), which allows the transciever to communicate with the computer. 
 Make sure the Mochad process is running with 
 ` ps aux | grep mochad`
 You should see the line:
  ` root      6394  0.0  0.0  29796   900 ?        Ssl  11:51   0:00 /usr/local/bin/mochad `
  If not, start it: `sudo mochad`


* Your sensor signals arrive on localhost, port 1099. You can visualize them:

  ```
  ❯ nc localhost 1099                                                                                                              [12:19:27 PM] 
  06/08 12:19:32 Rx RF HouseUnit: A1 Func: On 
  06/08 12:19:32 Rx RFSEC Addr: 6C:C7:80 Func: Contact_alert_max_DS10A 
  06/08 12:19:35 Rx RF HouseUnit: B2 Func: On 
  06/08 12:19:36 Rx RF HouseUnit: A4 Func: On 
  06/08 12:19:38 Rx RF HouseUnit: A3 Func: On 
  06/08 12:19:39 Rx RF HouseUnit: A1 Func: On 
  ```
  
### Configure Marmitek

The conf file is located in `~/.config/marmitek/conf.json`. Please modify the following: <br>

MQTT: <br>
The Ubigate Library connects to a server to send its processed information. This server has to be an MQTT server (or broker), which means it needs to be able to recieve and send MQTT messages. In the case of our platform, the broker is a mosca server located on UbiSMART, port 1883. 

```
"server": <UBISMART_ADRESS> #(ex:tibo.ubismart.org)
"port": <PORT>
```

If you don't want to test with Ubismart, but rather with your local machine, please read the paragraph "Extra: create a local MQTT enabled server for test purposes"

Your config file should look like this:

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

### Test it!

In your shell terminal, run `marmitek-gw`

You should see the live visualization of the gate's activity appear: logs such as INFO, DEBUG and WARNING events show up.

* INFO: signals detected

* DEBUG: state of the mochad connection etc

* WARNING: for example, unknown sensor



### Extra: create a local MQTT enabled server for test purposes
  

You can turn your own machine into a broker by using Mosquitto: it allows your computer to understand the MQTT protocol. 

```
sudo apt-get install mosquitto
sudo apt-get install mosquitto-clients
```

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



### Useful links:

  [Wikipedia Article on X10 protocol] (http://en.wikipedia.org/wiki/X10_(industry_standard))

  [Mochad installation] (http://x10linux.blogspot.sg/2012/08/installing-mochad-on-raspberry-pi.html)

  [Easy domotics (french version)] (http://www.domotiquefacile.fr/tous-les-tutoriaux/installation-x10-sur-un-raspberry-pi)


