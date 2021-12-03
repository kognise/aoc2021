const text = require('fs').readFileSync('input.txt').toString()

const countPositions = (numbers) => {
    const positions = {}
    for (const number of numbers) {
        for (let i = 0; i < number.length; i++) {
            if (!positions[i]) positions[i] = {}
            positions[i][number[i]] = positions[i][number[i]] ? positions[i][number[i]] + 1 : 1
        }
    }
    return positions
}

let numbers = text.split('\n').map((line) => line.split(''))
let i = 0
let rating
while (!rating) {
    const positions = countPositions(numbers)
    const temp = numbers.filter((number) => {
        // Change this to > or whatever for oxygen rating
        const filter = positions[i]['0'] <= positions[i]['1'] ? '0' : '1'
        if (number[i] !== filter) return false
        return true
    })
    if (temp.length === 1) rating = temp[0]
    numbers = temp
    i++
}
console.log(rating.join(''))