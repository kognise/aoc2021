const text = require('fs').readFileSync('input.txt').toString()
const graph = {}

const isSmall = (letter) => letter.toLowerCase() === letter

for (const [ src, dest ] of text.split('\n').map((line) => line.split('-'))) {
	if (!graph[src]) graph[src] = []
	graph[src].push(dest)

	if (!graph[dest]) graph[dest] = []
	graph[dest].push(src)
}

const getPaths = (src, allowedTwice, currentPath = [], visited = {}) => {
	if (src === 'end') return [ currentPath ]
	visited[src] = (visited[src] ?? 0) + 1

	const paths = []
	for (const next of graph[src]) {
		if (next === 'start') continue
		if (isSmall(next) && visited[next] >= (next === allowedTwice ? 2 : 1)) continue
		
		const foundPaths = getPaths(next, allowedTwice, [ ...currentPath, next ], visited)
		paths.push(...foundPaths)
	}

	visited[src] = visited[src] - 1
	return paths
}

console.log(new Set(
	Object.keys(graph).filter(isSmall)
		.map((allowedTwice) => getPaths('start', allowedTwice).join(','))
		.flat()
).size)