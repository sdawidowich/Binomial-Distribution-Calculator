import { calc_combinations_log10 } from "../math.js";

function calc_expected_value(N, n, r) {
    return (n * r) / N;
}

function calc_variance(N, n, r) {
    return n * (r / N) * ((N - r) / N) * ((N - n) / (N - 1));
}

function calc_prob(N, n, r, x) {
    return Math.pow(10, calc_combinations_log10(r, x) +  calc_combinations_log10(N - r, n - x) - calc_combinations_log10(N, n));
}

export default function calc_dist(N, n, r) {
    if (isNaN(N) || isNaN(n) || isNaN(r)) {
        return undefined;
    }

    let hypergeometric_dist = {
        expected_value: calc_expected_value(N, n, r),
        variance: calc_variance(N, n, r),
        probabilities: {},
        cumProb: {}
    }

    let start = Math.max(n - ( N - r), 0);
    let end = Math.min(n, r);

    for (let i = start; i <= end; i++) {
        hypergeometric_dist.probabilities[i] = calc_prob(N, n, r, i);
    }

    hypergeometric_dist.cumProb[start] = hypergeometric_dist.probabilities[start];
    for (let i = start + 1; i <= end; i++) {
        hypergeometric_dist.cumProb[i] = hypergeometric_dist.cumProb[i - 1] + hypergeometric_dist.probabilities[i];
    }
    
    return hypergeometric_dist;
}