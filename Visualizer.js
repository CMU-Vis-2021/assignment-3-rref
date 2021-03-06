
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

var activate = false;
var doOnce = true;
var tick = 0;

function draw() {
}

function setup() {
    createCanvas(720, 300);
    background(220);
}

function keyPressed() {
    if (keyCode == RETURN) {
        //restart the engine
        background(220);
        vec3 = populateGrid(true);
    }
    if (keyCode == DOWN_ARROW)
    {
        push()
        translate(0, 75);
        vec3 = populateGrid(false);
        pop();
    }
}

//Visualize VectorA and VectorB 
/*
    * this displays the vector that's inputted and returns the shape of it
    * looks like this: 
    * [ [Point(coordX, coordY, payload), [Point(coordX, coordY, payload)] ..]
    * Where payload is the value in this. 
    */
function populateVector(vector, offset) {
    var rows = vector.length;
    var cols = vector[0].length;
    var arr = [];
    for (row = 0; row < rows; row++) {
        arr[row] = new Array();
        for (col = 0; col < cols; col++) {
            arr[row][col] = new Point((tileSize.x * col) + offset.x, tileSize.y * row + offset.y, vector[row][col]);
            text(vector[row][col], arr[row][col].x, arr[row][col].y);
        }
    }
    return new Vec(arr, new Point(cols, rows));
}


//places offset distance from the vector to the left of it. 
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

//outputs the matrices equation... there is probably a better way to do this but I'm not sure right now.
function populateGrid(vis) {
    offsetX = 15;
    var vecA = populateVector(vectorA, new Point(10, 50));
    placeSign(vectorA, operation, new Point(25, 30));
    var vecB = populateVector(vectorB, new Point(60, 50));
    placeSign(vectorA, operations.EQUAL, new Point(60 + offsetX, 30));
    return SetUpVisualizations(operation, vecA, vecB,vis);
}


function SetUpVisualizations(operation, vecA, vecB, vis)
{
    switch (operation) {
            case operations.ADD:
                return SetUpVisualizeAddSub(vecA, vecB, new Point(110, 50), true, vis);
            case operations.SUB:
                return SetUpVisualizeAddSub(vecA, vecB, new Point(110, 50), false, vis);
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
}

function SetUpVisualizeAddSub(vecA, vecB, offset, add, vis) {
    //TODO: write up some assertions that the dimensions are the same and other rules for this.
    vecC = [];
    for (var row = 0; row < vecA.size.y; row++) {
        vecC[row] = new Array();
        for (var col = 0; col < vecA.size.x; col++) {
            if (vis) {
                var payload; 
                if (add) {
                    payload = String(vecA.vec[row][col].payload + "+" + vecB.vec[row][col].payload);
                }
                else {
                    payload = String(vecA.vec[row][col].payload + "-" + vecB.vec[row][col].payload);
                }
                vecC[row][col] = new Point((tileSize.x * col) + offset.x, tileSize.y * row + offset.y, payload);
            }
            else {
                if (add) payload = (parseInt(vecA.vec[row][col].payload) + parseInt(vecB.vec[row][col].payload));
                else payload = (vecA.vec[row][col].payload - vecB.vec[row][col].payload);
                vecC[row][col] = new Point((tileSize.x * col) + offset.x, tileSize.y * row + offset.y, payload);
            }
            text(payload, vecC[row][col].x + (20 * col), vecC[row][col].y);
        }
    }
    return new Vec(vecC, new Point(vecA.size.x, vecA.size.y));
}


function get_row(index, width)
{
  return index / width;
}

function get_col(index, width)
{
  return index % width; 
}

function VisualizeAddSub(vecC, ticker, offset)
{
    r = Math.ceil(get_row(ticker, vecC.size.y));
    c = get_col(ticker, vecC.size.x)
    print(r);
    text(vecC.vec[r][c].payload, vecC.vec[r][c].x, vecC.vec[r][c].y);
    return ticker + 1;
}



