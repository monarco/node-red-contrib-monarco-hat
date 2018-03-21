let monarco = require('monarco');

module.exports = function (RED) {

    function MonarcoHAT_PWM(config) {
        RED.nodes.createNode(this, config);
        let node = this;
        let mod = Number(config.module);
        if (mod < 1 || mod > 2) {
            this.status({
                fill: "red",
                shape: "ring",
                text: "module is not valid"
            });
            return;
        }
        let channel = config.channel;

        let channelValid = true;
        if (mod === 1) {
            if (channel != 'a' && channel != 'b' && channel != 'c') {
                channelValid = false;
            }
        } else {
            if (channel != 'a') {
                channelValid = false;
            }
        }

        if (!channelValid) {
            this.status({
                fill: "red",
                shape: "ring",
                text: "channel is not valid"
            });
            return;
        }
        this.on('input', function (msg) {
            let payload = msg.payload;
            let value = Number(payload);
            if (mod === 1) {
                switch (channel) {
                    case 'a':
                        monarco.pwm1a = value;
                        break;
                    case 'b':
                        monarco.pwm1b = value;
                        break;
                    case 'c':
                        monarco.pwm1c = value;
                        break;
                    default:
                        break;
                }
            } else {
                if (mod === 2 && channel === 'a') {
                    monarco.pwm2a = value;
                }
            }
        });
    }
    RED.nodes.registerType("monarco-hat-pwm", MonarcoHAT_PWM);
}