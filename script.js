const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const options = {
	// number of pixels (frames) to calculate between animation updates
	Speed: 16,

	'Start animation': setup,

	'Stop animation': stop,

	// 11 is allRGB: 4096x4096, 8 is 512x512
	Level: 8,

	// width and height of each square
	// should be 1 to generate an allRGB image
	'Pixel size': 1,
	'Plane traverser': 'moore',
	'Cube traverser': 'dfs'
};

const gui = new dat.GUI();
gui.add(options, 'Speed', {
	'Slowest': 1,
	'Slow': 16,
	'Medium': 16 ** 3,
	'Fast': 16 ** 5,
	'Very fast': 16 ** 6
});
gui.add(options, 'Level', 1, 11).step(1);
gui.add(options, 'Pixel size', 1, 4).step(1);
gui.add(options, 'Plane traverser', ['serpentine', 'moore', 'dfs']);
gui.add(options, 'Cube traverser', ['serpentine', 'dfs', 'hsl']);
gui.add(options, 'Start animation');
gui.add(options, 'Stop animation');

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

let planeGenerator;
let cubeGenerator;
let pixelSize;

let frameId;

function stop() {
	if (frameId) {
		window.cancelAnimationFrame(frameId);
		frameId = null;
	}
}

function setup() {
	stop();

	// The picture is CANVAS_GRID_SIZE x CANVAS_GRID_SIZE squares big
	let canvasGridSize = Math.pow(2, options.Level + 1);

	// Resize canvas
	pixelSize = options['Pixel size'];
	canvas.width = canvasGridSize * pixelSize;
	canvas.height = canvasGridSize * pixelSize;

	// Set traversers
	const planeTraverser = new traversers.plane[options['Plane traverser']](options.Level, canvasGridSize);
	planeGenerator = planeTraverser.generator();
	const cubeTraverser = new traversers.cube[options['Cube traverser']](options.Level, canvasGridSize);
	cubeGenerator = cubeTraverser.generator();

	// Set titles
	const title = `${planeTraverser.getName()} Plane + ${cubeTraverser.getName()} Cube`;
	document.getElementsByTagName('title')[0].innerHTML = `AllRGB [${title}]`;
	document.getElementById('traversers').innerHTML = title;
	document.getElementById('canvas-size').innerHTML = `${canvas.width}x${canvas.height}`;
	
	loop();
}

function paint(x, y) {
	// Get next RGB value
	const next = cubeGenerator.next();
	if (next.done) {
		console.error(`Unreachable state at (${x}, ${y}): cube generator is done`);
	}
	ctx.fillStyle = next.value;
	ctx.fillRect(x * pixelSize, y * pixelSize, pixelSize, pixelSize);
}

function loop() {
	for (let a = 0; a < options.Speed; ++a) {
		// Get next plane coordinates
		const next = planeGenerator.next();

		if (next.done) {
			stop();
			alert('done');
			return;
		}

		const nextCoordinate = next.value;
		paint(nextCoordinate.x, nextCoordinate.y);
	}

	frameId = window.requestAnimationFrame(loop);
}

setup();
