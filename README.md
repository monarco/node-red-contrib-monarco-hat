# node-red-contrib-monarco-hat - Node-RED driver library for Monarco HAT

Compatible Monarco HAT firmware version: 2.006 and newer

Tested on: Raspbian 2019-07-10 (Full and Lite)

### Getting started

#### Install prerequisites
Install required build-dependencies on your Raspbian running on Raspberry Pi:

```
sudo apt update
sudo apt install build-essential 
```

Install Node-RED, node.js and npm on your Raspberry Pi:

```
bash <(curl -sL https://raw.githubusercontent.com/node-red/raspbian-deb-package/master/resources/update-nodejs-and-nodered)
```

_For the curious, here are the details: [Running Node-RED on Raspberry Pi](https://nodered.org/docs/getting-started/raspberrypi)._

#### Start Node-RED
Start the Node-RED system service:

```
node-red-start
```

#### Install Monarco HAT nodes
Point your web browser (Firefox or Chrome) to e.g. http://192.168.1.100:1880 to open the Node-RED flow editor.Make sure to use the IP address of your Raspberry Pi. 

Select the Manage Palette option from the main menu to open the Palette Manager. The _Install_ tab lets you search the catalogue of available node modules and install them. Find the _node-red-contrib-monarco-hat_ palette and install it.

#### Done
You can now use the I/Os of the Monarco HAT in Node-RED.

### Example flow
Try out [this flow](https://flows.nodered.org/flow/b798499fe802ac146fe9539ab787b620) to see all the nodes of this library in action.

### Starting Node-RED automatically
If you want your flows to start automatically on system startup, run the following command:

```
sudo systemctl enable nodered.service
```

## License

node-red-contrib-monarco-hat and examples provided in this repository are covered by the BSD 3-Clause License. See LICENSE.txt or https://opensource.org/licenses/BSD-3-Clause

Copyright REX Controls s.r.o. http://www.rexcontrols.com, Author: Jiri Faist, <faist@rexcontrols.com>
