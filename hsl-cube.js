class HslCube {
    constructor(CANVAS_GRID_SIZE) {
        this.CANVAS_GRID_SIZE = CANVAS_GRID_SIZE;
        this.n = 0;
    }

    getNextColor() {
        const ratio = this.n / (CANVAS_GRID_SIZE * CANVAS_GRID_SIZE);
        this.n++;
        return "hsl(" + Math.floor(ratio * 360) + ",100%,50%)";
    }
}
