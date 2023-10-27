import calc_binomial_dist from "./binomial_dist.js"
import { graph_dist } from "./graphing.js";
import { create_td, get_dist_val } from "./helper_funcs.js";
import { round } from "./math.js";

function update_table(table, probabilities) {
    let newRows = [];
    for (let key in Object.keys(probabilities)) {
        let newRow = document.createElement("tr");
        newRow.append(create_td(key));
        newRow.append(create_td((probabilities[key]).toFixed(6)));
        newRows.push(newRow);
    }
    table.querySelector("tbody").replaceChildren(...newRows);
}

function update_dist_value(dist) {
    let output_el = document.querySelector(".value-output");
    let dist_val = get_dist_val(dist);
    if (!dist_val) {
        output_el.textContent = "Undefined";
        return;
    }

    output_el.textContent = dist_val.val;
}

function update_dist_properties(dist) {
    let precision = 6;
    document.getElementById("ev-value").textContent = round(dist.expected_value, precision);
    document.getElementById("var-value").textContent = round(dist.variance, precision);
    document.getElementById("sd-value").textContent = round(Math.sqrt(dist.variance), precision);
}

export default function update_dist() {
    let n = parseInt(document.getElementById("n-trials").value);
    let p = parseFloat(document.getElementById("p-success").value);

    if (!isNaN(n) && !isNaN(p)) {
        let dist = calc_binomial_dist(n, p);
        graph_dist(dist);
        update_table(document.getElementById("prob-table"), dist.probabilities);
        update_table(document.getElementById("cum-prob-table"), dist.cumProb);
        update_dist_value(dist);
        update_dist_properties(dist);
    }
}