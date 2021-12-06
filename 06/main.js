const text = require('fs').readFileSync('input.txt').toString()
const startState = text.split(',').map(Number)

let state = {}
for (const num of startState) {
	state[num] = (state[num] ?? 0) + 1
}

for (let i = 0; i < 256; i++) {
	const newState = {}
	for (const [ key, count ] of Object.entries(state)) {
		const num = parseInt(key)
		if (num === 0) {
			newState[8] = count
			newState[6] = count
		} else {
			newState[num - 1] = (newState[num - 1] ?? 0) + count
		}
	}
	state = newState
}
console.log(Object.values(state).reduce((a, b) => a + b))
