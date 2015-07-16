---
layout: page
title: "Setting up a fully-local demo"
category: setting_up_our_platform
date: 2015-06-23 08:00:00
---

# Set up a local router

Put in place a router that the different devices (raspberry Pi, local PC, smartphone, tablet) will be connected to.

# Set up the gateway

Install the raspberry using the raspberry_setup script:

```bash
git clone git@github.com:pawmint/raspberry_setup.git
cd raspberry_setup
sudo ./fullChainSetup.sh
```

Change the configuration file in the raspberry:

```bash
nano /etc/xdg/marmitek_gw/conf.json
```

```
{
  "gateways": [
    {
      "name": "demo-marmitek",
      "server": "[UBISMART_MACHINE_IP]",
      "port": 1883,
      "username": "demo",
      "password": "demo"
    }
  ],
  "houses": [
    {
      "id": "[HOUSE_ID]",
      "name": "demo_lab",
      "prefix": "A",
      "sensors": [
        "A1",
        "A2",
        "A3",
        "19EE00",
        "D93280"
      ]
    }
  ],
  "logging": {
    "file": "info",
    "stdout": "debug"
  }
}

```

Prepare the different sensors according to the configuration file in the Raspberry Pi (three motion sensors A1, A2, A3 and two contact sensors 19EE00 and D93280)

# Set up the Ubismart plateform

Install ubismart:

```bash
git clone git@github.com:pawmint/ubismart.git
cd ubismart
```

follow instructions in https://github.com/pawmint/ubismart/wiki

add the demo username and password:
```bash
.bin/mosca adduser demo demo --credentials config/mqtt_credentials.json
```

create a temporary admin user:

```bash
sudo -u postgres psql
\c ubidb
INSERT INTO user_in_sails (username, name, email, admin, "encryptedPassword", "accountType") VALUES ('admin', 'admin', 'admin@example.com', true, '$2a$10$MMJ7QJ9jQChyoIsDsgWhieeYrMIYFwotEjYaJtVa12OW1jsz3uKrG', 'tech');
```

Open ubismart through the link https://localhost/

Connect to ubismart with the temporary admin user admin/admin.

Create a new user and delete the temprorary created user.

create a new house (the house_id should correspond to [HOUSE_ID] in raspberry Pi config file)

install needed services (senslog and life services are needed to check if the system is functional).


# Set up the ubibrain plateform

checkout the local-demo branch from ubibrain repository:

```bash
git clone git@github.com:hamdi-aloulou/ubiBrain.git
cd ubiBrain
git checkout local-demo
```

create a new house for the demo:

```bash
./ubismart.sh
create:<HOUSE_ID>
```

change the config file of the created house

```bash
cd house<HOUSE_ID>
nano config.xml
```

```bash
<?xml version="1.0" encoding="utf-8"?>
<Config>

  <debug>false</debug>

  <house_nb>House[HOUSE_ID]</house_nb>
  <clock_interval_sec>10</clock_interval_sec>

  <start_time>2013-10-17 11:05:08</start_time>
  <end_time>2013-10-22 11:50:10</end_time>

  <real_time>true</real_time>
  <realistic>true</realistic>
  <data_acceleration>1</data_acceleration>
  <uncertainty>false</uncertainty>

  <euler_bin>../common/eye-bin/</euler_bin>
  <euler_common_dir>../common/n3-files/</euler_common_dir>
  <euler_dir>n3-files/</euler_dir>
  <dump_file>dump-ubi.n3</dump_file>
  <euler_kernel>yap</euler_kernel>

  <motion_window_min>1</motion_window_min>
  <evasion_window_min>5</evasion_window_min>

  <mqtt_server>[UBISMART_MACHINE_IP]</mqtt_server>
  <mqtt_port>1883</mqtt_port>
  <mqtt_user>osgi</mqtt_user>
  <mqtt_password>osgi</mqtt_password>
  <mqtt_marmitek_topic>house/[HOUSE_ID]/marmitek/sensor/+</mqtt_marmitek_topic>
  <mqtt_zigbee_topic>house/[HOUSE_ID]/zigbee/sensor/+/event</mqtt_zigbee_topic>
  <mqtt_activities_topic>house/[HOUSE_ID]/activity</mqtt_activities_topic>

</Config>
```

Update n3 files ```house<HOUSE_ID>/n3-files/load-home.n3``` and ```house<HOUSE_ID>/n3-files/load-init.n3``` with resident information and used sensors according to the cconfiguration file in the raspberry Pi.

start the demo house:

```bash
cd ..
./ubismart.sh
start:<HOUSE_ID>
connnect:<HOUSE_ID>
```

# Check the installation

You should now be able to receive sensors events on the senslog viz https://localhost/myservices/senslog?house=[HOUSE_ID] and infered activities on the life viz https://localhost/myservices/life?house=[HOUSE_ID]






