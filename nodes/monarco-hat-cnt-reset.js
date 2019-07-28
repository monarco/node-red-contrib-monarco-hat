let monarco = require('monarco-hat');

module.exports = function (RED) {

    function MonarcoHAT_CNT_RESET(config) {
        RED.nodes.createNode(this, config);
        let node = this;
        let pin = Number(config.pin);

        if(pin < 1 || pin > 2){
            this.status({fill:"red",shape:"ring",text:"pin is not valid"});
            return;
        }

        node.on('input', function(msg) {
            if(msg.payload === true){
                monarco['cnt' + pin + 'reset'] = true;
            } else {
                monarco['cnt' + pin + 'reset'] = false;
            }
        });

    }
    RED.nodes.registerType("monarco-hat-cnt-reset", MonarcoHAT_CNT_RESET);
}