class DepthFirstSearchPlane {
	constructor(LEVEL, CANVAS_GRID_SIZE) {
		this.CANVAS_GRID_SIZE = CANVAS_GRID_SIZE;

		this.grid = []; // each cell grid[x][y] is true if the node has been visited, else false

		for (let x = 0; x < CANVAS_GRID_SIZE; x++) {
			const row = [];
			for (let y = 0; y < CANVAS_GRID_SIZE; y++) {
				row[y] = false;
			}
			this.grid.push(row);
		}

		this.Node = class {
			constructor(x, y) {
				this.x = x;
				this.y = y;
				this.previous = false;
			}
		}
	}

	getName() {
		return 'DFS';
	}

	getAdjacentNodes(node) {
		const adjacent = [];
		adjacent.push(new this.Node(node.x + 1, node.y));
		adjacent.push(new this.Node(node.x - 1, node.y));
		adjacent.push(new this.Node(node.x, node.y + 1));
		adjacent.push(new this.Node(node.x, node.y - 1));

		for (let i = adjacent.length - 1; i >= 0; i--) {
			// if out of bounds or cell is true
			if (adjacent[i].x < 0 || adjacent[i].y < 0 ||
				adjacent[i].x >= this.CANVAS_GRID_SIZE || adjacent[i].y >= this.CANVAS_GRID_SIZE ||
				this.grid[adjacent[i].x][adjacent[i].y]) {
				adjacent.splice(i, 1);
			}
		}
		return adjacent;
	}

	*generator() {
		let currentNode = new this.Node(0, 0); // root node, previous = false

		yield {
			x: currentNode.x,
			y: currentNode.y,
		};

		let n = 1;
		const end = this.CANVAS_GRID_SIZE * this.CANVAS_GRID_SIZE;

		while (n < end) {
			this.grid[currentNode.x][currentNode.y] = true;

			// get open nodes nearby
			let adjacentNodes = this.getAdjacentNodes(currentNode);
			// as long as there is a dead end
			while (adjacentNodes.length === 0) {
				currentNode = currentNode.previous;
				adjacentNodes = this.getAdjacentNodes(currentNode);
			}

			const newNode = adjacentNodes[Math.floor(Math.random() * adjacentNodes.length)];
			newNode.previous = currentNode;
			currentNode = newNode;

			yield {
				x: currentNode.x,
				y: currentNode.y,
			};

			n++;
		}
	}
}
