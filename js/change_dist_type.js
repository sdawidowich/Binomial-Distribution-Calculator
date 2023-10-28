import { get_dist_type } from "./helper_funcs.js";
import update_dist from "./update_dist.js";

function create_numeric_input(labelTxt, min = undefined, max = undefined, step = undefined, id) {
    let newInput = document.createElement("div");
    newInput.classList.add("input-container");
    
    let labelEl = document.createElement("label");
    labelEl.setAttribute("for", id);
    labelEl.textContent = labelTxt;
    let inputEl = document.createElement("input");
    inputEl.setAttribute("type", "number");
    inputEl.setAttribute("class", "dist-parameter");
    if (min != undefined) inputEl.setAttribute("min", min);
    if (max != undefined) inputEl.setAttribute("max", max);
    if (step != undefined) inputEl.setAttribute("step", step);
    inputEl.setAttribute("id", id)

    newInput.append(labelEl);
    newInput.append(inputEl);
    return newInput;
}

export default function change_dist_type() {
    let dist_type = get_dist_type();
    
    document.querySelector("h1").textContent = dist_type + " Distribution Calculator";

    let n_trials = create_numeric_input("n", 0, undefined, 1, "n-trials");
    let p_success = create_numeric_input("p", 0, 1, 0.01, "p-success");
    let r_successes = create_numeric_input("r", 1, undefined, 1, "r-successes");
    let N_population = create_numeric_input("N", 0, undefined, 1, "N-population");
    let n_sample = create_numeric_input("n", 0, undefined, 1, "n-sample");
    let r_pop_successes = create_numeric_input("r", 0, undefined, 1, "r-pop-successes");
    let lambda_average = create_numeric_input("λ", 0, 7, 0.01, "lambda-average");

    let newParameters = [n_trials, p_success];
    if (dist_type == "Geometric") {
        newParameters = [p_success];
    }
    else if (dist_type == "Negative Binomial") {
        newParameters = [r_successes, p_success];
    }
    else if (dist_type == "Hypergeometric") {
        newParameters = [N_population, n_sample, r_pop_successes];
    }
    else if (dist_type == "Poisson") {
        newParameters = [lambda_average];
    }

    document.querySelector(".dist-parameters").replaceChildren(...newParameters);
    document.querySelectorAll(".dist-parameter, .dist-val-input").forEach((el) => {
        el.addEventListener("change", update_dist);
    });
}