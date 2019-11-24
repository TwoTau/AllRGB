class MoorePlane {
	constructor(LEVEL, CANVAS_GRID_SIZE) {
		this.LEVEL = LEVEL;
		this.CANVAS_GRID_SIZE = CANVAS_GRID_SIZE;

		// starting location is the bottom middle
		this.posX = CANVAS_GRID_SIZE / 2;
		this.posY = CANVAS_GRID_SIZE - 1;

		// starting direction is up
		this.dirX = 0;
		this.dirY = -1;

		// generate instructions for the Moore Curve using the Lindenmayer system
		this.systemPos = 0;
		this.SYSTEM = this.generateInstructions();
		console.log(this.SYSTEM);
	}

	getName() {
		return "Moore Curve";
	}

	generateInstructions() {
		// Axiom to start the instructions
		const AXIOM = "LFL+F+LFL";
		// Production rules for replacing R and L each iteration
		const RULE_L = "-RF+LFL+FR-";
		const RULE_R = "+LF-RFR-FL+";

		// store RegExps for replacing for efficiency
		const REPLACE_L = new RegExp("L", "g");
		const REPLACE_R = new RegExp("R", "g");
		const REPLACE_X = new RegExp("X", "g");

		let instructions = AXIOM;

		for (let n = 0; n < this.LEVEL; ++n) {
			// replace "L"s and "R"s with their respective rules
			instructions = instructions.replace(REPLACE_L, "X").replace(REPLACE_R, RULE_R).replace(REPLACE_X, RULE_L);
		}

		// clean up the instructions by replacing useless parts like +-, -+, R, and L
		instructions = instructions.replace(/(\-\+)|(\+\-)|R|L/g, "");

		return instructions;
	}

	getNextCoordinate() {
		let instruction = "";
		while (instruction !== "F") {
			instruction = this.SYSTEM.charAt(this.systemPos);
			this.systemPos++;

			if (instruction === "F") {
				this.posX += this.dirX;
				this.posY += this.dirY;
				return {
					x: this.posX,
					y: this.posY
				};
			} else if (instruction === "-" || instruction === "+") {
				if (this.dirX === 0 && this.dirY === 1) { // down
					this.dirX = -1;
					this.dirY = 0;
				} else if (this.dirX === 0 && this.dirY === -1) { // up
					this.dirX = 1;
					this.dirY = 0;
				} else if (this.dirX === 1 && this.dirY === 0) { // right
					this.dirX = 0;
					this.dirY = 1;
				} else if (this.dirX === -1 && this.dirY === 0) { // left
					this.dirX = 0;
					this.dirY = -1;
				}

				// + is just the opposite instruction of -
				if (instruction === "+") {
					this.dirX *= -1;
					this.dirY *= -1;
				}
			}

		}
	}

	*generator() {
		yield {
			x: this.posX,
			y: this.posY,
		};

		while (!this.isDone()) {
			yield this.getNextCoordinate();
		}
	}

	isDone() {
		if (this.LEVEL % 2 === 0) {
			return (this.systemPos == this.SYSTEM.length);
		} else {
			return (this.systemPos == this.SYSTEM.length - 1);
		}
	}
}
