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

const round = (num, places) => {
    num = num * Math.pow(10, places);
    num = Math.round(num);
    num = num * Math.pow(10, -1 * places);
    return num;
};

function calculateTotal(bill, tip) {
    const result = bill * (1 + tip / 100) || 0;
    return round(result, 2).toFixed(2);
}

function calculateTip(bill, tip) {
    const result = bill * (tip / 100) || 0;
    return round(result, 2).toFixed(2);
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
