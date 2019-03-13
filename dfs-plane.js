class DFSPlaneNode {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.previous = false;
    }
}

class DepthFirstSearchPlane {
    constructor(LEVEL, CANVAS_GRID_SIZE) {
        this.CANVAS_GRID_SIZE = CANVAS_GRID_SIZE;

        this.n = 0;

        this.grid = []; // each cell grid[x][y] is true if the node has been visited, else false
        this.currentNode = new DFSPlaneNode(0, 0); // previous = false

        for (var x = 0; x < CANVAS_GRID_SIZE; x++) {
            const row = [];
            for (var y = 0; y < CANVAS_GRID_SIZE; y++) {
                row[y] = false;
            }
            this.grid.push(row);
        }
        this.grid[this.currentNode.x][this.currentNode.y] = true;
        console.log(CANVAS_GRID_SIZE * CANVAS_GRID_SIZE);
    }

    getName() {
        return "DFS";
    }

    getAdjacentNodes(node) {
        const adjacent = [];
        adjacent.push(new DFSPlaneNode(node.x + 1, node.y));
        adjacent.push(new DFSPlaneNode(node.x - 1, node.y));
        adjacent.push(new DFSPlaneNode(node.x, node.y + 1));
        adjacent.push(new DFSPlaneNode(node.x, node.y - 1));

        for (var i = adjacent.length - 1; i >= 0; i--) {
            // if out of bounds or cell is true
            if (adjacent[i].x < 0 || adjacent[i].y < 0 ||
                adjacent[i].x >= CANVAS_GRID_SIZE || adjacent[i].y >= CANVAS_GRID_SIZE ||
                this.grid[adjacent[i].x][adjacent[i].y]) {
                adjacent.splice(i, 1);
            }
        }
        return adjacent;
    }

    getNextCoordinate() {
        let coordinates = {
            x: this.currentNode.x,
            y: this.currentNode.y
        };

        // get open nodes nearby
        let adjacentNodes = this.getAdjacentNodes(this.currentNode);

        this.n++;

        if (this.isDone()) {
            return {
                x: this.currentNode.x,
                y: this.currentNode.y
            };
        }

        // as long as there is a dead end
        while (adjacentNodes.length === 0) {
            // alert('reached a dead end');
            if (this.currentNode.previous === false) {
                return {
                    x: 0,
                    y: 0
                };
            }
            this.currentNode = this.currentNode.previous;
            adjacentNodes = this.getAdjacentNodes(this.currentNode);
        }

        const newNode = adjacentNodes[Math.floor(Math.random() * adjacentNodes.length)];
        newNode.previous = this.currentNode;
        this.grid[newNode.x][newNode.y] = true;
        this.currentNode = newNode;

        return coordinates;
    }

    isDone() {
        return (this.n === CANVAS_GRID_SIZE * CANVAS_GRID_SIZE);
    }
}
