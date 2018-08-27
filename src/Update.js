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

function calculateTotal(bill, tip) {
    return bill * (1 + tip / 100);
}

function calculateTip(bill, tip) {
    return bill * (tip / 100);
}

function update(msg, model) {
    switch (msg.type) {
        case MSGS.BILL_INPUT_CHANGED: {
            return {
                ...model,
                billInput: msg.billInput,
                total: calculateTotal(msg.billInput, model.tipInput),
                tip: calculateTip(msg.billInput, model.tipInput)
            };
        }
        case MSGS.TIP_INPUT_CHANGED: {
            return {
                ...model,
                tipInput: msg.tipInput,
                total: calculateTotal(model.billInput, msg.tipInput),
                tip: calculateTip(model.billInput, msg.tipInput)
            };
        }

        default: {
            console.log("bad message");
            return model;
        }
    }
}

export default update;
