/**
Pong Game
Eric Wieder 

Simple Pong-Style Game
*/

"use strict";


let timer = 0;
let freq = 1000;
let gameOver = false;

let P1Score = 0;
let P2Score = 0;

let paddleWidth = 10;
let paddleHeight = 100;
let paddleSpeed = 10


let paddle1X = 20;
let paddle1Y = 0;
let paddle2X = 20;
let paddle2Y = 0;

let defaultBallSpeed = 3;
let ballX = 100;
let ballY = 10;
let ballXspeed = defaultBallSpeed;
let ballYspeed = defaultBallSpeed;
let ballAccel = -1.1;


function preload() {
}


function setup() {
createCanvas(500,500);
//moves the right paddle to the right side of the screen
 paddle2X = width-paddleWidth-paddle2X;
//text setup
 textAlign(CENTER)
 textSize(50)
}

function draw() {

    background(0,255,0)
    //displays end game text if the game ends
    if (P1Score == 10)
    {
        text('Player 1 Wins!',width/2,height/2)
    }
    else if (P2Score == 10)
        {
            text('Player 2 Wins!',width/2,height/2)
        }    
    else {
    //draw paddles
    fill(0)
    rect(paddle1X,paddle1Y,paddleWidth,paddleHeight)
    rect(paddle2X,paddle2Y,paddleWidth,paddleHeight)

    // runs the game if the current timer is "not running
    if (millis()>timer)
    {
        square(ballX,ballY,20)
        keyChecker()
        ballChecker()
   }
   //displays points
   pointsDisplay();
}
}

//moves the paddles up and down
function keyChecker()
{
    // if up is pressed and is not at the top, move the paddle up
    if (keyIsDown(UP_ARROW) && paddle1Y > 0)
    {
        paddle1Y-=paddleSpeed;
    }
    // if up is pressed and is not at the bottom, move the paddle down
    if (keyIsDown(DOWN_ARROW) && paddle1Y < height-paddleHeight)
    {
        paddle1Y+=paddleSpeed;
    }
     // if 'a' is pressed and is not at the top, move the paddle up
    if (keyIsDown(87) && paddle2Y > 0)
    {
        paddle2Y-=paddleSpeed;
    }
     // if 's'' is pressed and is not at the bottom, move the paddle down
    if (keyIsDown(83) && paddle2Y < height-paddleHeight)
    {
        paddle2Y+=paddleSpeed;
    }
}
function ballChecker()
{
    //bounces ball off the ceiling/floor
    if (ballY<=0)
    {
    ballYspeed*=-1
    }
    //bounces ball off the ceiling/floor
    if (ballY>=height)
    {
        ballYspeed*=-1
    }
    //if the ball hits the left paddle and is between it
    if (ballX<=paddle1X && (ballY>paddle1Y && ballY < paddle1Y+paddleHeight ))
    {
        //multiplies the ball speed by the acceleration and a random number between 1-1.5
        ballXspeed*=ballAccel*random(1,1.5);
        ballYspeed*=ballAccel*random(1,1.5);
    }
     //if the ball hits the left paddle and is between it
    if (ballX>=paddle2X-paddleWidth && (ballY>paddle2Y && ballY < paddle2Y+paddleHeight))
    {
        //multiplies the ball speed by the acceleration and a random number between 1-1.5
        ballXspeed*=ballAccel*random(1,1.5);
        ballYspeed*=ballAccel*random(1,1.5);
    }
    //if ball goes off screen to the left
    if (ballX<0)
    {
        //P2 scores
        P2Score++;
        //reset ball position
        ballX=width/2;
        ballY=height/2;
        //reset ball speed
        ballXspeed=defaultBallSpeed;
        ballYspeed=defaultBallSpeed;
        //create timer 
        timer = freq + millis();
    }
        //if ball goes off screen to the right
    if (ballX>width)
    {
        //P1 scores
        P1Score++;
        //reset ball position
        ballX=width/2;
        ballY=height/2;
        //reset ball speed
        ballXspeed=defaultBallSpeed;
        ballYspeed=defaultBallSpeed;
        //create timer 
        timer = freq + millis();

    }
    //moves the ball on the x and y
    ballX=ballX+ballXspeed;
    ballY=ballY+ballYspeed;


}


function pointsDisplay()
{
    //draws empty squares on left side
    noFill()
    for (let i = 1; i<=10;i++)
    {
        square(i*20,50,10)
    }
    //draws empty squares on right side
    noFill()
    for (let i = 1; i<=10;i++)
    {
        square(width-i*20,50,10)
    }
    //draws filled squares on left side
    fill(0)
    for (let i = 1; i<=P1Score;i++)
    {
        print(P1Score)
        square((i)*20,50,10)
    }
    //draws filled squares on right side
    fill(0)
    for (let i = 1; i<=P2Score;i++)
    {
        square(width-i*20,50,10)
    }
    
}