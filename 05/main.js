const text = require('fs').readFileSync('input.txt').toString()
const lines = text.split('\n').map((line) => line.split(' -> ').map((side) => side.split(',').map(Number)))

const plane = {}

for (const [ [xa, ya], [xb, yb] ] of lines) {
    const [xMin, yMin] = [Math.min(xa, xb), Math.min(ya, yb)]
    const [xMax, yMax] = [Math.max(xa, xb), Math.max(ya, yb)]

    if (xMin === xMax) {
        for (let y = yMin; y <= yMax; y++) {
            plane[`${xMin},${y}`] = plane[`${xMin},${y}`] ? plane[`${xMin},${y}`] + 1 : 1
        }
    } else {
        const slope = (yb - ya) / (xb - xa)
        const intercept = ya - slope * xa
        for (let x = xMin; x <= xMax; x++) {
            const y = Math.round(slope * x + intercept)
            plane[`${x},${y}`] = plane[`${x},${y}`] ? plane[`${x},${y}`] + 1 : 1
        }
    }
}

let count = 0
for (const value of Object.values(plane)) {
    if (value >= 2) count++
}
console.log(count)