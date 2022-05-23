export default function luDecomposition(mat: number[][], n: number) {
  let lower = Array(n).fill(0).map(
    () => Array(n).fill(0));
  let upper = Array(n).fill(0).map(
    () => Array(n).fill(0));

  // Decomposing matrix into Upper and
  // Lower triangular matrix
  for (let i = 0; i < n; i++) {

    // Upper Triangular
    for (let k = i; k < n; k++) {

      // Summation of L(i, j) * U(j, k)
      let sum = 0;
      for (let j = 0; j < i; j++)
        sum += (lower[i][j] * upper[j][k]);

      // Evaluating U(i, k)
      upper[i][k] = mat[i][k] - sum;
    }

    // Lower Triangular
    for (let k = i; k < n; k++) {
      if (i == k)

        // Diagonal as 1
        lower[i][i] = 1;
      else {

        // Summation of L(k, j) * U(j, i)
        let sum = 0;
        for (let j = 0; j < i; j++)
          sum += (lower[k][j] * upper[j][i]);

        // Evaluating L(k, i)
        lower[k][i] = (mat[k][i] - sum) / upper[i][i];
      }
    }
  }

  return { lower, upper };
}
