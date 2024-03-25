// Grid constants and definition
const GRID_SIZE = 10;
let grid = [
    [2, 2, 2, 2, 2, 2, 2, 2, 2, 2], // Initial grid configuration
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

// Tile size dimensions
const TILE_WIDTH = 60;
const TILE_HEIGHT = 30;
let x_start, y_start;

function setup() {
    // Setting up canvas and initial drawing position
    let canvas = createCanvas(800, 600);
    canvas.parent('canvas-container');
    // Center starting point calculation
    x_start = width / 2 - TILE_WIDTH / 2;
    y_start = 50;
}

function draw_tile(type, x, y) {
    // Color coding for different types of tiles
    const colors = { 0: 'green', 1: 'yellow', 2: 'blue', 3: 'red'};
    fill(colors[type]);
    stroke("black");

    // Isometric projection calculation
    let isoX = x_start + (x - y) * TILE_WIDTH / 2;
    let isoY = y_start + (x + y) * TILE_HEIGHT / 2;

    // Drawing the isometric tile
    beginShape();
    vertex(isoX, isoY); // Top vertex
    vertex(isoX + TILE_WIDTH / 2, isoY + TILE_HEIGHT / 2); // Right vertex
    vertex(isoX, isoY + TILE_HEIGHT); // Bottom vertex
    vertex(isoX - TILE_WIDTH / 2, isoY + TILE_HEIGHT / 2); // Left vertex
    endShape(CLOSE);

    // Optional: Displaying tile coordinates
    fill('white');
    noStroke();
    textSize(8);
    textAlign(CENTER, CENTER);
    text(`(${x},${y})`, isoX + TILE_WIDTH / 4, isoY + TILE_HEIGHT / 2);
}

function draw_grid() {
    // Iterating through the grid and drawing all tiles
    for (let i = 0; i < GRID_SIZE; i++) {
        for (let j = 0; j < GRID_SIZE; j++) {
            draw_tile(grid[i][j], i, j);
        }
    }
}

function draw() {
    // Clearing the canvas and redrawing the grid
    clear();
    draw_grid();
}

// Detecting mouse press and updating the tile state
function mousePressed() {
    // Inverse isometric projection to map click to grid coordinates
    let gridX = Math.floor((mouseX - x_start) / TILE_WIDTH + (mouseY - y_start) / TILE_HEIGHT);
    let gridY = Math.floor(-(mouseX - x_start) / TILE_WIDTH + (mouseY - y_start) / TILE_HEIGHT);
    
    // Validating the click and updating the tile state to 'selected' (3)
    if (gridX >= 0 && gridX < GRID_SIZE && gridY >= 0 && gridY < GRID_SIZE && grid[gridX][gridY] != 2) {
        grid[gridX][gridY] = 3; // Mark tile as selected
    }
}
