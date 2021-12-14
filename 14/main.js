const text = require('fs').readFileSync('input.txt').toString()
const [ p1, p2 ] = text.split('\n\n')
const rules = p2.split('\n').map((line) => line.split(' -> '))

let pairs = {}
for (let i = 1; i < p1.length; i++) {
	const key = p1[i - 1] + p1[i]
	pairs[key] = (pairs[key] ?? 0) + 1
}

for (let i = 0; i < 40; i++) {
	const newPairs = { ...pairs }
	for (const [ match, ins ] of rules) {
		if (!pairs[match]) continue
		
		newPairs[match[0] + ins] = (newPairs[match[0] + ins] ?? 0) + pairs[match]
		newPairs[ins + match[1]] = (newPairs[ins + match[1]] ?? 0) + pairs[match]
		newPairs[match] = newPairs[match] - pairs[match]
	}
	pairs = newPairs
}

const chars = {}
for (const [ [ c1, c2 ], count ] of Object.entries(pairs)) {
	chars[c1] = (chars[c1] ?? 0) + count
	chars[c2] = (chars[c2] ?? 0) + count
}
const highest = Math.ceil(Object.values(chars).reduce((a, b) => Math.max(a, b)) / 2)
const lowest = Math.ceil(Object.values(chars).reduce((a, b) => Math.min(a, b)) / 2)
console.log(highest - lowest)