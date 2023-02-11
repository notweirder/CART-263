/**
Pong Game
Eric Wieder 

Simple Pong-Style Game
*/

"use strict";

let circles = [];
let angle;

let mouseXPositionAtStart = 0;
let mouseYPositionAtStart = 0;
let angleAtStart = 0;

let isStreching = true;

let stretchValue = 0;

function preload() {
}


function setup() {
noStroke();
createCanvas(500,500);
background(100)
rectMode(CENTER)
rectMode(CENTER)
angleMode(RADIANS)

for(let i = 0; i < 1; i ++)
{
    circles[i] = new Circle(250,250)
}

}

function draw() {
    background(100)

for(let i = 0; i < 1; i ++)
{
    circles[i] = new Circle(250,250)
    circles[i].stretch();
    circles[i].display();
    //circles[i].rebound();

}
}


function mouseDragged()
{
 

    if (isNaN(stretchValue))
    {
        stretchValue = 0;
    }
    else 
    {
        stretchValue = Math.abs(sqrt((mouseX-mouseXPositionAtStart)*(mouseX-250)+(mouseY-mouseYPositionAtStart)*(mouseY-250)))
    }
}   

function mouseReleased()
{
    stretchValue = 0;
}


class Circle 
{
    constructor (x,y)
    {
        this.x = x;
        this.y = y;
        
        this.length = 100;
        this.height = 100;
        
        this.r = 200;
        this.g = 100;
        this.b = 100;


    }
     display()
    {
        translate(this.x,this.y)
        rotate(angle)

        if(isStreching)
        {
            angleMode(DEGREES)
            angle *= 180 / 3.14


            print(angle)
            translate(-50,-50)


            angle *= 3.14 / 180
            angleMode(RADIANS)
        }
        fill(this.r,this.g,this.b) 
        rect(0,0,this.length,this.height)
        this.r-= (this.length - 100)
        this.g-= (this.length - 100)
        this.b-= (this.length - 100)

        fill(0)        
    }
    stretch()
    {
        if (mouseIsPressed)
        {
            isStreching = true;
            rectMode(CORNERS)
            // this.length = 100 + stretchValue/100
            // this.height = 100 - stretchValue/500
            // angle = angleAtStart;
            // this.r++;
            //translate(this.x-50,this.y-50)
            angle = Math.atan2(mouseY-this.y,mouseX-this.x) 

        }
        else 
        {
            isStreching = false;
            // this.length = 100;
            // this.height = 100;

            rectMode(CENTER)
            // // from https://stackoverflow.com/questions/57047934/how-to-make-an-object-rotate-in-the-direction-of-my-mouse-cursor
             angle = Math.atan2(mouseY-this.y,mouseX-this.x) 
             
        }

    }
    rebound()
    {
        
    }
}

    



