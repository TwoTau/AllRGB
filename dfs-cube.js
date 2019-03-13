class Node {
    constructor(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.previous = false;
    }
}

class DepthFirstSearchCube {
    constructor() {
        this.grid = []; // each cell grid[x][y][z] is true if the node has been visited, else false
        this.currentNode = new Node(0, 0, 0); // previous = false

        for (var x = 0; x < 256; x++) {
            const plane = [];
            for (var y = 0; y < 256; y++) {
                const row = [];
                for (var z = 0; z < 256; z++) {
                    row[z] = false;
                }
                plane.push(row);
            }
            this.grid.push(plane);
        }
        this.grid[this.currentNode.x][this.currentNode.y][this.currentNode.z] = true;
    }

    getAdjacentNodes(node) {
        const adjacent = [];
		for (var x = -1; x <= 1; x++) {
			for (var y = -1; y <= 1; y++) {
				for (var z = -1; z <= 1; z++) {
					if (x !== 0 || y !== 0 || z !== 0) {
						adjacent.push(new Node(node.x + x, node.y + y, node.z + z));
					}
				}
			}
		}

        for (var i = adjacent.length - 1; i >= 0; i--) {
            if (this.nodeInVisitedNodes(adjacent[i])) {
                adjacent.splice(i, 1);
            }
        }
        return adjacent;
    }
    
    nodeInVisitedNodes(node) {
        if (node.x < 0 || node.y < 0 || node.z < 0 ||
            node.x > 255 || node.y > 255 || node.z > 255) {
            return true;
        }
        return this.grid[node.x][node.y][node.z];
    }

    getNextColor() {
        let r = this.currentNode.x.toString(16);
        let g = this.currentNode.y.toString(16);
        let b = this.currentNode.z.toString(16);
        if (r.length < 2) r = "0" + r;
        if (g.length < 2) g = "0" + g;
        if (b.length < 2) b = "0" + b;

        let adjacentNodes = this.getAdjacentNodes(this.currentNode);
        while (adjacentNodes.length === 0) {
            if (this.currentNode.previous === false) {
                return "#505050";
            }
            this.currentNode = this.currentNode.previous;
            adjacentNodes = this.getAdjacentNodes(this.currentNode);
        }

        const newNode = adjacentNodes[Math.floor(Math.random() * adjacentNodes.length)];
        newNode.previous = this.currentNode;
        this.grid[newNode.x][newNode.y][newNode.z] = true;
        this.currentNode = newNode;

        return "#" + r + g + b;
    }
}
