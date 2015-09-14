---
layout: page
title: "Ubigate / Marmitek-gw"
category: hands_on_our_codes
date: 2015-06-23 10:00:00
archive: true
---

# Set up the Marmitek Gateway

## What does the hardware part look like?

![Hardware architecture](https://github.com/pawmint/techntuts/blob/gh-pages/images/hardware.png?raw=true)

## How do I make it work?


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


