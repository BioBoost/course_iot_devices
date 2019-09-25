---
description: Configuring the Raspberry Pi as a Bluetooth peripheral
title: 02 - Bluetooth on RPi
---

# Chapter 02 - Bluetooth on RPi

<!-- TODO - Introduction in Bluetooth -->

## Bleno

* A Node.js module for implementing BLE (Bluetooth Low Energy) peripherals.
* [https://www.npmjs.com/package/bleno](https://www.npmjs.com/package/bleno)

* bleno provides a very nice node.js wrapper on top of BlueZ
* BlueZ is the Linux Bluetooth protocol stack
  * Steep learning curve

* `bleno` is used to implement peripheral devices
* `noble` can be used to implement a central role

* 1 small problem
  * Not actively maintained

* Solution
  * Use [https://www.npmjs.com/package/@abandonware/bleno](https://www.npmjs.com/package/@abandonware/bleno)

* 1 small problem
  * Depends on [https://www.npmjs.com/package/@abandonware/bluetooth-hci-socket](https://www.npmjs.com/package/@abandonware/bluetooth-hci-socket)
    * Which is not node v12 compatible
    * Pull request is pending: [https://github.com/abandonware/node-bluetooth-hci-socket/pull/5](https://github.com/abandonware/node-bluetooth-hci-socket/pull/5)
    * **Fixed in the meantime !**

* Solution was to install pull request branch first
  * Use [https://github.com/akx/node-bluetooth-hci-socket/tree/node-12](https://github.com/akx/node-bluetooth-hci-socket/tree/node-12)

## Setup bleno on RPi 3

* Used Raspbian Buster Lite 2019-07-10 – kernel v4.19

### Update

Make sure to update apt repository index and upgrade system

```shell
sudo apt update
sudo apt upgrade
```

Need to stop the Bluetooth daemon

```shell
sudo systemctl stop bluetooth
sudo systemctl disable Bluetooth
```

Install dependencies

```shell
sudo apt-get install bluetooth bluez libbluetooth-dev libudev-dev
```

### Setup project dir

* Let's build a simple iBeacon peripheral
  * Beacons transmit small amounts of data via Bluetooth Low Energy (BLE)
  * Are often used for indoor location technology
  * In 2013, Apple introduced their own implementation of Beacons — iBeacons

* Create a directory for you ble projects (on the RPi)

```shell
mkdir -p ~/bluetooth/devices/src
```

* Setup git (create github repo)

```shell
cd ~/bluetooth/devices
git init
git remote add origin git@github.com:....
```

* Create script for iBeacon and also `README.md`

```shell
cd ~/bluetooth/devices
touch src/ibeacon.js
touch README.md
```

* Setup npm package and create package.json

```shell
npm init
```

* Might want to share the bluetooth dir using samba (see Linux course)

<!-- ### Install node-bluetooth-hci-socket

Clone the node-bluetooth-hci-socket package locally in the bluetooth dir and checkout the fix branch (node-12)

```shell
cd ~/bluetooth
git clone https://github.com/akx/node-bluetooth-hci-socket.git
git checkout node-12
```

Install the package inside the devices project

```shell
cd ~/bluetooth/devices
npm install ../node-bluetooth-hci-socket --save
``` -->

### Installing the bleno package

* Now bleno can be installed

```shell
cd ~/bluetooth/devices
npm install @abandonware/bleno@latest --save
```

### iBeacon demo

* Place the following code inside the `ibeacon.js` file

```js
const bleno = require("@abandonware/bleno");

// Set your own UUID
const UUID = "d70e2724-22d8-40d9-8f9a-aa02626d5692";

// Choose a value
const MINOR = 2;

// Choose a value
const MAJOR = 1;

// RSSI at 1m distance (for distance calculation)
const TX_POWER = -60;

console.log("Starting bleno ...");
bleno.on("stateChange", state => {
    if (state === 'poweredOn') {
      console.log("Starting broadcast ...");

      bleno.startAdvertisingIBeacon(UUID, MAJOR, MINOR, TX_POWER, err => {
        if(err) {
          console.error(err);
        } else {
          console.log(`iBeacon uuid: ${UUID}, major: ${MAJOR}, minor: ${MINOR}`);
        }
      });
    } else {
      console.log("Stopping broadcast ...");
      bleno.stopAdvertising();
    }
});
```

Use [https://www.uuidgenerator.net/](https://www.uuidgenerator.net/) to generate a UUID.

* Run script as root:

```shell
sudo node src/ibeacon.js
```

* The tx power param does not actually change the power of the transmission. It is declared and used by receivers to estimate the range from the beacon.
* The UUID, Major and Minor parameters are your iBeacon's identifier and make up the key component of the Advertising packets that are continually transmitted by your Beacons.
* UUID stands for Universally Unique Identifier. The purpose of the ID is to distinguish iBeacons in your network, from all other beacons in networks outside your control.
* Major values are intended to identify and distinguish a group – for example, all beacons in on a certain floor or room in your venue could be assigned a unique major value.
* Minor values are intended to identify and distinguish an individual – for example distinguishing individual beacons within a group of beacons assigned a major value.

### Detecting the iBeacon

You can install a

* beacon app such as [Beacon Scanner by Nicolas Bridoux](https://play.google.com/store/apps/details?id=com.bridou_n.beaconscanner&hl=en)
* or use a general BLE app such as [nRF Connect for Mobile](https://play.google.com/store/apps/details?id=no.nordicsemi.android.mcp&hl=en)

![Beacon Scanner](./img/beacon_scanner.png)