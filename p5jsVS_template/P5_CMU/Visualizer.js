activate = false;


function preload() {
    //inconsolata = loadFont('DewiScript.otf');
}


class Point {
    constructor(x, y, payload) {
        this.x = x;
        this.y = y;
        this.payload = payload;
    }
}

class Vec {
    constructor(vec, size) {
        this.vec = vec;
        //vec [[Point(x,y), Point(x,y)][Point(x,y), Point(x,y)]]

        this.size = size;
        //size = (cols, rows)
    }
}

var tileSize = new Point(20, 40);
var coordinates = [];
var coordSize = 0;

var vecA;
var vecB;
var vecC;

function draw() {
    if (activate) {
        populateGrid();
    }
}

function setup() {
    createCanvas(720, 720);
    background(220);
}

function keyPressed() {
    if (keyCode == TAB && !activate) {
        matricesGrids();
        //populateGrid();
        activate = true;
    }
}

function matricesGrids() {
    var rows = vectorA.length;
    //+2 to have operation and equal sign
    var cols = vectorA[0].length + vectorB[0].length + vectorC[0].length + 2;
    for (row = 0; row < rows; row++) {
        for (col = 0; col < cols; col++) {
            coordinates[coordSize] = new Point(tileSize.x * col, tileSize.y * row);
            //ellipse(coordinates[coordSize].x, coordinates[coordSize].y, 5, 5);
            coordSize++;
        }
    }


}
//TODO: RETURN vec (1d array, size)
function populateVector(vector, offset) {
    var rows = vector.length;
    var cols = vector[0].length;
    var arr =[]; 
    for (row = 0; row < rows; row++) {
        arr[row] = new Array();
        for (col = 0; col < cols; col++) {
            arr[row][col] = new Point((tileSize.x * col) + offset.x, tileSize.y * row + offset.y, vector[row][col]);
            text(vector[row][col], arr[row][col].x, arr[row][col].y);
        }
    }
    return new Vec(arr, new Point(cols,rows));
}

function placeSign(vector, sign, offset) {
    var rows = vectorA.length;
    var cols = vectorA[0].length;
    S = "";
    switch (sign) {
        case operations.ADD:
            S = "+";
            break;
        case operations.SUB:
            S = "-";
            break;
        case operations.MULT:
            S = "x";
            break;
        case operations.TRANS:
            S = "T";
            break;
        case operations.DOT:
            S = "*";
            break;
        case operations.EQUAL:
            S = "=";
            break;
    }
    text(S, (tileSize.x * (cols - 1)) + offset.x, tileSize.y * (rows - 1) + offset.y);
}

function populateGrid() {
    offsetX = 15;
    vecA = populateVector(vectorA, new Point(10, 50));
    placeSign(vectorA, operation, new Point(25, 30)); //TODO: GET OPERAND FROM vecVis. 
    vecB = populateVector(vectorB, new Point(60, 50));
    placeSign(vectorA, operations.EQUAL, new Point(60 + offsetX, 30));
}

function startVis() {
    //put circle over element in one array
    //put circle over element in another array

}


