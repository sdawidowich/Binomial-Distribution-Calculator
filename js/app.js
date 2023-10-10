window.onload = () => {
    document.querySelectorAll(".dist-parameter").forEach((el) => {
        el.addEventListener("change", calc_binomial_dist);
    })
}