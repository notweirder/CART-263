"use strict";

var socket;

/**
Description of preload
*/
function preload() {

}


/**
Description of setup
*/
function setup() {
createCanvas(500, 500)
background(51);

socket = io.connect('http://localhost:3000')
socket.on('mouse',newDrawing)
}

function newDrawing(data)
{
    noStroke()
    fill(255,0,100)
    ellipse(data.x ,data.y,50)
}

function mouseDragged()
{
    console.log('Sending: '+ mouseX + ',' + mouseY)
    noStroke()
    ellipse(mouseX,mouseY,50)
    
    var data = {
        x: mouseX,
        y: mouseY
    }

    socket.emit('mouse',data)
}

/**
Description of draw()
*/
function draw() {
}