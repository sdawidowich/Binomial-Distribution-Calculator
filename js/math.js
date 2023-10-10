function calc_combinations(n, k) {
    let x = 1;
    let y = 1;
    for (let i = n, j = 1; i > (n - k); i--, j++) {
        x *= i;
        y *= j;
    }
    return x / y;
}