import calc_binomial_dist from "./binomial_dist.js"
import { graph_dist } from "./graphing.js";
import { round } from "./math.js";

function create_td(value) {
    let td = document.createElement("td");
    td.textContent = value;
    return td;
}

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
    let prob_val = document.getElementById("x").value;
    let prob_val_type = document.getElementById("prob-value-select").value;
    let output_el = document.querySelector(".value-output");

    let dist_size = Object.keys(dist.probabilities).length;
    if ((parseInt(prob_val) + 1) > dist_size || parseInt(prob_val) < 0) {
        output_el.textContent = "Undefined";
        return;
    }

    if (prob_val_type == "eqX") {
        output_el.textContent = dist.probabilities[prob_val].toFixed(6);
    }
    else if (prob_val_type == "leX") {
        output_el.textContent = dist.cumProb[prob_val].toFixed(6);
    }
    else {
        output_el.textContent = (1 - dist.cumProb[prob_val - 1]).toFixed(6);
    }
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