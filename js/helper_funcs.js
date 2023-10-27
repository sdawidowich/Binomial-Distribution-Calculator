export function create_td(value) {
    let td = document.createElement("td");
    td.textContent = value;
    return td;
}

export function get_dist_val(dist) {
    let prob_val = parseInt(document.getElementById("x").value);
    let prob_val_type = document.getElementById("prob-value-select").value;

    let dist_size = Object.keys(dist.probabilities).length;
    if (isNaN(prob_val) || (prob_val + 1) > dist_size || prob_val < 0) {
        return undefined;
    }

    if (prob_val_type == "eqX") {
        return { lowerIndex: prob_val, upperIndex: prob_val, val: dist.probabilities[prob_val].toFixed(6) };
    }
    else if (prob_val_type == "leX") {
        return { lowerIndex: 0, upperIndex: prob_val, val: dist.cumProb[prob_val].toFixed(6) };
    }
    else {
        return { lowerIndex: prob_val, upperIndex: dist_size, val: (1 - dist.cumProb[prob_val - 1].toFixed(6)).toFixed(6) };
    }
}

export function get_prob_data_blob(dist) {
    let blob = { probText: "x,P(X = x)\n", cumProbText: "x,Σ P(X <= x)\n" };
    
    Object.keys(dist.probabilities).forEach((x) => {
        blob.probText += x + "," + dist.probabilities[x].toFixed(16) + "\n";
    });
    Object.keys(dist.cumProb).forEach((x) => {
        blob.cumProbText += x + "," + dist.cumProb[x].toFixed(16) + "\n";
    });

    return blob;
}