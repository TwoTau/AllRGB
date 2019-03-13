class SerpentinePlane {
    constructor(LEVEL, CANVAS_GRID_SIZE) {
        this.CANVAS_GRID_SIZE = CANVAS_GRID_SIZE;

        // start at top left
        this.posX = 0;
        this.posY = 0;
    }

    getName() {
        return "Serpentine";
    }

    getNextCoordinate() {
        this.posX++;
        if (this.posX === this.CANVAS_GRID_SIZE) {
            this.posX = 0;
            this.posY++;
        }
        return {
            x: this.posX,
            y: this.posY
        };
    }

    isDone() {
        return (this.posY === this.CANVAS_GRID_SIZE + 1);
    }
}
