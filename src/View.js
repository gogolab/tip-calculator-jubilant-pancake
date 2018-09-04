import * as R from "ramda";
import hh from "hyperscript-helpers";
import { h } from "virtual-dom";

import { billInputMsg, tipInputMsg } from "./Update";

const { div, h1, pre, form, label, input, p } = hh(h);

function tipForm(dispatch) {
    return form({ className: "flex flex-column" }, [
        div({ className: "flex flex-column" }, [
            label({ htmlFor: "bill-input" }, "Bill amount ($)"),
            input({
                type: "text",
                className: "mb2",
                id: "bill-input",
                oninput: e => dispatch(billInputMsg(e.target.value))
            })
        ]),
        div({ className: "flex flex-column" }, [
            label({ htmlFor: "tip-input" }, "Tip (%)"),
            input({
                type: "text",
                className: "mb2",
                id: "tip-input",
                oninput: e => dispatch(tipInputMsg(e.target.value))
            })
        ])
    ]);
}

function summary(model) {
    return div({ className: "" }, [
        p(`Tip: $${model.tip}`),
        p(`Total: $${model.total}`)
    ]);
}

function view(dispatch, model) {
    return div({ className: "mw6 center" }, [
        h1({ className: "f2 pv2 bb" }, "Tip Calculator"),
        tipForm(dispatch),
        summary(model),
        pre(JSON.stringify(model, null, 2))
    ]);
}

export default view;
