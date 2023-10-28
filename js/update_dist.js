import calc_binomial_dist from "./dist-calculators/binomial_dist.js"
import calc_geometric_dist from "./dist-calculators/geometric_dist.js"
import calc_neg_binomial_dist from "./dist-calculators/neg_binomial_dist.js"
import calc_hypergeometric_dist from "./dist-calculators/hypergeometric_dist.js"
import calc_poisson_dist from "./dist-calculators/poisson_dist.js"

import download from "./download.js";
import { graph_dist } from "./graphing.js";
import { create_td, get_dist_type, get_dist_val, get_prob_data_blob } from "./helper_funcs.js";
import { round } from "./math.js";

function update_table(table, probabilities) {
    let newRows = [];
    for (let key in probabilities) {
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

function update_download_files(dist) {
    let blob = get_prob_data_blob(dist);
    document.getElementById("probDownloadBtn").onclick = () => download("probData.csv", blob.probText);
    document.getElementById("cumProbDownloadBtn").onclick = () => download("cumProbData.csv", blob.cumProbText);
}

export default function update_dist() {
    let dist_type = get_dist_type();
    let dist = undefined;

    if (dist_type == "Binomial") {
        let n = parseInt(document.getElementById("n-trials").value);
        let p = parseFloat(document.getElementById("p-success").value);

        dist = calc_binomial_dist(n, p);
    }
    else if (dist_type == "Geometric") {
        let p = parseFloat(document.getElementById("p-success").value);

        dist = calc_geometric_dist(p);
    }
    else if (dist_type == "Negative Binomial") {
        let r = parseInt(document.getElementById("r-successes").value);
        let p = parseFloat(document.getElementById("p-success").value);

        dist = calc_neg_binomial_dist(r, p);
    }
    else if (dist_type == "Hypergeometric") {
        let N = parseInt(document.getElementById("N-population").value);
        let n = parseInt(document.getElementById("n-sample").value);
        let r = parseInt(document.getElementById("r-pop-successes").value);

        dist = calc_hypergeometric_dist(N, n, r);
    }
    else if (dist_type == "Poisson") {
        let lambda = parseFloat(document.getElementById("lambda-average").value);

        dist = calc_poisson_dist(lambda);
    }

    if (dist) {
        graph_dist(dist);
        update_table(document.getElementById("prob-table"), dist.probabilities);
        update_table(document.getElementById("cum-prob-table"), dist.cumProb);
        update_dist_value(dist);
        update_dist_properties(dist);
        update_download_files(dist);
    }
}