const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const LEVEL = 8; // 11 is allRGB: 4096x4096, 8 is 512x512

// The picture is CANVAS_GRID_SIZExCANVAS_GRID_SIZE squares big
const CANVAS_GRID_SIZE = Math.pow(2, LEVEL + 1);
// width and height of each square
const PIXEL_SIZE = 1; // should be 1 to generate an allRGB image
// Resize canvas
canvas.width = CANVAS_GRID_SIZE * PIXEL_SIZE;
canvas.height = CANVAS_GRID_SIZE * PIXEL_SIZE;

// number of pixels (frames) to calculate between animation updates
let frameSkip = 16*16*16;

function setup() {
    if (PLANE_TRAVERSER.getName() === "Moore Curve") {
        paint(PLANE_TRAVERSER.posX, PLANE_TRAVERSER.posY);
    }
    loop();
}

const PLANE_TRAVERSER = new DepthFirstSearchPlane(LEVEL, CANVAS_GRID_SIZE);
const CUBE_TRAVERSER = new DepthFirstSearchCube(CANVAS_GRID_SIZE);

function paint(posX, posY) {
    ctx.fillStyle = CUBE_TRAVERSER.getNextColor();
    ctx.fillRect(posX * PIXEL_SIZE, posY * PIXEL_SIZE, PIXEL_SIZE, PIXEL_SIZE);
}

function loop() {
    for (let a = 0; a < frameSkip; ++a) {
        const nextCoordinate = PLANE_TRAVERSER.getNextCoordinate();
        paint(nextCoordinate.x, nextCoordinate.y);

        if (PLANE_TRAVERSER.isDone()) {
            window.cancelAnimationFrame(loop);
            console.log("done");
            return;
        }
    }

    window.requestAnimationFrame(loop);
}

setup();
