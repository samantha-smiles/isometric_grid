const GRID_SIZE = 10;
let grid = [
    [2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
    [2, 0, 0, 0, 0, 0, 0, 0, 0, 2],
    [2, 0, 0, 1, 0, 0, 0, 0, 0, 2],
    [2, 0, 0, 0, 0, 0, 0, 1, 0, 2],
    [2, 0, 0, 0, 0, 0, 0, 0, 0, 2],
    [2, 0, 0, 0, 0, 0, 0, 0, 0, 2],
    [2, 0, 0, 0, 0, 0, 0, 0, 0, 2],
    [2, 0, 0, 0, 0, 0, 0, 0, 0, 2],
    [2, 0, 0, 0, 0, 0, 0, 0, 0, 2],
    [2, 2, 2, 2, 2, 2, 2, 2, 2, 2]
];

const TILE_WIDTH = 60;
const TILE_HEIGHT = 30;
let x_start, y_start;

function setup() {
    let canvas = createCanvas(800, 600);
    canvas.parent('canvas-container'); 
    x_start = width / 2 - TILE_WIDTH / 2;
    y_start = 50;
}

function draw_tile(type, x, y) {
    const colors = { 0: 'green', 1: 'yellow', 2: 'blue' };
    fill(colors[type]);
    stroke("black");

    // Transformation from grid coordinates to isometric:
    // IsoX = x_start + (CartesianX - CartesianY) * TILE_WIDTH / 2
    // IsoY = y_start + (CartesianX + CartesianY) * TILE_HEIGHT / 2
    // This establishes a diamond-shaped grid from a square grid.
    let isoX = x_start + (x - y) * TILE_WIDTH / 2;
    let isoY = y_start + (x + y) * TILE_HEIGHT / 2;

    // Drawing a parallelogram as an isometric tile
    beginShape();
    vertex(isoX, isoY); // Top point
    vertex(isoX + TILE_WIDTH / 2, isoY + TILE_HEIGHT / 2); // Right point
    vertex(isoX, isoY + TILE_HEIGHT); // Bottom point
    vertex(isoX - TILE_WIDTH / 2, isoY + TILE_HEIGHT / 2); // Left point
    endShape(CLOSE);
}

function draw_grid() {
    for (let i = 0; i < GRID_SIZE; i++) {
        for (let j = 0; j < GRID_SIZE; j++) {
            draw_tile(grid[i][j], i, j);
        }
    }
}

function draw() {
    clear();
    draw_grid(); 
}