export function calc_combinations_log10(n, k) {
    let x = Math.log10(1);
    let y = Math.log10(1);
    for (let i = n, j = 1; i > (n - k); i--, j++) {
        x += Math.log10(i);
        y += Math.log10(j);
    }
    return x - y;
}

export function fact_log10(n) {
    let fact = Math.log10(1);
    for (let i = 2; i <= n; i++) {
        fact += Math.log10(i);
    }

    return fact;
}

export function round(val, precision) {
    return parseFloat(val.toFixed(precision));
}