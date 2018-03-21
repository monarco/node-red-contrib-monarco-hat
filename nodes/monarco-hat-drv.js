var monarco = require('monarco');

module.exports = function (RED) {

    function MonarcoHAT_Drv(config) {
        RED.nodes.createNode(this, config);
        let node = this;
        let errorCnt = 0;

        let ain_modes = [Number(config.ain1_mode), Number(config.ain2_mode)];
        for (let i = 0; i < 2; i++) {
            if (ain_modes[i] === 0) {
                monarco.setAnalogInputModeToVoltage(i);
            } else {
                monarco.setAnalogInputModeToCurrent(i);
            }
        }

        let cnt_modes = [Number(config.cnt1_mode), Number(config.cnt2_mode)];
        let cnt_registers = [0x1024, 0x1025];
        for (let i = 0; i < 2; i++) {
            let register = cnt_registers[i];
            switch (cnt_modes[i]) {
                case 0:
                    setRegValue(monarco.serviceData, register, monarco.SDC.MONARCO_SDC_COUNTER_MODE_OFF);
                    break;
                case 1:
                    setRegValue(monarco.serviceData, register, monarco.SDC.MONARCO_SDC_COUNTER_MODE_PCNT);
                    break;
                case 2:
                    setRegValue(monarco.serviceData, register, monarco.SDC.MONARCO_SDC_COUNTER_MODE_QUAD);
                    break;
                default:
                    break;
            }
        }

        /* RS485 configuration */
        let SDC_FIXED_RS485BAUD = 0x1010;
        let rs485_baudrate = Number(config.rs485_baudrate);
        switch (rs485_baudrate) {
            case 0:
                setRegValue(monarco.serviceData, SDC_FIXED_RS485BAUD, 12);
                break;
            case 1:
                setRegValue(monarco.serviceData, SDC_FIXED_RS485BAUD, 24);
                break;
            case 2:
                setRegValue(monarco.serviceData, SDC_FIXED_RS485BAUD, 48);
                break;
            case 3:
                setRegValue(monarco.serviceData, SDC_FIXED_RS485BAUD, 96);
                break;
            case 4:
                setRegValue(monarco.serviceData, SDC_FIXED_RS485BAUD, 192);
                break;
            case 5:
                setRegValue(monarco.serviceData, SDC_FIXED_RS485BAUD, 384);
                break;
            case 6:
                setRegValue(monarco.serviceData, SDC_FIXED_RS485BAUD, 576);
                break;
            case 7:
                setRegValue(monarco.serviceData, SDC_FIXED_RS485BAUD, 1152);
                break;
            default:
                setRegValue(monarco.serviceData, SDC_FIXED_RS485BAUD, monarco.SDC.MONARCO_SDC_RS485_DEFAULT_BAUDRATE);
                break;
        }

        let rs485_mode = 0;
        let rs485_parity = Number(config.rs485_parity);
        switch (rs485_parity) {
            case 0:
                rs485_mode = monarco.SDC.MONARCO_SDC_RS485_MODE_PARITY_NONE;
                break;
            case 1:
                rs485_mode = monarco.SDC.MONARCO_SDC_RS485_MODE_PARITY_EVEN;
                break;
            case 2:
                rs485_mode = monarco.SDC.MONARCO_SDC_RS485_MODE_PARITY_ODD;
                break;
            default:
                rs485_mode = monarco.SDC.MONARCO_SDC_RS485_MODE_PARITY_NONE;
                break;
        }

        let rs485_databits = Number(config.rs485_databits);
        switch (rs485_databits) {
            case 0:
                rs485_mode |= monarco.SDC.MONARCO_SDC_RS485_MODE_DATABITS_5;
                break;
            case 1:
                rs485_mode |= monarco.SDC.MONARCO_SDC_RS485_MODE_DATABITS_6;
                break;
            case 2:
                rs485_mode |= monarco.SDC.MONARCO_SDC_RS485_MODE_DATABITS_7;
                break;
            case 3:
                rs485_mode |= monarco.SDC.MONARCO_SDC_RS485_MODE_DATABITS_8;
                break;
            default:
                rs485_mode |= monarco.SDC.MONARCO_SDC_RS485_MODE_DATABITS_8;
                break;
        }

        let rs485_stopbits = Number(config.rs485_stopbits);
        switch (rs485_stopbits) {
            case 0:
                rs485_mode |= monarco.SDC.MONARCO_SDC_RS485_MODE_STOPBITS_0_5;
                break;
            case 1:
                rs485_mode |= monarco.SDC.MONARCO_SDC_RS485_MODE_STOPBITS_1_0;
                break;
            case 2:
                rs485_mode |= monarco.SDC.MONARCO_SDC_RS485_MODE_STOPBITS_1_5;
                break;
            case 3:
                rs485_mode |= monarco.SDC.MONARCO_SDC_RS485_MODE_STOPBITS_2_0;
                break;
            default:
                rs485_mode |= monarco.SDC.MONARCO_SDC_RS485_MODE_STOPBITS_1_0;
                break;
        }

        let pwm1Freq = Number(config.pwm1_freq);
        let pwm2Freq = Number(config.pwm2_freq);

        monarco.pwm1Freq = pwm1Freq;
        monarco.pwm2Freq = pwm2Freq;

        let SDC_FIXED_RS485MODE = 0X1011;
        setRegValue(monarco.serviceData, SDC_FIXED_RS485MODE, rs485_mode);

        /* monarco initialization*/
        monarco.init().then(() => {
            this.status({
                fill: errorCnt === 0 ? "green" : "red",
                shape: "ring",
                text: "Error CNT: " + errorCnt
            });
        }, (err) => {
            this.error("Failed to initialize Monarco HAT driver.");
            this.status({
                fill: "red",
                shape: "ring",
                text: "failed to initialize"
            });
        });

        function handleError(err, buffer) {
            errorCnt++;
            node.error("Monarco HAT: " + err);
            node.status({
                fill: "red",
                shape: "ring",
                text: "Error CNT: " + errorCnt + "; Last error: " + err
            });
            if (buffer) {
                node.error("Buffer: " + buffer);
            }
        }

        function handleWarning(msg) {
            node.warn("Monarco HAT: " + msg);
        }
        monarco.on('err', handleError);
        monarco.on('warn', handleError);

        this.on('close', function (done) {
            monarco.removeListener('err', handleError);
            monarco.close(done);
        });
    }
    RED.nodes.registerType("monarco-hat-drv", MonarcoHAT_Drv);
}

function setRegValue(registers, id, value) {
    for (var itm of registers) {
        if (itm.register === id) {
            return itm.value = value;
        }
    }
}