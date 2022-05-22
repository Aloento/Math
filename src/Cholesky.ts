/**
 * @param matrix A square matrix
 * @returns triangular matrix
 */
export default function Cholesky(matrix: number[][]): number[][] {
  let len = matrix.length, res = Array(len)
  if (matrix.length !== matrix[len - 1].length)
    throw Error('Input matrix must be square or lower triangle')

  res[0] = [Math.sqrt(matrix[0][0])]

  for (let i = 1; i < len; ++i) {
    res[i] = Array(i + 1) // lower triangle
    for (let j = 0; j < i; ++j) {
      res[i][j] = delta(matrix[i][j], res, i, j) / res[j][j]
    }
    res[i][i] = Math.sqrt(delta(matrix[i][i], res, i, i))
  }

  return res
}

/**
 * Sum{k=1..j-1} Lik*Ljk
 */
function delta(aij: number, res: number[][], i: number, j: number) {
  for (var k = 0, sum = aij; k < j; ++k)
    if (res[i][k])
      sum -= res[i][k] * res[j][k]

  return sum
}
