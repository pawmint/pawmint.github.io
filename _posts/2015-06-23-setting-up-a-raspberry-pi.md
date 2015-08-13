---
layout: page
title: "Setting up a Raspberry Pi"
category: setting_up_our_platform
date: 2015-06-23 12:00:00
---

# Setting up a Raspberry Pi

## How to run the setup script


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

You now have everything you need to make the marmitek-gw work, and can go on to the next part: [Setting up the Gateway] (http://pawmint.github.io/techntuts/setting-up-the-gateway/). But before you do...

### Save an image of the setup

It is a last step, but in order to improve and facilitate installation process we should burn the image of complete system with all packages.
Remove the SD card and reinsert in PC. Then verify the size of its partition with df -h, as you did earlier. dd command duplicates partition into bootable image, 


```        

sudo dd bs=<byte size> if=<source> of=<target> count=<number of blocks> 
source= partition on the SD-card, 
target=name_of_iso_image where the data gets written. 
bs=byte size per block 
count=number of blocks 

```     
   
So, for example, if our partition size=2,9 Gb, bs=1M count=3000 
   
```

sudo dd bs=1M if=/dev/mmcblk0 of=/home/newraspberry/raspberry.img count=3000 

```

DONE!!!
