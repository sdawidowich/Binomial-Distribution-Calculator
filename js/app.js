import calc_binomial_dist from "./binomial_dist.js"

window.onload = () => {
    document.querySelectorAll(".dist-parameter").forEach((el) => {
        el.addEventListener("change", calc_binomial_dist);
    })
}