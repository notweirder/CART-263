/**
Pong Game
Eric Wieder 

Simple Pong-Style Game
*/

"use strict";

let currentSign = "x";
let grids = ["1","2","3","4","5","6","7","8","9",]

let playerTurn = true;

function preload() {
}


function setup() {
createCanvas(600,600);
 background(100)
textAlign(CENTER)
textSize(50)

}

function draw() {

background(100)
drawGrid();
checkWin();
}
function checkWin()
{
    if (grids[0] == grids[1] && grids[1] == grids[2])
    {
        print("X Wins!")
    }
    if (grids[0] == grids[1] && grids[1] == grids[2])
    {
        print("X Wins!")
    }if (grids[0] == grids[1] && grids[1] == grids[2])
    {
        print("X Wins!")
    }if (grids[0] == grids[1] && grids[1] == grids[2])
    {
        print("X Wins!")
    }if (grids[0] == grids[1] && grids[1] == grids[2])
    {
        print("X Wins!")
    }if (grids[0] == grids[1] && grids[1] == grids[2])
    {
        print("X Wins!")
    }if (grids[0] == grids[1] && grids[1] == grids[2])
    {
        print("X Wins!")
    }if (grids[0] == grids[1] && grids[1] == grids[2])
    {
        print("X Wins!")
    }

}
function drawGrid ()
{
    let rowDistance = 25;
    let colDistance = 25;
    let m = 0;
    for(let i = 0; i < 3; i++)
    {
        for (let k = 0; k < 3;k++)
        {
        text(grids[m],k+colDistance,i+rowDistance);
        colDistance = 25

        m++
        colDistance+=width/3

        }
        colDistance = 25
        rowDistance+=height/3

        } 
}

function mousePressed ()
{
    if (playerTurn)
    {
        currentSign = "X";
        playerTurn = false;
    }
    else 
    {
        currentSign = "O";
        playerTurn = true;
    }
    if (mouseX<200 && mouseY<200)
    {
        grids[0] = currentSign
    }
    else if (mouseX<400 && mouseY<200)
    {
        grids[1] = currentSign
    }else if (mouseX<600 && mouseY<200)
    {
        grids[2] = currentSign
    }else if (mouseX<200 && mouseY<400)
    {
        grids[3] = currentSign
    }else if (mouseX<400 && mouseY<400)
    {
        grids[4] = currentSign
    }else if (mouseX<600 && mouseY<400)
    {
        grids[5] = currentSign
    }else if (mouseX<200 && mouseY<600)
    {
        grids[6] = currentSign
    }else if (mouseX<400 && mouseY<600)
    {
        grids[7] = currentSign
    }
    else if (mouseX<600 && mouseY<600)
    {
        grids[8] = currentSign
    }
}