let monarco = require('monarco-hat');

module.exports = function (RED) {

    function MonarcoHAT_AOUT(config) {
        RED.nodes.createNode(this, config);
        let node = this;
        let pin = Number(config.pin);
        if (pin < 1 || pin > 2) {
            this.status({
                fill: "red",
                shape: "ring",
                text: "pin is not valid"
            });
            return;
        }

        this.on('input', function (msg) {
            let payload = msg.payload;
            if (typeof (payload) === 'number') {
                monarco.analogOutputs[pin - 1] = payload;
            }
        });
    }
    RED.nodes.registerType("monarco-hat-aout", MonarcoHAT_AOUT);
}