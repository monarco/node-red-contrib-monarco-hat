# node-red-contrib-monarco-hat - Node-RED driver library for Monarco HAT

Compatible Monarco HAT firmware version: 2.006

### Getting started

#### Install prerequisites
Install required build-dependencies on your Raspbian running on Raspberry Pi:
```
sudo apt update
sudo apt install build-essential 
```
Install Node.js on your Raspbian running on Raspberry Pi:
```
curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash -
sudo apt install -y nodejs
```
Follow this link for more information: [Installing Node.js via package manager](https://nodejs.org/en/download/package-manager/#debian-and-ubuntu-based-linux-distributions)

Install Node-RED:
```
sudo npm install -g --unsafe-perm node-red
```
Follow this link for more information: [Node-RED Installation](https://nodered.org/docs/getting-started/installation)

#### Install library
Run the following command in the root directory of your Node-RED install:
```
cd ~/.node-red
npm install node-red-contrib-monarco-hat
```

#### Example flow
Try out [this flow](https://flows.nodered.org/flow/b798499fe802ac146fe9539ab787b620) to see all the nodes of this library in action.

## License

node-red-contrib-monarco-hat and examples provided in this repository are covered by the BSD 3-Clause License. See LICENSE.txt or https://opensource.org/licenses/BSD-3-Clause

Copyright REX Controls s.r.o. http://www.rexcontrols.com, Author: Jiri Faist, <faist@rexcontrols.com>