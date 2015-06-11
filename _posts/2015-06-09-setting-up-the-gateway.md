---
layout: page
title: "Setting up the gateway"
category: home
date: 2015-06-09 12:35:57
---

# Set up the Marmitek Gateway

## What does the hardware part look like?

![Hardware architecture](https://github.com/pawmint/techntuts/blob/gh-pages/images/hardware.png?raw=true)

## How do I make it work?


### All the parts you need


In order to make this work, you will need:

* Motion sensors MS13E and door sensors DS90: make sure they have battery and they are on, read their notice before
* a transciever
* a set up Raspberry Pi: to set it up, refer to the section [Setting up a raspberry pi] (http://pawmint.github.io/techntuts/getting-started-with-the-gateway/)
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



* Make the transciever communicate with the computer by installing the Mochad module on your RP: follow [this tutorial] (http://x10linux.blogspot.sg/2012/08/installing-mochad-on-raspberry-pi.html). Mochad is a Linux TCP gateway daemon for the X10 RF protocol (radio signals): it allows your Raspberry to receive and understand X10 RF (radio) signals.

 You can now test Mochad with the ``` ps aux | grep mochad command ```:

 ```
  ❯ ps aux | grep mochad                                                                                                           [12:15:00 PM] 
  root      6394  0.0  0.0  29796   900 ?        Ssl  11:51   0:00 /usr/local/bin/mochad 
  laure     6790  0.0  0.0  15984   960 pts/4    S+   12:15   0:00 grep mo
  ```

  You should see the line:
  ``` root      6394  0.0  0.0  29796   900 ?        Ssl  11:51   0:00 /usr/local/bin/mochad ```
  If not, you may want to start it yourself by typing ```sudo mochad```


* Visualize signals from the sensors on ```localhost 1099```. Everytime your activate a sensor, a new line corresponding to the event is added! :

  ```
  ❯ nc localhost 1099                                                                                                              [12:19:27 PM] 
  06/08 12:19:32 Rx RF HouseUnit: A1 Func: On 
  06/08 12:19:32 Rx RFSEC Addr: 6C:C7:80 Func: Contact_alert_max_DS10A 
  06/08 12:19:35 Rx RF HouseUnit: B2 Func: On 
  06/08 12:19:36 Rx RF HouseUnit: A4 Func: On 
  06/08 12:19:38 Rx RF HouseUnit: A3 Func: On 
  06/08 12:19:39 Rx RF HouseUnit: A1 Func: On 
  ```


### Install the gateway on your RP


  Clone UbiGATE and marmitek-gw on your RP

  ```git clone https://github.com/pawmint/marmitek-gw.git``` 
  
  ```git clone https://github.com/pawmint/ubiGATE.git ```

  
  Install them:

  in folder UbiGATE: ```sudo python setup.py develop``` 
  
  in folder marmitek-gw: ```sudo python setup.py develop```
  

### Install Mosquitto
  

You will need to build the broker and allow it to communicate with the cloud through MQTT protocol, by following [this tutorial] (http://blogs.media-tips.com/bernard.opic/2015/01/16/vos-premiers-messages-mqtt-avec-mosquitto-sous-ubuntu/).


  As you can see in this tutorial, you will use:
* ```mosquitto -p port``` allowing you to open a port to MQTT protocol
* ```mosquitto_sub -t topic, -p port``` to subscribe to a topic on an open port
* ```mosquitto_pub -t topic, -p port, -m message``` to publish a message on the topic
 
Feel free to test it, publish messages on several ports, receiving them in an other terminal window etc. Here's a good documentation for MQTT, mosquitto, mosquitto-sub and mosquitto-pub:
  (http://mosquitto.org/man/mqtt-7.html).

  Ex: in three different terminals, write:

```mosquitto -p 8000``` → open port 8000

```mosquitto_sub -t sensors/mvt -p 8000 ```→ subscribe to port 8000, topic s/m

```mosquitto_pub -t sensors/mvt -p 8000 -m “hello” ```→ publish “hello” on port 8000, topic s/m
 
 on the second terminal, you should see the “hello” message appear


### Test it!

  In your shell terminal, run 
  ``` python gateway.py```


### Useful links:

  [Wikipedia Article on X10 protocol] (http://en.wikipedia.org/wiki/X10_(industry_standard))

  [Mochad installation] (http://x10linux.blogspot.sg/2012/08/installing-mochad-on-raspberry-pi.html)

  [Easy domotics (french version)] (http://www.domotiquefacile.fr/tous-les-tutoriaux/installation-x10-sur-un-raspberry-pi)


