const text = require('fs').readFileSync('input.txt').toString()
const [ p1, p2 ] = text.split('\n\n')
const dots = p1.split('\n').map((line) => line.split(',').map(Number))
const folds = p2.split('\n').map((line) => {
	const splitSpaces = line.split(' ')
	const splitEquals = splitSpaces[splitSpaces.length - 1].split('=')
	return [ splitEquals[0], Number(splitEquals[1]) ]
})

const constructGrid = (dots) => {
	const maxX = Math.max(...dots.map(([ x ]) => x))
	const maxY = Math.max(...dots.map(([ , y ]) => y))
	const grid = new Array(maxX + 1).fill(null).map(() => new Array(maxY + 1).fill(false))
	for (const [ x, y ] of dots) grid[x][y] = true
	return grid
}

const printGrid = (grid) => {
	const transposed = grid[0].map((_, x) => grid.map((row) => row[x]))
	console.log(transposed.map((row) => row.map((cell) => cell ? '█' : ' ').join('')).join('\n'))
}

for (const [ axis, pos ] of folds) {
	for (let i = 0; i < dots.length; i++) {
		const [ x, y ] = dots[i]

		if (axis === 'x') {
			if (x >= pos) dots[i] = [ (pos * 2) - x, y ]
		} else if (axis === 'y') {
			if (y >= pos) dots[i] = [ x, (pos * 2) - y]
		}
	}
}

const grid = constructGrid(dots)
printGrid(grid)
console.log('-> size', grid.flat().reduce((acc, cur) => acc + (cur ? 1 : 0), 0))