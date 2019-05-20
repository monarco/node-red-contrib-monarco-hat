let monarco = require('monarco-hat');

module.exports = function (RED) {

    function MonarcoHAT_DOUT(config) {
        RED.nodes.createNode(this, config);
        let node = this;
        let pin = Number(config.pin);
        if(pin < 1 || pin > 4){
            this.status({fill:"red",shape:"ring",text:"pin is not valid"});
            return;
        }

        this.on('input', function(msg) {
            let payload = msg.payload;
            let value = false;
            if(payload === true || payload === "true"){
                value = true;
            }
            monarco.digitalOutputs[pin - 1] = value;
        });       
    }
    RED.nodes.registerType("monarco-hat-dout", MonarcoHAT_DOUT);
}