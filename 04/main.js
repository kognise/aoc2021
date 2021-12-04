const text = require('fs').readFileSync('input.txt').toString()
const [numsRaw, ...boardsRaw] = text.split('\n\n')

const parseBoard = (a) => {
    const z = a.split('\n').map((row) => (row.trim().split(/\s+/g).map((a) => ({ num: Number(a), check: false }))))
    z.won = false
    return z
}

const checkBoard = (board) => {
    if (board.won) return false

    for (let i = 0; i < board.length; i++) {
        let count = 0
        for (let j = 0; j < board[i].length; j++) {
            if (board[i][j].check) count++
        }
        if (count === 5) return true
    }

    for (let j = 0; j < board[0].length; j++) {
        let count = 0
        for (let i = 0; i < board.length; i++) {
            if (board[i][j].check) count++
        }
        if (count === 5) return true
    }

    return false
}

const mark = (num, board) => {
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[i].length; j++) {
            if (board[i][j].num === num) board[i][j].check = true
        }
    }
}

const calcScore = (board) => {
    let score = 0
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[i].length; j++) {
            if (!board[i][j].check) score += board[i][j].num
        }
    }
    return score
}

const nums = numsRaw.split(',').map(Number)
const boards = boardsRaw.map(parseBoard)

const winningScores = []
for (const num of nums) {
    boards.map((board) => mark(num, board))
    for (const winningBoard of boards.filter(checkBoard)) {
        winningScores.push(calcScore(winningBoard) * num)
        winningBoard.won = true
    }
}
console.log(winningScores[0], winningScores[winningScores.length - 1])