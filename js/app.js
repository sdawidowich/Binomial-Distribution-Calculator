import change_dist_type from "./change_dist_type.js";
import update_dist from "./update_dist.js";

window.onload = () => {
    change_dist_type();
    update_dist();
    document.querySelectorAll(".dist-parameter, .dist-val-input").forEach((el) => {
        el.addEventListener("change", update_dist);
    });
    document.getElementById("dist-type").addEventListener("change", change_dist_type);
    document.querySelector(".input-tooltip > .icon").addEventListener("click", (e) => e.currentTarget.classList.toggle("clicked"));
}