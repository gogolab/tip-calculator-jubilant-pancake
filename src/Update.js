import * as R from "ramda";

const MSGS = {
    BILL_INPUT_CHANGED: "BILL_INPUT_CHANGED",
    TIP_INPUT_CHANGED: "TIP_INPUT_CHANGED"
};

export function billInputMsg(value) {
    return {
        type: MSGS.BILL_INPUT_CHANGED,
        billInput: value
    };
}

export function tipInputMsg(value) {
    return {
        type: MSGS.TIP_INPUT_CHANGED,
        tipInput: value
    };
}

function update(msg, model) {
    switch (msg.type) {
        case MSGS.BILL_INPUT_CHANGED: {
            return {
                ...model,
                billInput: msg.billInput,
                total: msg.billInput * (1 + model.tipInput / 100),
                tip: msg.billInput * (model.tipInput / 100)
            };
        }
        case MSGS.TIP_INPUT_CHANGED: {
            return {
                ...model,
                tipInput: msg.tipInput,
                total: model.billInput * (1 + msg.tipInput / 100),
                tip: model.billInput * (msg.tipInput / 100)
            };
        }

        default: {
            console.log("bad message");
            return model;
        }
    }
}

export default update;
