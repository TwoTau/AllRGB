class DepthFirstSearchCube {
    constructor(LEVEL, CANVAS_GRID_SIZE) {
        this.CANVAS_GRID_SIZE = CANVAS_GRID_SIZE;

        this.grid = []; // each cell grid[x][y][z] is true if the node has been visited, else false

        for (let x = 0; x < 256; x++) {
            const plane = [];
            for (let y = 0; y < 256; y++) {
                const row = [];
                for (let z = 0; z < 256; z++) {
                    row[z] = false;
                }
                plane.push(row);
            }
            this.grid.push(plane);
        }

        this.Node = class {
            constructor(x, y, z) {
                this.x = x;
                this.y = y;
                this.z = z;
                this.previous = false;
            }
        }
    }

    getName() {
        return 'DFS';
    }

    getAdjacentNodes(node) {
        const adjacent = [];

        // makes sure to not add coordinates outside the RGB cube range
        const minX = Math.max(node.x - 1, 0);
        const minY = Math.max(node.y - 1, 0);
        const minZ = Math.max(node.z - 1, 0);
        const maxX = Math.min(node.x + 1, 255);
        const maxY = Math.min(node.y + 1, 255);
        const maxZ = Math.min(node.z + 1, 255);

        for (let x = minX; x <= maxX; x++) {
            for (let y = minY; y <= maxY; y++) {
                for (let z = minZ; z <= maxZ; z++) {
                    // do not add the same cell to the adjacent list
                    if (x !== node.x || y !== node.y || z !== node.z) {
                        adjacent.push(new this.Node(x, y, z));
                    }
                }
            }
        }

        for (let i = adjacent.length - 1; i >= 0; i--) {
            const adj = adjacent[i];
            if (this.grid[adj.x][adj.y][adj.z]) {
                adjacent.splice(i, 1);
            }
        }
        return adjacent;
    }

    *generator() {
        let currentNode = new this.Node(0, 0, 0); // root node, where previous = false

        yield '#000000';

        let n = 1;
        const end = this.CANVAS_GRID_SIZE * this.CANVAS_GRID_SIZE;

        while (n < end) {
            this.grid[currentNode.x][currentNode.y][currentNode.z] = true;

            let adjacentNodes = this.getAdjacentNodes(currentNode);
            while (adjacentNodes.length === 0) {
                currentNode = currentNode.previous;
                adjacentNodes = this.getAdjacentNodes(currentNode);
            }

            const newNode = adjacentNodes[Math.floor(Math.random() * adjacentNodes.length)];
            newNode.previous = currentNode;
            currentNode = newNode;

            let r = currentNode.x.toString(16);
            let g = currentNode.y.toString(16);
            let b = currentNode.z.toString(16);
            if (r.length < 2) r = '0' + r;
            if (g.length < 2) g = '0' + g;
            if (b.length < 2) b = '0' + b;

            yield '#' + r + g + b;

            n++;
        }
    }
}
