let monarco = require('monarco');

module.exports = function (RED) {

    function MonarcoHAT_LED(config) {
        RED.nodes.createNode(this, config);
        let node = this;
        let pin = Number(config.pin);
        if(pin < 1 || pin > 8){
            this.status({fill:"red",shape:"ring",text:"pin is not valid"});
            return;
        }

        this.on('input', function(msg) {
            let payload = msg.payload;
            let value = false;
            if(payload === true || payload === "true"){
                value = true;
            }
            monarco.LEDs[pin - 1].controlled = true;
            monarco.LEDs[pin - 1].value = value;         
        });       
    }
    RED.nodes.registerType("monarco-hat-led", MonarcoHAT_LED);
}