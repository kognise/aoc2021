const text = require('fs').readFileSync('input.txt').toString()
const lines = text.split('\n').map((line) => line.split(' -> ').map((side) => side.split(',').map(Number)))

const plane = {}

for (const [ [xa1, ya1], [xb1, yb1] ] of lines) {
    const [xa, ya] = [Math.min(xa1, xb1), Math.min(ya1, yb1)]
    const [xb, yb] = [Math.max(xa1, xb1), Math.max(ya1, yb1)]

    if (xa === xb) {
        for (let y = ya; y <= yb; y++) {
            plane[`${xa},${y}`] = plane[`${xa},${y}`] ? plane[`${xa},${y}`] + 1 : 1
        }
    } else if (ya === yb) {
        for (let x = xa; x <= xb; x++) {
            plane[`${x},${ya}`] = plane[`${x},${ya}`] ? plane[`${x},${ya}`] + 1 : 1
        }
    } else {
        // Handle diagonal lines
        const slope = (yb1 - ya1) / (xb1 - xa1)
        const intercept = ya1 - slope * xa1
        for (let x = xa; x <= xb; x++) {
            const y = Math.round(slope * x + intercept)
            plane[`${x},${y}`] = plane[`${x},${y}`] ? plane[`${x},${y}`] + 1 : 1
        }
    }
}

let number = 0
for (const [_, value] of Object.entries(plane)) {
    if (value >= 2) number++
}

console.log(number)