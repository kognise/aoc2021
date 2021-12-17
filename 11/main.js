const text = require('fs').readFileSync('input.txt').toString()
const grid = text.split('\n').map((line) => line.split('').map(Number))

let flashes = 0
for (let steps = 0; true; steps++) {
	for (let y = 0; y < grid.length; y++) {
		for (let x = 0; x < grid[y].length; x++) {
			grid[y][x]++
		}
	}

	let flashesThisTime
	const flashed = []
	do {
		flashesThisTime = 0
		for (let y = 0; y < grid.length; y++) {
			for (let x = 0; x < grid[y].length; x++) {
				if (grid[y][x] <= 9) continue
				if (flashed.includes(`${x},${y}`)) continue

				// Increase all adjacent squares by 1 (including diagonals)
				for (let dy = -1; dy <= 1; dy++) {
					for (let dx = -1; dx <= 1; dx++) {
						if (dx === 0 && dy === 0) continue
						if (grid[y + dy] && grid[y + dy][x + dx]) {
							grid[y + dy][x + dx]++
						}
					}
				}

				flashesThisTime++
				flashed.push(`${x},${y}`)
			}
		}
		flashes += flashesThisTime
	} while (flashesThisTime !== 0)

	for (const item of flashed) {
		const [ x, y ] = item.split(',').map(Number)
		grid[y][x] = 0
	}

	if (flashed.length === grid.length * grid[0].length) {
		console.log('Last step:', steps + 1)
		break
	}
}

console.log(flashes)