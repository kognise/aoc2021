const text = require('fs').readFileSync('input.txt').toString()
const lines = text.split('\n')

const closing = {
	'(': ')',
	'{': '}',
	'[': ']',
	'<': '>'
}

const scores = []
outer: for (const line of lines) {
	const pairs = []
	for (const char of line) {
		if (closing[char])
			pairs.push(closing[char])
		else if (pairs.pop() !== char)
			continue outer
	}

	let score = 0
	for (const end of pairs.reverse()) {
		score *= 5
		score += ({ ')': 1, ']': 2, '}': 3, '>': 4 })[end]
	}
	scores.push(score)
}
console.log(scores.sort((a, b) => a - b)[Math.floor(scores.length / 2)])