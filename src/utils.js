export const toFraction = (dec) => {
  if (isNaN(dec)) return [NaN, NaN]

  let done = false
  let n1 = 0, d1 = 1, n2 = 1, d2 = 0, n = 0, q = dec, epsilon = 1e-13, num, den
  while (!done) {
    n++
    if (n > 10000) {
      done = true
    }
    let a = parseInt(q)
    num = n1 + a * n2
    den = d1 + a * d2
    let e = (q - a)
    if (e < epsilon) {
      done = true
    }
    q = 1 / e
    n1 = n2
    d1 = d2
    n2 = num
    d2 = den
    if (Math.abs(num / den - dec) < epsilon || n > 30) {
      done = true
    }
  }
  if(num === 0) den = 0
  return [num, den]
}

export const calc = {
  '+': (x, y) => x + y,
  '-': (x, y) => x - y,
  '/': (x, y) => x / y,
  '*': (x, y) => x * y
}

export function randomStr (len = 5, arr = '12345abcde') {
  let ans = ''
  for (let i = len; i > 0; i--) {
    ans +=
      arr[Math.floor(Math.random() * arr.length)]
  }
  return ans
}
