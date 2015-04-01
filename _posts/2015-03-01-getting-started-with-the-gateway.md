---
layout: page
title: "Getting Started with the Gateway"
category: home
date: 2015-03-01 20:08:03
---

# Setting up a Raspberry Pi

* TODO : How to run the setup script

## What's in the Raspberry Pi

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
