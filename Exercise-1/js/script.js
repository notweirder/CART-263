/**
Title of Project
Author Name

This is a template. You must fill in the title,
author, and this description to match your project!
*/

"use strict";


/**
Description of preload
*/
function preload() {

}


/**
Description of setup
*/

let timer = 0;
let freq = 1000;

let P1Score = 0;
let P2Score = 0;

let paddleWidth = 10;
let paddleHeight = 100;
let paddleSpeed = 10


let paddle1X = 20;
let paddle1Y = 0;
let paddle2X = 20;
let paddle2Y = 0;

let ballX = 100;
let ballY = 10;
let ballXAccel = 3;
let ballYAccel = 3;
let speedChange = -1.1;


function setup() {

createCanvas(500,500);
 paddle2X = width-paddleWidth-paddle2X;

}


/**
Description of draw()
*/
function draw() {

    background(0,255,0)
  
    fill(0)
    text(paddle1X,paddle1X,paddle1Y)
    text(paddle2X,paddle2X,paddle2Y)
    rect(paddle1X,paddle1Y,paddleWidth,paddleHeight)
    rect(paddle2X,paddle2Y,paddleWidth,paddleHeight)
    if (millis()>timer)
    {
        text(ballX,ballX,ballY)
        square(ballX,ballY,20)
        keyChecker()
         ballChecker()
   }
   
   pointsDisplay();


}



function keyChecker()
{

    if (keyIsDown(UP_ARROW))
    {
        paddle1Y-=paddleSpeed;
    }
    if (keyIsDown(DOWN_ARROW))
    {
        paddle1Y+=paddleSpeed;
    }
    if (keyIsDown(87))
    {
        paddle2Y-=paddleSpeed;
    }
    if (keyIsDown(83))
    {
        paddle2Y+=paddleSpeed;
    }
}
function ballChecker()
{
    if (ballY<=0)
    {
    ballYAccel*=speedChange;
    }
    if (ballY>height)
    {
        ballYAccel*=speedChange;
    }
    if (ballX<=paddle1X && (ballY>paddle1Y && ballY < paddle1Y+paddleHeight ))
    {
        ballXAccel*=speedChange;
        ballYAccel*=speedChange;
    }
    else if (ballY<paddle1Y || ballY > paddle1Y+paddleHeight){
    }
    if (ballX>=paddle2X && (ballY>paddle2Y && ballY < paddle2Y+paddleHeight))
    {
        ballXAccel*=speedChange;
        ballYAccel*=speedChange;
    }
    if (ballX<0)
    {
        P2Score++;
        ballX=width/2;
        ballY=height/2;
        speedChange=1;
        timer = freq + millis();
    }
     if (ballX>width)
    {
        P1Score++
        ballX=width/2;
        ballY=height/2;
        speedChange=1;
        timer = freq + millis();
    }
    
    ballX=ballX+ballXAccel;
    ballY=ballY+ballYAccel;


}
function pointsDisplay()
{
    noFill()
    for (let i = 1; i<=10;i++)
    {
        square(i*20,50,10)
    }

    noFill()
    for (let i = 1; i<=10;i++)
    {
        square(width-i*20,50,10)
    }

    fill(0)
    for (let i = 1; i<=P1Score;i++)
    {
        square(i*20,50,10)
    }

    fill(0)
    for (let i = 1; i<=P2Score;i++)
    {
        square(width-i*20,50,10)
    }
    
}