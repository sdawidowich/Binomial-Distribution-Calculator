import update_dist from "./update_dist.js";

window.onload = () => {
    document.querySelectorAll(".dist-parameter").forEach((el) => {
        el.addEventListener("change", update_dist);
    })
}