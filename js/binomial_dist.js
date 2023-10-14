import { calc_combinations } from "./math.js";

function calc_expected_value(n, p) {
    return n * p;
}

function calc_variance(n, p) {
    return n * p * (1 - p);
}

function calc_prob(n, p, x) {
    return Math.pow(10, calc_combinations(n, x) + Math.log10(Math.pow(p, x)) + Math.log10(Math.pow(1 - p, n - x)));
}

export default function calc_dist(n, p) {
    if (isNaN(n) || isNaN(p)) {
        return;
    }

    let binomial_dist = {
        expected_value: calc_expected_value(n, p),
        variance: calc_variance(n, p),
        probabilities: {},
        cumProb: {}
    }

    for (let i = 0; i <= n; i++) {
        binomial_dist.probabilities[i] = calc_prob(n, p, i);
    }

    binomial_dist.cumProb[0] = binomial_dist.probabilities[0];
    for (let i = 1; i <= n; i++) {
        binomial_dist.cumProb[i] = binomial_dist.cumProb[i - 1] + binomial_dist.probabilities[i];
    }

    console.log(binomial_dist)

    return binomial_dist;
}