class SerpentineCube {
	constructor(LEVEL, CANVAS_GRID_SIZE) {
		this.CANVAS_GRID_SIZE = CANVAS_GRID_SIZE;
	}

	getName() {
		return 'Serpentine';
	}

	*generator() {
		let n = 0;
		const end = this.CANVAS_GRID_SIZE * this.CANVAS_GRID_SIZE;
		while (n < end) {
			const ratio = n / end;

			let hex = Math.floor(ratio * 16777216).toString(16);
			while (hex.length < 6) {
				hex = '0' + hex;
			}
			n++;
			yield '#' + hex;
		}
	}
}
