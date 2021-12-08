// This code is literally hellish what the FUCK IS THE SMART SOLUTION TO THIS???!!!
// I SWEAR I TRIED *EVERYTHING* WITH STATISTICS AND NOTHING WORKED.
// My brain does not work algorithmically. I swear all my other solutions are good...

const text = require('fs').readFileSync('input.txt').toString()
const data = text.split('\n').map((line) => line.split(' | ').map((side) => side.split(' ').map((word) => [ ...word ])))

const numbers = [
	[ 0, 1, 2, 4, 5, 6],
	[ 2, 5 ],
	[ 0, 2, 3, 4, 6 ],
	[ 0, 2, 3, 5, 6 ],
	[ 1, 2, 3, 5 ],
	[ 0, 1, 3, 5, 6 ],
	[ 0, 1, 3, 4, 5, 6 ],
	[ 0, 2, 5 ],
	[ 0, 1, 2, 3, 4, 5, 6 ],
	[ 0, 1, 2, 3, 5, 6 ]
]

const nullifyDuplicates = (array) => {
	const result = [ ...array ]
	for (let i = 0; i < array.length; i++) {
		const item = array[i]
		if (array.slice(0, i).includes(item) || array.slice(i + 1).includes(item)) {
			result[i] = null
		}
	}
	return result
}

let sum = 0
for (const [ patterns, outputs ] of data) {
	const segmentProbabilities = new Array(7).fill(null).map(() => ({}))
	const sure = new Array(7).fill(null)

	const updateSure = () => {
		let madeChanges
		do {
			madeChanges = false
			
			const pass = []
			for (let segment = 0; segment < 7; segment++) {
				const probabilities = segmentProbabilities[segment]

				const weighted = []
				for (const key of Object.keys(probabilities)) {
					const max = Math.max(...segmentProbabilities.map((item, i) => !sure[i] && i !== segment && item[key] || 0))
					if (probabilities[key] > max) weighted.push([ key, probabilities[key] ])
				}
				weighted.sort((a, b) => b[1] - a[1])
				if (weighted[0]) pass[segment] = weighted[0][0]
			}

			const deduped = nullifyDuplicates(pass)
			for (let i = 0; i < 7; i++) {
				if (deduped[i] && deduped[i] !== sure[i]) {
					sure[i] = deduped[i]
					madeChanges = true
				}
			}

			for (const found of sure.filter((item) => !!item)) {
				for (const probabilities of segmentProbabilities) {
					if (probabilities[found]) madeChanges = true
					delete probabilities[found]
				}
			}
		} while (madeChanges)
	}
	
	for (const uniqueLength of [ 2, 3, 4, 7 ]) {
		for (const word of patterns.filter((word) => word.length === uniqueLength)) {
			for (const segment of numbers.find((number) => number.length === uniqueLength)) {
				for (const character of word) segmentProbabilities[segment][character] = (segmentProbabilities[segment][character] || 0) + 1
			}
		}
	}

	// These cases could (should?) be written algorithmically but it's a pain in the ass
	{
		const fives = patterns.filter((word) => word.length === 5)
		const unique = [ ...new Set(fives.flat()) ]

		const shared3 = unique.filter((character) => fives.filter((word) => word.includes(character)).length === 3)
		for (const character of shared3) {
			segmentProbabilities[0][character] = (segmentProbabilities[0][character] || 0) + 1
			segmentProbabilities[3][character] = (segmentProbabilities[3][character] || 0) + 1
			segmentProbabilities[6][character] = (segmentProbabilities[6][character] || 0) + 1
		}

		const shared2 = unique.filter((character) => fives.filter((word) => word.includes(character)).length === 2)
		for (const character of shared2) {
			segmentProbabilities[2][character] = (segmentProbabilities[2][character] || 0) + 1
			segmentProbabilities[5][character] = (segmentProbabilities[5][character] || 0) + 1
		}

		const shared1 = unique.filter((character) => fives.filter((word) => word.includes(character)).length === 1)
		for (const character of shared1) {
			segmentProbabilities[1][character] = (segmentProbabilities[1][character] || 0) + 1
			segmentProbabilities[4][character] = (segmentProbabilities[4][character] || 0) + 1
		}
	}

	{
		const sixes = patterns.filter((word) => word.length === 6)
		const unique = [ ...new Set(sixes.flat()) ]

		const shared3 = unique.filter((character) => sixes.filter((word) => word.includes(character)).length === 3)
		for (const character of shared3) {
			segmentProbabilities[0][character] = (segmentProbabilities[0][character] || 0) + 1
			segmentProbabilities[1][character] = (segmentProbabilities[1][character] || 0) + 1
			segmentProbabilities[5][character] = (segmentProbabilities[5][character] || 0) + 1
			segmentProbabilities[6][character] = (segmentProbabilities[6][character] || 0) + 1
		}

		const shared2 = unique.filter((character) => sixes.filter((word) => word.includes(character)).length === 2)
		for (const character of shared2) {
			segmentProbabilities[2][character] = (segmentProbabilities[2][character] || 0) + 1
			segmentProbabilities[3][character] = (segmentProbabilities[3][character] || 0) + 1
			segmentProbabilities[4][character] = (segmentProbabilities[4][character] || 0) + 1
		}
	}

	updateSure()

	let string = ''
	for (const output of outputs) {
		const number = numbers.findIndex((number) => number.length === output.length && output.every((character) => number.includes(sure.indexOf(character))))
		string += number.toString()
	}
	sum += parseInt(string, 10)
}

console.log(sum)