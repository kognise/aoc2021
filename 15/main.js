const text = require('fs').readFileSync('input.txt').toString()
const smallGrid = text.split('\n').map((row) => row.split('').map(Number))
const tiledGrid = new Array(smallGrid.length * 5).fill(null).map((_, y) => new Array(smallGrid[0].length * 5).fill(0).map((_, x) => {
	const offset = Math.floor(y / smallGrid.length) + Math.floor(x / smallGrid[0].length)
	return (smallGrid[y % smallGrid.length][x % smallGrid[0].length] + offset - 1) % 9 + 1
}))
const paths = tiledGrid.map((row, y) => row.map((_, x) => x === 0 && y === 0 ? 0 : Infinity))

const queue = [ [ 0, 0 ] ]

const updateNeighbors = ([ x, y ], previous) => {
	if (!tiledGrid[y] || !tiledGrid[y][x]) return

	// Short-circuit if we've done better with this node already
	if (tiledGrid[y][x] + previous >= paths[y][x]) return

	queue.push([ x, y ])
	paths[y][x] = tiledGrid[y][x] + previous
}

while (queue.length > 0) {
	// Gotta shift instead of pop for... some reason? Everything breaks if I don't.
	// I think it lets us short-circuit properly because we're trying paths in the right order.
	const [ x, y ] = queue.shift()

	updateNeighbors([ x + 1, y ], paths[y][x])
	updateNeighbors([ x - 1, y ], paths[y][x])
	updateNeighbors([ x, y + 1 ], paths[y][x])
	updateNeighbors([ x, y - 1 ], paths[y][x])
}

console.log(paths[paths.length - 1][paths[0].length - 1])