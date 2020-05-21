//import * as PIXI from 'pixi.js';


const app = new PIXI.Application({ backgroundColor: 0xF0FFFF });
document.getElementById("canvas").appendChild(app.view);

const w = app.screen.width / 2;
const h = app.screen.height / 2;

const parallelogramOpt = {
    width: 2,
    color: 0x0000ff
};
const circleOpt = {
    width: 2,
    color: 0xffff00
};
DrawButton.onclick = function() {
    normalizeFields();
    pointsX = [parseInt(document.getElementById("1x").value), parseInt(document.getElementById("2x").value), parseInt(document.getElementById("3x").value)];
    pointsY = [parseInt(document.getElementById("1y").value), parseInt(document.getElementById("2y").value), parseInt(document.getElementById("3y").value)];
    xO = (pointsX[0] + pointsX[2]) / 2;
    yO = (pointsY[0] + pointsY[2]) / 2;
    pointsX[3] = (2 * xO - pointsX[1]);
    pointsY[3] = (2 * yO - pointsY[1]);
    draw();
}

pointsX = [parseInt(document.getElementById("1x").value), parseInt(document.getElementById("2x").value), parseInt(document.getElementById("3x").value)];
pointsY = [parseInt(document.getElementById("1y").value), parseInt(document.getElementById("2y").value), parseInt(document.getElementById("3y").value)];

xO = (pointsX[0] + pointsX[2]) / 2;
yO = (pointsY[0] + pointsY[2]) / 2;
pointsX.push(2 * xO - pointsX[1]);
pointsY.push(2 * yO - pointsY[1]);

//S
function FindS() {
    a = {
        x: pointsX[0] - pointsX[1],
        y: pointsY[0] - pointsY[1]
    }
    b = {
        x: pointsX[2] - pointsX[1],
        y: pointsY[2] - pointsY[1]
    }

    return Math.abs(a.x * b.y - a.y * b.x);
}

function FindR() {
    return Math.sqrt(FindS() / Math.PI);
}

let graphicp1 = new PIXI.Graphics();
let graphicp2 = new PIXI.Graphics();
let graphicp3 = new PIXI.Graphics();
let graphicParallelogram = new PIXI.Graphics();
let graphicCircle = new PIXI.Graphics();
const graphicsContainer = new PIXI.Container();
graphicsContainer.addChild(graphicParallelogram, graphicCircle);
graphicsContainer.x = w;
graphicsContainer.y = h;

function clear() {
    graphicParallelogram.clear();
    graphicCircle.clear();
}

function upDateTable() {
    document.getElementById("Svalue").value = parseFloat(FindS());
    document.getElementById("1x").value = pointsX[0];
    document.getElementById("2x").value = pointsX[1];
    document.getElementById("3x").value = pointsX[2];
    document.getElementById("1y").value = pointsY[0];
    document.getElementById("2y").value = pointsY[1];
    document.getElementById("3y").value = pointsY[2];
}


function normalizeFields() {
    if (document.getElementById("1x").value >= 400) {
        document.getElementById("1x").value = 400;
    }
    if (document.getElementById("1x").value <= -400) {
        document.getElementById("1x").value = -400;
    }
    if (document.getElementById("2x").value >= 400) {
        document.getElementById("2x").value = 400;
    }
    if (document.getElementById("2x").value <= -400) {
        document.getElementById("2x").value = -400;
    }
    if (document.getElementById("3x").value >= 400) {
        document.getElementById("3x").value = 400;
    }
    if (document.getElementById("3x").value <= -400) {
        document.getElementById("3x").value = -400;
    }
    if (document.getElementById("1y").value >= 300) {
        document.getElementById("1y").value = 300;
    }
    if (document.getElementById("1y").value <= -300) {
        document.getElementById("1y").value = -300;
    }
    if (document.getElementById("2y").value >= 300) {
        document.getElementById("2y").value = 300;
    }
    if (document.getElementById("2y").value <= -300) {
        document.getElementById("2y").value = -300;
    }
    if (document.getElementById("3y").value >= 300) {
        document.getElementById("3y").value = 300;
    }
    if (document.getElementById("3y").value <= -300) {
        document.getElementById("3y").value = -300;
    }

}

