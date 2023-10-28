function calc_expected_value(p) {
    return 1 / p;
}

function calc_variance(p) {
    return (1 - p) / Math.pow(p, 2);
}

function calc_prob(p, x) {
    return p * Math.pow(1 - p, x - 1);
}

export default function calc_dist(p) {
    if (isNaN(p)) {
        return undefined;
    }

    let geometric_dist = {
        expected_value: calc_expected_value(p),
        variance: calc_variance(p),
        probabilities: {},
        cumProb: {}
    }

    let i = 1;
    do {
        geometric_dist.probabilities[i] = calc_prob(p, i);
        i++;
    } while (geometric_dist.probabilities[i - 1] > 0.0000000001);

    for (let key in geometric_dist.probabilities) {
        if (key == 1) {
            geometric_dist.cumProb[key] = geometric_dist.probabilities[key];
        }
        else {
            geometric_dist.cumProb[key] = geometric_dist.cumProb[key - 1] + geometric_dist.probabilities[key];
        }
    }
    
    return geometric_dist;
}