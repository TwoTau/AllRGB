class SerpentinePlane {
	constructor(LEVEL, CANVAS_GRID_SIZE) {
		this.CANVAS_GRID_SIZE = CANVAS_GRID_SIZE;
	}

	getName() {
		return "Serpentine";
	}

	*generator() {
		// start at top left
		let x = 0;
		let y = 0;

		while (y < this.CANVAS_GRID_SIZE) {
			yield {
				x,
				y,
			};

			x++;
			if (x === this.CANVAS_GRID_SIZE) {
				x = 0;
				y++;
			}
		}
	}
}