function draw() {
    clear();
    graphicp1.beginFill(0xff0000);
    graphicp1.drawCircle(0, 0, 5.5);
    graphicp2.beginFill(0xff0000);
    graphicp2.drawCircle(0, 0, 5.5);
    graphicp3.beginFill(0xff0000);
    graphicp3.drawCircle(0, 0, 5.5);
    graphicp1.x = w + pointsX[0];
    graphicp1.y = h + pointsY[0];
    graphicp2.x = w + pointsX[1];
    graphicp2.y = h + pointsY[1];
    graphicp3.x = w + pointsX[2];
    graphicp3.y = h + pointsY[2];
    pointsX = [graphicp1.x - w, graphicp2.x - w, graphicp3.x - w];
    pointsY = [graphicp1.y - h, graphicp2.y - h, graphicp3.y - h];
    xO = (pointsX[0] + pointsX[2]) / 2;
    yO = (pointsY[0] + pointsY[2]) / 2;
    pointsX[3] = (2 * xO - pointsX[1]);
    pointsY[3] = (2 * yO - pointsY[1]);
    graphicParallelogram.lineStyle(parallelogramOpt);
    graphicParallelogram.moveTo(graphicp1.x - w, graphicp1.y - h);
    graphicParallelogram.lineTo(graphicp2.x - w, graphicp2.y - h);
    graphicParallelogram.lineTo(graphicp3.x - w, graphicp3.y - h);
    graphicParallelogram.lineTo(pointsX[3], pointsY[3]);
    graphicParallelogram.lineTo(graphicp1.x - w, graphicp1.y - h);
    graphicCircle.lineStyle(circleOpt);
    graphicCircle.drawCircle(xO, yO, FindR());
    upDateTable();
}

function drawOnMove() {
    upDateTable();
    clear();
    pointsX = [graphicp1.x - w, graphicp2.x - w, graphicp3.x - w];
    pointsY = [graphicp1.y - h, graphicp2.y - h, graphicp3.y - h];
    xO = (pointsX[0] + pointsX[2]) / 2;
    yO = (pointsY[0] + pointsY[2]) / 2;
    pointsX[3] = (2 * xO - pointsX[1]);
    pointsY[3] = (2 * yO - pointsY[1]);
    graphicParallelogram.lineStyle(parallelogramOpt);
    graphicParallelogram.moveTo(graphicp1.x - w, graphicp1.y - h);
    graphicParallelogram.lineTo(graphicp2.x - w, graphicp2.y - h);
    graphicParallelogram.lineTo(graphicp3.x - w, graphicp3.y - h);
    graphicParallelogram.lineTo(pointsX[3], pointsY[3]);
    graphicParallelogram.lineTo(graphicp1.x - w, graphicp1.y - h);
    graphicCircle.lineStyle(circleOpt);
    graphicCircle.drawCircle(xO, yO, FindR());
}

graphicp1.interactive = true;
graphicp1.buttonMode = true;
graphicp1
    .on('pointerdown', onDragStart)
    .on('pointerup', onDragEnd)
    .on('pointerupoutside', onDragEnd)
    .on('pointermove', onDragMove);
graphicp2.interactive = true;
graphicp2.buttonMode = true;
graphicp2
    .on('pointerdown', onDragStart)
    .on('pointerup', onDragEnd)
    .on('pointerupoutside', onDragEnd)
    .on('pointermove', onDragMove);
graphicp3.interactive = true;
graphicp3.buttonMode = true;
graphicp3
    .on('pointerdown', onDragStart)
    .on('pointerup', onDragEnd)
    .on('pointerupoutside', onDragEnd)
    .on('pointermove', onDragMove);

app.stage.addChild(graphicp1, graphicp2, graphicp3, graphicsContainer);


function onDragStart(event) {
    // store a reference to the data
    // the reason for this is because of multitouch
    // we want to track the movement of this particular touch
    this.data = event.data;
    this.position.set(this.data.getLocalPosition(this.parent).x, this.data.getLocalPosition(this.parent).y);
    this.pivot.set(this.data.getLocalPosition(this).x, this.data.getLocalPosition(this).y);
    this.alpha = 0.5;
    this.dragging = true;

}

function onDragEnd() {
    this.alpha = 1;
    this.dragging = false;
    console.log(this.x, this.y);
    this.data = null;
}

function onDragMove() {
    if (this.dragging) {
        const newPosition = this.data.getLocalPosition(this.parent);
        if (newPosition.x >= 800) {
            newPosition.x = 800;
        }
        if (newPosition.x <= 0) {
            newPosition.x = 0;
        }
        if (newPosition.y >= 600) {
            newPosition.y = 600;
        }
        if (newPosition.y <= 0) {
            newPosition.y = 0;
        }
        this.x = newPosition.x;
        this.y = newPosition.y;
        drawOnMove();
    }
}

function reset() {
    clear();
    graphicp1.clear();
    graphicp2.clear();
    graphicp3.clear();
    document.getElementById("1x").value = 0;
    document.getElementById("2x").value = 0;
    document.getElementById("3x").value = 0;
    document.getElementById("1y").value = 0;
    document.getElementById("2y").value = 0;
    document.getElementById("3y").value = 0;
    document.getElementById("Svalue").value = 0;
}

function about() {
    var x = document.getElementById("aboutDIV");
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
}

resetButton.onclick = reset;
aboutButton.onclick = about;