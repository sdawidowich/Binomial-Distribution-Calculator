import calc_binomial_dist from "./binomial_dist.js"
import { graph_dist } from "./graphing.js";

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

export default function update_dist() {
    let n = parseInt(document.getElementById("n-trials").value);
    let p = parseFloat(document.getElementById("p-success").value);

    if (!isNaN(n) && !isNaN(p)) {
        let dist = calc_binomial_dist(n, p);
        graph_dist(dist);
        update_table(document.getElementById("prob-table"), dist.probabilities);
        update_table(document.getElementById("cum-prob-table"), dist.cumProb);
    }
}