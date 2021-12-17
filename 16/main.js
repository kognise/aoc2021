const buf = require('fs').readFileSync('input.txt').toString()
	.split('').map((x) => parseInt(x, 16).toString(2).padStart(4, '0').split(''))
	.flat().map((x) => parseInt(x, 2))
let pointer = 0

// Initially tried to do this well with bitwise math, but APPARENTLY JS converts them to
// 32-bit signed ints in two's completement, does the math, and converts them back, which
// breaks for big numbers
const sliceToNumber = (buffer) => parseInt(buffer.join(''), 2)

const readSlice = (length) => {
	const result = buf.slice(pointer, pointer + length)
	pointer += length
	return result
}

const readNumber = (length) => sliceToNumber(readSlice(length))

const parsePacket = () => {
	readNumber(3) // Discard the version
	const type = readNumber(3)
	
	if (type === 4) { // Literal number
		const numberSlice = []
		while (true) {
			const [ next, ...data ] = readSlice(5)
			numberSlice.push(...data)
			if (!next) break // 0 at start means end of number
		}
		return sliceToNumber(numberSlice)
	} else { // Operator packet
		const lengthType = readNumber(1)
		const subValues = []

		// We're either getting the number of subpackets or the byte length of all of them,
		// so can just abstract this into a function to check if there are more packets
		let morePackets
		if (lengthType === 0) { // Bit length
			const subLengthMax = readNumber(15)
			const startPointer = pointer
			morePackets = () => pointer - startPointer < subLengthMax
		} else {
			const subCountMax = readNumber(11)
			morePackets = () => subValues.length < subCountMax
		}

		while (morePackets()) subValues.push(parsePacket())

		switch (type) {
			case 0: return subValues.reduce((p, c) => p + c, 0)
			case 1: return subValues.reduce((p, c) => p * c, 1)
			case 2: return Math.min(...subValues)
			case 3: return Math.max(...subValues)
			case 5: return subValues[0] > subValues[1] ? 1 : 0
			case 6: return subValues[0] < subValues[1] ? 1 : 0
			case 7: return subValues[0] === subValues[1] ? 1 : 0
		}
	}
}

console.log(parsePacket())