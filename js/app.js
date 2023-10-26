import update_dist from "./update_dist.js";

window.onload = () => {
    update_dist();
    document.querySelectorAll(".dist-parameter, .dist-val-input").forEach((el) => {
        el.addEventListener("change", update_dist);
    });
}