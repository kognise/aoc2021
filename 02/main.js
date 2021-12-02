const text = require('fs').readFileSync('input.txt').toString()
const commands = text.split('\n').map((item) => item.split(' '))

let depth = 0
let horiz = 0
let aim = 0

for (let [ com, val ] of commands) {
    if (com === 'down') {
        aim += parseInt(val)
    } else if (com === 'up') {
        aim -= parseInt(val)
    } else if (com === 'forward') {
        horiz += parseInt(val)
        depth += aim * parseInt(val)
    }
}

console.log(depth * horiz)