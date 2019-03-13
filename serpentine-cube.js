class SerpentineCube {
    constructor(CANVAS_GRID_SIZE) {
        this.CANVAS_GRID_SIZE = CANVAS_GRID_SIZE;
        this.n = 0;
    }

    getNextColor() {
        const ratio = this.n / (this.CANVAS_GRID_SIZE * this.CANVAS_GRID_SIZE);
        let hex = Math.floor(ratio * 16777216).toString(16);
        while (hex.length < 6) {
            hex = "0" + hex;
        }
        this.n++;
        return "#" + hex;
    }
}
