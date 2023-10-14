import calc_binomial_dist from "./binomial_dist.js"
import { graph_dist } from "./graphing.js";

function update_dist() {
    let n = parseInt(document.getElementById("n-trials").value);
    let p = parseFloat(document.getElementById("p-success").value);

    if (!isNaN(n) && !isNaN(p)) {
        graph_dist(calc_binomial_dist(n, p))
    }
}

window.onload = () => {
    document.querySelectorAll(".dist-parameter").forEach((el) => {
        el.addEventListener("change", update_dist);
    })
}