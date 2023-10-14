export function calc_combinations(n, k) {
    let x = Math.log10(1);
    let y = Math.log10(1);
    for (let i = n, j = 1; i > (n - k); i--, j++) {
        x += Math.log10(i);
        y += Math.log10(j);
    }
    return x - y;
}