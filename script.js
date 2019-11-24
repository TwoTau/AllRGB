const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

let level = 11; // 11 is allRGB: 4096x4096, 8 is 512x512

// The picture is CANVAS_GRID_SIZE x CANVAS_GRID_SIZE squares big
let canvasGridSize = Math.pow(2, level + 1);
// width and height of each square
let pixelSize = 1; // should be 1 to generate an allRGB image
// Resize canvas
canvas.width = canvasGridSize * pixelSize;
canvas.height = canvasGridSize * pixelSize;

// number of pixels (frames) to calculate between animation updates
let frameSkip = 16 * 16 * 16 * 16;

function setup() {
	const title = `${planeTraverser.getName()} Plane + ${cubeTraverser.getName()} Cube`;
	document.getElementsByTagName('title')[0].innerHTML = `AllRGB [${title}]`;
	document.getElementById('traversers').innerHTML = title;
	document.getElementById('canvas-size').innerHTML = `${canvas.width}x${canvas.height}`;
	loop();
}

const traversers = {
	plane: {
		'serpentine': SerpentinePlane,
		'moore': MoorePlane,
		'dfs': DepthFirstSearchPlane,
	},
	cube: {
		'serpentine': SerpentineCube,
		'dfs': DepthFirstSearchCube,
		'hsl': HslCube,
	}
};

let planeTraverser = new traversers.plane.dfs(level, canvasGridSize);
let planeGenerator = planeTraverser.generator();
let cubeTraverser = new traversers.cube.dfs(level, canvasGridSize);
let cubeGenerator = cubeTraverser.generator();

function paint(posX, posY) {
	const next = cubeGenerator.next();
	if (next.done) {
		console.error(`Unreachable state at (${posX}, ${posY}): cube generator is done`);
	}
	ctx.fillStyle = next.value;
	ctx.fillRect(posX * pixelSize, posY * pixelSize, pixelSize, pixelSize);
}

function loop() {
	for (let a = 0; a < frameSkip; ++a) {
		const next = planeGenerator.next();

		if (next.done) {
			window.cancelAnimationFrame(loop);
			console.log('done');
			alert('done');
			return;
		}

		const nextCoordinate = next.value;
		paint(nextCoordinate.x, nextCoordinate.y);
	}

	window.requestAnimationFrame(loop);
}

setup();
