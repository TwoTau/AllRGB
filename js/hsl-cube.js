class HslCube {
	constructor(LEVEL, CANVAS_GRID_SIZE) {
		this.CANVAS_GRID_SIZE = CANVAS_GRID_SIZE;
		this.n = 0;
	}

	getName() {
		return 'HSL';
	}

	*generator() {
		let n = 0;
		const end = this.CANVAS_GRID_SIZE * this.CANVAS_GRID_SIZE;
		while (n < end) {
			const ratio = n / end;
			n++;
			yield 'hsl(' + Math.floor(ratio * 360) + ',100%,50%)';
		}
	}
}
