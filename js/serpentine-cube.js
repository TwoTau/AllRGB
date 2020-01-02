class SerpentineCube {
	constructor(LEVEL, CANVAS_GRID_SIZE) {
		this.CANVAS_GRID_SIZE = CANVAS_GRID_SIZE;
	}

	getName() {
		return 'Serpentine';
	}

	*generator() {
		const end = this.CANVAS_GRID_SIZE * this.CANVAS_GRID_SIZE;
		for (let n = 0; n < end; n++) {
			const ratio = n / end;
			const hex = Math.floor(ratio * 16777216).toString(16);
			yield '#' + hex.padStart(6, '0');
		}
	}
}
