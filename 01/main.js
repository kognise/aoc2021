const text = require('fs').readFileSync('input.txt').toString()
const numbers = text.split('\n').map((line) => parseInt(line, 10))

const windows = (xs, n) => {
    if (n > xs.length) return xs
    const result = []
    for (let i = 0; i <= xs.length - n; i++) {
        result.push(xs.slice(i, i + n))
    }
    return result
}

const tripleSums = windows(numbers, 3).map((triple) => triple.reduce((a, b) => a + b, 0))

let sum = 0
let previous = 696969696969696969

for (const item of tripleSums) {
    if (item > previous) sum++
    previous = item
}

console.log(sum)