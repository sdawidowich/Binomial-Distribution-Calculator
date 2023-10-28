import { calc_combinations_log10 } from "../math.js";

function calc_expected_value(r, p) {
    return r / p;
}

function calc_variance(r, p) {
    return (r * (1 - p)) / Math.pow(p, 2);
}

function calc_prob(r, p, x) {
    return Math.pow(10, calc_combinations_log10(x - 1, r - 1) +  Math.log10(Math.pow(p, r) * Math.pow(1 - p, x - r)));
}

export default function calc_dist(r, p) {
    if (isNaN(r) || isNaN(p)) {
        return undefined;
    }

    let neg_binomial_dist = {
        expected_value: calc_expected_value(r, p),
        variance: calc_variance(r, p),
        probabilities: {},
        cumProb: {}
    }

    let i = r;
    do {
        neg_binomial_dist.probabilities[i] = calc_prob(r, p, i);
        i++;
    } while (neg_binomial_dist.probabilities[i - 1] > 0.0000000001);

    for (let key in neg_binomial_dist.probabilities) {
        if (key == r) {
            neg_binomial_dist.cumProb[key] = neg_binomial_dist.probabilities[key];
        }
        else {
            neg_binomial_dist.cumProb[key] = neg_binomial_dist.cumProb[key - 1] + neg_binomial_dist.probabilities[key];
        }
    }
    
    return neg_binomial_dist;
}