var vectorA = [
    [0, 0],
    [0, 0],
];
var vectorB = [
    [0, 0],
    [0, 0],
];

var vectorC = [
    [0, 0],
    [0, 0],
];
var result = 0;

const operations = {
    ADD: "summer",
    SUB: "subtract",
    TRANS: "transpose",
    DOT: "dot product",
    MULT: "multiply",
    EQUAL: "equal",
}
var operation;

var finished = false;


function add() {
    parseVectors();
    for(var i = 0; i < vectorA.length; i++) {
        for (var j = 0; j < vectorA[i].length; j++) {
            vectorC[i][j] = vectorA[i][j] + vectorB[i][j];
        }
    }
    finished = true;
    operation = operations.ADD;
}

function subtraction() {
    parseVectors();
    for (var i = 0; i < vectorA.length; i++) {
        for (var j = 0; j < vectorA[i].length; j++) {
            vectorC[i][j] = vectorA[i][j] - vectorB[i][j];
        }
    }
    finished = true;
    operation = operations.SUB;
}

function transpose() {
    parseVectors();
    for (var i = 0; i < vectorA.length; i++) {
        for (var j = 0; j < i; j++) {
            const temp = vectorA[i][j];
            vectorA[i][j] = vectorA[j][i];
            vectorA[j][i] = temp;
        }
    }
    finished = true;
    operation = operations.TRANS;
}

function dotProduct() {
    parseVectors();
    if (vectorA.length != vectorB.length) return; //TODO: Throw error here
    vectorC = new Array(vectorA.length);
    for (var i = 0; i < vectorA.length; i++) {
        result += vectorA[i] * vectorB[i];
    }
    finished = true;
    operation = operations.DOT;
}

function multiply() {
    parseVectors();
    vectorC = new Array(vectorA.length);
    for (row = 0; row < vectorA.length; row++) {
        vectorC[row] = new Array(vectorB.length);
        for (col = 0; col < vectorB.length; col++) {
            vectorC[row][col] += vectorA[col][row] * vectorB[row][col]
        }
    }
    finished = true;
    operation = operations.MULT;
}


function parseVectors() {

    vectorA[0][0] = document.getElementById("a00").value;
    vectorA[0][1] = document.getElementById("a01").value;
    vectorA[1][0] = document.getElementById("a10").value;
    vectorA[1][1] = document.getElementById("a11").value;

    vectorB[0][0] = document.getElementById("b00").value;
    vectorB[0][1] = document.getElementById("b01").value;
    vectorB[1][0] = document.getElementById("b10").value;
    vectorB[1][1] = document.getElementById("b11").value;
}

function outputLatex(v) {
    //TODO: Finish function
}

function setup() {
    createCanvas(720, 720);
    background(220);
}
