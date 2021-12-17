const text = require('fs').readFileSync('input.txt').toString()
const [ [ x1, x2 ], [ y1, y2 ] ] = text.split(' ').slice(2).join(' ').split(', ').map((side) => side.slice(2).split('..').map(Number))

const hitsTarget = ([ ivx, ivy ]) => {
	let [ x, y ] = [ 0, 0 ]
	let [ vx, vy ] = [ ivx, ivy ]
	let maxY = 0

	while (true) {
		// Handle probe exiting target area
		if (vx < 0 && x < Math.min(x1, x2))
			return null
		else if (vx > 0 && x > Math.max(x1, x2))
			return null
		else if (vy < 0 && y < Math.min(y1, y2))
			return null
		
		// Handle probe hitting target
		if (x >= x1 && x <= x2 && y >= y1 && y <= y2)
			return maxY

		// Update probe position
		x += vx
		y += vy
		vx -= Math.sign(vx)
		vy -= 1

		if (y > maxY) maxY = y
	}
}

let count = 0

// Look, I promise, I thought about the *proper* way to do this, but this is easier :)
for (let vx = -9999; vx < 9999; vx++) {
	for (let vy = -9999; vy <= 9999; vy++) {
		if (vx % 1000 === 0 && vy % 1000 === 0) console.log(vx, vy)
		const hit = hitsTarget([ vx, vy ])
		if (hit !== null) count++
	}
}

console.log(count)