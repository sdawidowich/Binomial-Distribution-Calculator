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

function create_p_element(text) {
    let p = document.createElement("p");
    p.textContent = text;
    return p;
}

export default function change_dist_type() {
    let dist_type = get_dist_type();
    
    document.querySelector("h1").textContent = dist_type + " Distribution Calculator";

    // Create input elements
    let inputs = {
        n_trials: () => create_numeric_input("n", 0, undefined, 1, "n-trials"),
        p_success: () => create_numeric_input("p", 0, 1, 0.01, "p-success"),
        r_successes: () => create_numeric_input("r", 1, undefined, 1, "r-successes"),
        N_population: () => create_numeric_input("N", 0, undefined, 1, "N-population"),
        n_sample: () => create_numeric_input("n", 0, undefined, 1, "n-sample"),
        r_pop_successes: () => create_numeric_input("r", 0, undefined, 1, "r-pop-successes"),
        lambda_average: () => create_numeric_input("λ", 0, 100, 0.01, "lambda-average")
    };
    
    let tooltips = {
        n_trials: () => create_p_element("n = the number of trials in the experiment."),
        p_success: () => create_p_element("p = the probability of a success in any given trial."),
        r_successes: () => create_p_element("r = the # of successes."),
        N_population: () => create_p_element("N = the # in the population."),
        n_sample: () => create_p_element("n = the # in the sample."),
        r_pop_successes: () => create_p_element("r = the # of successes in the population."),
        lambda_average: () => create_p_element("λ = the mean number of successes.")
    };
    

    let newParameters = [inputs.n_trials(), inputs.p_success()];
    let newInputTooltip = [create_p_element("X ~ B(n, p)"), tooltips.n_trials(), tooltips.p_success(), create_p_element("P(X = x) = Probability you get x successes in n trials.")];
    if (dist_type == "Geometric") {
        newParameters = [inputs.p_success()];
        newInputTooltip = [create_p_element("X ~ Geo(p)"), tooltips.p_success(), create_p_element("P(X = x) = Probability it takes x trials to get 1st success.")];
    }
    else if (dist_type == "Negative Binomial") {
        newParameters = [inputs.r_successes(), inputs.p_success()];
        newInputTooltip = [create_p_element("X ~ NB(r, p)"), tooltips.r_successes(), tooltips.p_success(), create_p_element("P(X = x) = Probability it takes x trials to get rth success.")];
    }
    else if (dist_type == "Hypergeometric") {
        newParameters = [inputs.N_population(), inputs.n_sample(), inputs.r_pop_successes()];
        newInputTooltip = [create_p_element("X ~ H(N, n, r)"), tooltips.N_population(), tooltips.n_sample(), tooltips.r_pop_successes(), create_p_element("P(X = x) = Probability you get x successes in a sample of n trials from a population of N trials and r successes.")];
    }
    else if (dist_type == "Poisson") {
        newParameters = [inputs.lambda_average()];
        newInputTooltip = [create_p_element("X ~ Pois(λ)"), tooltips.lambda_average(), create_p_element("P(X = x) = Probability you x successes given the mean successes.")];
    }

    document.querySelector(".dist-parameters").replaceChildren(...newParameters);
    document.querySelector(".input-tooltip > .text").replaceChildren(...newInputTooltip);
    document.querySelectorAll(".dist-parameter, .dist-val-input").forEach((el) => {
        el.addEventListener("change", update_dist);
    });
}