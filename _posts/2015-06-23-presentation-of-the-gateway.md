---
layout: page
title: "Presentation of the Gateway"
category: deprecated
date: 2015-06-23 12:56:57
archive: true
---

# Presentation of the Gateway

## Macro presentation

The gateway is the whole system catching the sensors' signals, treating them, transforming them into events and transferring those to the Cloud.



![Global architecture](https://github.com/pawmint/techntuts/blob/gh-pages/images/architectureproject.png?raw=true)



The UbiGATE Gateway includes several modules:

* The sensors capture de signals and send them to the Gate.
* The Gate is an object instanciated by the UbiGATE Library, which receives the signals, translates them, and send them to the next module.
* The next module is the broker: since we use the MQTT protocol for the Gate-Cloud communication, a broker is required to handle the publish&submit plateform. 



![Global architecture](https://github.com/pawmint/techntuts/blob/gh-pages/images/ArchiUbigate.png?raw=true)



* Finally, the UbiGATE Library allows to create and manage the gates. 


![Interaction](https://github.com/pawmint/techntuts/blob/gh-pages/images/interactionlabmarm.png?raw=true)



## Micro presentation



Here is the detail of the inside architecture of the UbiGATE library and the marmitek gateway. These drawings aim to show the different files these modules are made of, and how there functions are articulated with another.

### Marmitek Gateway

![marmitekgw](https://github.com/pawmint/techntuts/blob/gh-pages/images/marmigate.png?raw=true)

### UbiGATE Library

![Ubilib](https://github.com/pawmint/techntuts/blob/gh-pages/images/ubigatelib.png?raw=true)

### Ubigate Library methods

METHODS

Connection

* __init_clients_ : Create an mqtt client
	* __make_client_
		* __disconnect_callback_
		* __connect_callback_
* __quit_ 

Publication

* _push_ : Publish data through MQTT, given a topic and a house. Also saved to a persistent buffer
	* __add_to_buffer_
		* __save_buffer_
* __publish_callback_ : Acknowledge that a message has been published. Clears from buffer
	* __remove_from_buffer_
		* __save_buffer_
* __push_buffer_ : Publish every message that are currently in the buffer for a client 
	* __save_buffer_
* __init_buffer_ : Load buffer from the file, for a client
	* __get_buffer_filename_

Subscription

* __subscribe_all_ : Subscribe to all topics
* _callback_subscribe_ : Subscribe to topic. Apply the handler when receiving a message on that topic
* __on_message_callback_ : Callback catching the server messages
* __subscription_callback_ : Log the status of the subscription in %

Utilisation

* _find_house_ : Given a sensor, return the house
* __display_config_ : Shows overview of gate (all gateways&all houses)
