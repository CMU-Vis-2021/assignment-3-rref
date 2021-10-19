class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

var tileSize = 40; //10 by 10 pixels
var coordinatesX = [];
var coordinatesY = [];
var coordinates = [];
var newCoordinates = [];
var newCoordSize = 0;
var tileCoords = new Array();


var highestX = 0;
var highestY = 0;
var lowestX = 99999;
var lowestY = 99999;
var tiles = new Array();
var tick = 0;
var toggleDraw = true;
let INF = 10000;

//visualization code
{
    //draw up the shapes row and cols 
    function divideShape() {
        for (col = lowestX; col < highestX; col += tileSize) {
            line(col, highestY, col, lowestY);
        }
        for (row = lowestY; row < highestY; row += tileSize) {
            line(lowestX, row, highestX, row);
        }
    }

    function showPoints() {

        for (row = lowestY; row < highestY; row += tileSize) {
            for (col = lowestX; col < highestX; col += tileSize) {
                ellipse(col, row, 5,5);
            }
        }
        

    }
    //draw shape extents: min/max X/Y values
    function drawShapeOutline() {
        line(lowestX, highestY, lowestX, lowestY);
        line(highestX, highestY, highestX, lowestY);

        // ellipse(lowestX, highestY, 5,5);
        // ellipse(lowestX, lowestY, 5,5);
        // ellipse(highestX, highestY, 5,5);
        // ellipse(highestX, lowestY, 5,5);

    }
    //draw shape itself
    function drawOutline(coordinatesX, coordinatesY) {
        beginShape();

        for (i = 0; i < tick; i++) {
            vertex(coordinatesX[i], coordinatesY[i]);
        }
        endShape(CLOSE);
        drawPoints(coordinatesX, coordinatesY);
    }
    //draw shape points
    function drawPoints(coordinatesX, coordinatesY) {
        for (i = 0; i < tick; i++) {
            ellipse(coordinatesX[i], coordinatesY[i], 5, 5);
        }

    }


    //visualize
    function draw() {
/*         if (!toggleDraw)
             {
               background(220);
               drawPoints(coordinatesX, coordinatesY);
               drawOutline(coordinatesX, coordinatesY);
               drawShapeOutline();
               divideShape();
             }*/
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


function algorithm() {
    //Create an array that keeps track of top left location of each tile
    drawOutline(coordinatesX, coordinatesY)
    for (col = lowestX; col < highestX; col += tileSize) {
        for (row = lowestY; row < highestY; row += tileSize) {
            p = new Point(col, row);
            //Are we inside the shape?
            if (isInside(coordinates, tick, p)) {
                fill('red');
                ellipse(col, row, 5, 5);
                newCoordinates[newCoordSize] = p;
                newCoordSize++;
            }
        }
    }
    //Create a bool array for tile generation later
    PopulateOutline(coordinates);
}

function PopulateOutline(c) {
    //showPoints(coordinatesX, coordinatesY);
    for (i = 0; i < newCoordSize; i++) {
        fill("blue");
        cUL = newCoordinates[i]; //upper left

        /*cUR = newCoordinates[i]; //upper right
        cUR.x += tileSize;
        if (cUR.x > highestX || cUR.x < lowestX) continue;

        cLL = newCoordinates[i]; //lower left
        cLL.y += tileSize;
        if (cLL.y > highestY || cLL.y < lowestY) continue;

        cLR = newCoordinates[i]; //lower right
        cLR.y += tileSize;
        cLR.x += tileSize;
        if (cLR.x > highestX || cLR.x < lowestX) continue;
        if (cLR.y > highestY || cLR.y < lowestY) continue;
*/

        //rect(cUL.x, cUL.y, tileSize, tileSize);
        /*if (isInside(c, tick, cUL) && isInside(c, tick, cUR)
            && isInside(c, tick, cLL) && isInside(c, tick, cLR)) {
            rect(newCoordinates[i].x, newCoordinates[i].y, tileSize, tileSize);
        }*/
    }
    //fill("red");
    //showPoints(coordinatesX, coordinatesY);
}


//key press debug
function keyPressed() {
    if (keyCode == TAB) {
        toggleDraw = false;
        algorithm();
    }

}


//mouse press for points
function mousePressed() {
    if (toggleDraw) {
        coordinatesX[tick] = mouseX;
        coordinatesY[tick] = mouseY;
        coordinates[tick] = new Point(mouseX, mouseY);

        if (mouseX > highestX) highestX = mouseX;
        if (mouseY > highestY) highestY = mouseY;
        if (mouseX < lowestX) lowestX = mouseX;
        if (mouseY < lowestY) lowestY = mouseY;
        tick += 1;
        ellipse(mouseX, mouseY, 5, 5);
    }
}