import { fact_log10 } from "../math.js";

function calc_expected_value(lambda) {
    return lambda;
}

function calc_variance(lambda) {
    return lambda;
}

function calc_prob(lambda, x) {
    return Math.pow(10, Math.log10(Math.pow(lambda, x) * Math.pow(Math.E, -1 * lambda)) - fact_log10(x));
}

export default function calc_dist(lambda) {
    if (isNaN(lambda)) {
        return undefined;
    }

    let poisson_dist = {
        expected_value: calc_expected_value(lambda),
        variance: calc_variance(lambda),
        probabilities: {},
        cumProb: {}
    }

    let i = 0;
    do {
        poisson_dist.probabilities[i] = calc_prob(lambda, i);
        i++;
    } while (poisson_dist.probabilities[i - 1] > 0.0000000001);

    for (let key in poisson_dist.probabilities) {
        if (key == 0) {
            poisson_dist.cumProb[key] = poisson_dist.probabilities[key];
        }
        else {
            poisson_dist.cumProb[key] = poisson_dist.cumProb[key - 1] + poisson_dist.probabilities[key];
        }
    }
    
    return poisson_dist;
}