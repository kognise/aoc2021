const text = require('fs').readFileSync('input.txt').toString()
const numbers = text.split(',').map(Number)

// Find the smallest addition/subtraction to each number required to make all the numbers equal
const max = numbers.reduce((a, b) => Math.max(a, b))
const min = numbers.reduce((a, b) => Math.min(a, b))

let current = 12312321312

// Hell
for (let i = min; i <= max; i++) {
	let steps = 0
	
	for (let j = 0; j < numbers.length; j++) {
		let count = 1
		for (let x = 0; x < Math.abs(i - numbers[j]); x++) {
			steps += count 
			count++
		}
		if (steps > current) {
			break
		}
	}

	if (steps < current) {
		current = steps
	}
}

console.log(current)