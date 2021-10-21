class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

//Tile set ups
var tileSize = 40; //10 by 10 pixels
var coordinates = [];
var coordSize = 0;
var newCoordinates = [];
var newCoordSize = 0;
var possiblePointCoords = [];
var possiblePointSize = 0;
//Bounds
var highestX = 0;
var highestY = 0;
var lowestX = 99999;
var lowestY = 99999;
//INF used in figuring out if current point in one poly
var INF = 10000;

//event bools 
var toggleDraw = true;
var canDrawPoints = false;
var canDrawOutline = false;
var canDrawShapeOutline = true;
var canShowGoodCoords = false;
var canFillInTiles = false;

//time control 
var secondBetweenEvents = 2;
var action = 0; //thing that we're up to *right now*
var ticker = 0;
var timer = secondBetweenEvents * 1000;
//visualization code
{

    function sleep(millisecondsDuration) {
        return new Promise((resolve) => {
            setTimeout(resolve, millisecondsDuration);
        })
    }

    function PopulateOutline(f) {

        if (canFillInTiles) {
            fill(f);
            for (i = 0; i < newCoordSize; i++) {
                rect(newCoordinates[i].x, newCoordinates[i].y, tileSize, tileSize);
            }
            noFill();
            canFillInTiles = false;
        }
    }

    function showUsefulCoords(f) {

        if (canShowGoodCoords) {
            for (i = 0; i < newCoordSize; i++) {
                ellipse(newCoordinates[i].x, newCoordinates[i].y, 5, 5);
            }
            canShowGoodCoords = false;
            canFillInTiles = true;
        }
    }

    //draw up the shapes row and cols 
    function divideShape() {
        if (canDivideShape == true) {
            for (col = lowestX; col < highestX; col += tileSize) {
                line(col, highestY, col, lowestY);
            }
            for (row = lowestY; row < highestY; row += tileSize) {
                line(lowestX, row, highestX, row);
            }
            canDivideShape = false;
            canShowGoodCoords = true;
        }
    }

    //show all points within bounds
    function showPoints() {
        if (canShowPoints == true) {
            for (row = lowestY; row < highestY; row += tileSize) {
                for (col = lowestX; col < highestX; col += tileSize) {
                    ellipse(col, row, 5, 5);
                }
            }
            canShowPoints = false;
            canDivideShape = true;
        }
    }
    //draw shape extents: min/max X/Y values
    function drawShapeOutline() {
        if (canDrawShapeOutline == true) {
            fill("pink")
            line(lowestX, highestY, lowestX, lowestY);
            if (millis() % timer == 0) {
                line(highestX, highestY, highestX, lowestY);
            }
            noFill();
            canDrawShapeOutline = false;
            canDrawPoints = true;
        }
        
    }
    //draw shape itself
    function drawOutline() {
        beginShape();
        for (i = 0; i < coordSize; i++) {
            vertex(coordinates[i].x, coordinates[i].y);
        }
        endShape(CLOSE);
        drawPoints();
    }

    //draw shape points
    function drawPoints() {
        if (canDrawPoints && action < possiblePointSize && ticker < action + 1) {
            if (timer < millis()) {
                fill("red");
                ellipse(possiblePointCoords[ticker].x, possiblePointCoords[ticker].y, 5, 5);
                noFill();
                action++;
                ticker++;
            }
        }
        else if (action == possiblePointSize) {
            ticker = 0;
            action = 0;
            canDrawPoints = false;
        }
    }



    //visualize
    
    function draw() {
         if (!toggleDraw)
         {
            //background(220);
            drawShapeOutline()
            drawPoints();
            
            //drawShapeOutline();
            //showPoints();
            //divideShape();
            //showUsefulCoords("red");
            //PopulateOutline("blue");
         }
    }

    function runVis() {
        //drawOutline();
        /*drawShapeOutline();
        showPoints();
        divideShape();
        showUsefulCoords("red");
        PopulateOutline("blue");*/
    }

}

function setup() {
    createCanvas(720, 720);
    background(220);
}

