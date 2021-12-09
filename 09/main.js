const text = require('fs').readFileSync('input.txt').toString()
const grid = text.split('\n').map((row) => row.split('').map(Number))

const getAdjacent = (x, y) => {
	const adjacent = []
	if (x > 0) adjacent.push({ y, x: x - 1 })
	if (x < grid[y].length - 1) adjacent.push({ y, x: x + 1 })
	if (y > 0) adjacent.push({ y: y - 1, x })
	if (y < grid.length - 1) adjacent.push({ y: y + 1, x })
	return adjacent
}

const getBasin = (x, y, crawled = []) => {
	if (crawled.find((item) => item.x === x && item.y === y)) return []
	crawled.push({ x, y})
	
	let basin = [ { x, y } ]
	const nextAdjacent = getAdjacent(x, y).filter((pos) => (grid[pos.y][pos.x] > grid[y][x]) && grid[pos.y][pos.x] !== 9)

	for (const pos of nextAdjacent) {
		basin = basin.concat(getBasin(pos.x, pos.y, crawled))
	}

	return basin
}

const basinSizes = []
for (let x = 0; x < grid[0].length; x++) {
	for (let y = 0; y < grid.length; y++) {
		const adjacent = getAdjacent(x, y)

		// If this cell is a low point
		if (adjacent.every((pos) => grid[pos.y][pos.x] > grid[y][x])) {
			basinSizes.push(getBasin(x, y).length)
		}
	}
}
console.log(basinSizes.sort((a, b) => b - a).slice(0, 3).reduce((a, b) => a * b))