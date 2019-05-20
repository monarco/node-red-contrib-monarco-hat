let monarco = require('monarco-hat');

module.exports = function (RED) {

    function MonarcoHAT_AIN(config) {
        RED.nodes.createNode(this, config);
        let node = this;
        let pin = Number(config.pin);

        if(pin < 1 || pin > 2){
            this.status({fill:"red",shape:"ring",text:"pin is not valid"});
            return;
        }

        function handleData(rxdata) {
            var msg = {
                payload: (pin === 2 ? rxdata.ai2 : rxdata.ai1)                
            };
            node.send(msg);
        }

        monarco.on('rx', handleData);
        this.on('close', function() {
            monarco.removeListener('rx', handleData);
        });
    }
    RED.nodes.registerType("monarco-hat-ain", MonarcoHAT_AIN);
}