{ // taken from GeeksForGeeks: 
    //Look up "How to check if a given point lies inside or outside a polygon?"

    // Given three collinear points p, q, r,
    // the function checks if point q lies
    // on line segment 'pr'
    function onSegment(p, q, r) {
        if (q.x <= Math.max(p.x, r.x) &&
            q.x >= Math.min(p.x, r.x) &&
            q.y <= Math.max(p.y, r.y) &&
            q.y >= Math.min(p.y, r.y)) {
            return true;
        }
        return false;
    }

    // To find orientation of ordered triplet (p, q, r).
    // The function returns following values
    // 0 --> p, q and r are collinear
    // 1 --> Clockwise
    // 2 --> Counterclockwise
    function orientation(p, q, r) {
        let val = (q.y - p.y) * (r.x - q.x)
            - (q.x - p.x) * (r.y - q.y);

        if (val == 0) {
            return 0; // collinear
        }
        return (val > 0) ? 1 : 2; // clock or counterclock wise
    }

    // The function that returns true if
    // line segment 'p1q1' and 'p2q2' intersect.
    function doIntersect(p1, q1, p2, q2) {


        /*// Driver Code
         polygon1 = [new Point(0, 0), new Point(10, 0), 
                    new Point(10, 10),new Point(0, 10)];
    
         let n = polygon1.length;
         let p = new Point(20, 20);
         if (isInside(polygon1, n, p))
            
         */

        // Find the four orientations needed for
        // general and special cases
        let o1 = orientation(p1, q1, p2);
        let o2 = orientation(p1, q1, q2);
        let o3 = orientation(p2, q2, p1);
        let o4 = orientation(p2, q2, q1);

        // General case
        if (o1 != o2 && o3 != o4) {
            return true;
        }

        // Special Cases
        // p1, q1 and p2 are collinear and
        // p2 lies on segment p1q1
        if (o1 == 0 && onSegment(p1, p2, q1)) {
            return true;
        }

        // p1, q1 and p2 are collinear and
        // q2 lies on segment p1q1
        if (o2 == 0 && onSegment(p1, q2, q1)) {
            return true;
        }

        // p2, q2 and p1 are collinear and
        // p1 lies on segment p2q2
        if (o3 == 0 && onSegment(p2, p1, q2)) {
            return true;
        }

        // p2, q2 and q1 are collinear and
        // q1 lies on segment p2q2
        if (o4 == 0 && onSegment(p2, q1, q2)) {
            return true;
        }

        // Doesn't fall in any of the above cases
        return false;
    }

    // Returns true if the point p lies
    // inside the polygon[] with n vertices
    function isInside(polygon, n, p) {
        // There must be at least 3 vertices in polygon[]
        if (n < 3) {
            return false;
        }

        // Create a point for line segment from p to infinite
        let extreme = new Point(INF, p.y);

        // Count intersections of the above line
        // with sides of polygon
        let count = 0, i = 0;
        do {
            let next = (i + 1) % n;

            // Check if the line segment from 'p' to
            // 'extreme' intersects with the line
            // segment from 'polygon[i]' to 'polygon[next]'
            if (doIntersect(polygon[i], polygon[next], p, extreme)) {
                // If the point 'p' is colinear with line
                // segment 'i-next', then check if it lies
                // on segment. If it lies, return true, otherwise false
                if (orientation(polygon[i], p, polygon[next]) == 0) {
                    return onSegment(polygon[i], p,
                        polygon[next]);
                }

                count++;
            }
            i = next;
        } while (i != 0);

        // Return true if count is odd, false otherwise
        return (count % 2 == 1); // Same as (count%2 == 1)
    }

}

function myFunction() {
    print("hello world!");
}
function isSquareInside(c, n, p) {
    cUR = new Point(p.x + tileSize, p.y); //upper right
    cLL = new Point(p.x, p.y + tileSize); //lower left
    cLR = new Point(p.x + tileSize, p.y + tileSize);
    return isInside(c, coordSize, p) && isInside(c, coordSize, cUR)
        && isInside(c, coordSize, cLL) && isInside(c, coordSize, cLR);
}


function algorithm() {
    //Create an array that keeps track of top left location of each tile

    for (row = lowestY; row < highestY; row += tileSize) {
        for (col = lowestX; col < highestX; col += tileSize) {
            possiblePointCoords[possiblePointSize] = new Point(col, row);
            possiblePointSize++;
        }
    }
    for (col = lowestX; col < highestX; col += tileSize) {
        for (row = lowestY; row < highestY; row += tileSize) {
            p = new Point(col, row);
            //Are we inside the shape?
            if (isSquareInside(coordinates, coordSize, p)) {
                newCoordinates[newCoordSize] = p;
                newCoordSize++;
            }
        }
    }
    //Create a bool array for tile generation later
}



//key press debug
function keyPressed() {
    if (keyCode == TAB) {
        algorithm();
        drawOutline();
        toggleDraw = false;
    }

}


//mouse press for points
function mousePressed() {
    if (toggleDraw) {
        coordinates[coordSize] = new Point(mouseX, mouseY);

        if (mouseX > highestX) highestX = mouseX;
        if (mouseY > highestY) highestY = mouseY;
        if (mouseX < lowestX) lowestX = mouseX;
        if (mouseY < lowestY) lowestY = mouseY;
        coordSize += 1;
        ellipse(mouseX, mouseY, 5, 5);
    }
}





/*
 TODO: Set the points to move independently of eachother per frame
 i.e.
 F1: 
 * 
 F2: 
 *
 * 
 F3: 
 *
 * 
 * 
 and so on...
 TODO: Make a web page using react.js
 TODO: Make a matrices visualization
 Good luck, kid


 */