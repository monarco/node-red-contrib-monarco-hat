var monarco = require('monarco');

module.exports = function (RED) {

    function MonarcoHAT_DIN(config) {
        RED.nodes.createNode(this, config);
        let node = this;
        let pin = Number(config.pin);
        if(pin < 1 || pin > 4){
            this.status({fill:"red",shape:"ring",text:"pin is not valid"});
            return;
        }

        function handleData(rxdata) {
            if (pin - 1 > rxdata.digitalInputs.length) {
                return;
            }
            var msg = {
                payload: rxdata.digitalInputs[pin - 1]
            };
            node.send(msg);
        }

        monarco.on('rx', handleData);
        this.on('close', function() {
            monarco.removeListener('rx', handleData);
        });
    }
    RED.nodes.registerType("monarco-hat-din", MonarcoHAT_DIN);
}