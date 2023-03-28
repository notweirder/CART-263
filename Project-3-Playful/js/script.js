let submitCardButton;
let selectedCard;
const deckSize = 3;
let deck = [];

let deckGridPoints = [];

let p1;

let e1;

let gameStart = false;
let isRoundSetUp = false;

let isRoundOver = false;

let b1;

let enemyNum = 1;


function setup() {
	 selectedCard = new Card(0,0,0,0,0);
	createCanvas(windowWidth, windowHeight);

  p1 = new Player();
  e1 = new Enemy();
submitCardButton = createButton('submit card')
submitCardButton.size(100,100)
submitCardButton.position(width/2-50,650)
submitCardButton.mousePressed(submitCard)

  
  textAlign(CENTER);
  rectMode(CENTER);
  // Normal program setup goes here
  populateDeck();
  MQTTsetup();
}

function draw() {
  if (isConnected) {
    if (!gameStart)
    {
      background(255)
      fill(0)
      textSize(30)
      textAlign(CENTER)
      text('game ends when one of your bars is half the size of the other',width/2,100)
      text('after you attack the enemy will attack back',width/2,150)
      text('NOTE: THIS IS A ROUGH DEMO',width/2,250)
      text('CARDS, ENEMIES, ETC. ARE ALL TEMPORARY',width/2,300)

      text('click to start',width/2,height/2)

    }
    else {
    if (isgameOver(p1) == true)
    {
      background(255)
      textAlign(CENTER)
      fill('red')
      textSize(75)
    text('game over!', width/2,height/2)
    textSize(30)
    text('refresh browser!', width/2,100)


    }
    else 
    {
      textSize(30)
    background(50);
    textAlign(CORNER)
    fill(255)
    text('enemy health',width-600,40)
    text('click to select card',width/2-150,300)

    for (let i = 0; i < deckSize; i++) {	
	selectCard(deck[i]);	
	deck[i].slideTo(deckGridPoints[i]+350, 500);
	  deck[i].hoverOver();
      deck[i].display();
	noStroke()
    }
    p1.display();
	e1.display();
  }
  rectMode(CENTER);
  if (isRoundOver == true)
	{
	}
  isRoundOver == false;
  console.log(isRoundOver)
}
  }
}
function changeBG() {
  let val = random(255);
  background(val);
}
function populateDeck() {
  for (let i = 0; i < deckSize; i++) {
    deck.push(new Card(0, 0, (i + 1)* 10, i));
    deckGridPoints.push(
      deck[i].width  + deck[0].width * i
    )
  }
}

class Card {
  constructor(xLocation, yLocation, value, position, type) {
	this.xOriginal = xLocation
	this.yOriginal = yLocation


    this.pos = position;
    this.x = xLocation;
    this.y = yLocation;
	
	this.target = yLocation -200;

    this.width = 200;
    this.height = 280;
    this.value = value;

    this.fontSize = (150) / this.value.toString().length;

	this.isHoveredOver = false;

	

  }
  //lerps from one x+y value to another
  	slideTo(x1, y1) {
    this.x = Math.ceil(lerp(this.x, x1, 0.05));
    this.y = Math.ceil(lerp(this.y, y1, 0.05));
	this.xOriginal = this.x;
	this.yOriginal = this.y;
  }

  hoverOver() {
    if (
      mouseX > this.xOriginal - (this.width) / 2 &&
      mouseX <= this.xOriginal + (this.width) / 2 &&
      mouseY > this.yOriginal - (this.height) / 2 &&
      mouseY < this.yOriginal + (this.height) / 2
    ) {
		strokeWeight(3)
		stroke(0)
		this.isHoveredOver = true;
		//this.y = lerp(this.y,this.target,0.10)	
		//sendMQTTMessage("0" + "/" + this.pos + "/" + this.y);
	}
	else{
		this.isHoveredOver = false;
	}
  }

  //displays the card
  display() {
	if (this.value == selectedCard.value)
	{
		fill('#ebf2ff')	
	}
	else{
		fill(255);
	}
    textAlign(CENTER);
	if (this.isHoveredOver == true)
	{
	rect(this.x, this.y, this.width*1.2, this.height*1.2, 20);
	}
	else
	{
		rect(this.x, this.y, this.width, this.height, 20);
	}
    fill(0);
    textSize(this.fontSize/1.5);
    text('DMG', this.x, this.y-100 + this.fontSize / 4);
    textSize(this.fontSize);
    text(this.value, this.x, this.y + this.fontSize / 4);
    textAlign(LEFT);
	noStroke();
  }

  //displays the "backside" of the card
  cardFlip() {
    let movePatternDown = 20;
    //print(this.number, "hidden")
    fill(204, 22, 22);
    rect(this.x, this.y, this.width, this.height, 20);
    fill(186, 13, 13);
    beginShape();
    vertex(this.x, this.y + this.height - 250 + movePatternDown);
    vertex(this.x - 100, this.y + this.height - 300 + movePatternDown);
    vertex(this.x, this.y + this.height - 350 + movePatternDown);
    vertex(this.x + 100, this.y + this.height - 300 + movePatternDown);
    vertex(this.x, this.y + this.height - 250 + movePatternDown);
    endShape();
    beginShape();
    vertex(this.x, this.y + this.height - 250 + movePatternDown);
    vertex(this.x - 100, this.y + this.height - 175 + movePatternDown);
    vertex(this.x + 100, this.y + this.height - 175 + movePatternDown);
    vertex(this.x, this.y + this.height - 250 + movePatternDown);
    endShape();
    beginShape();
    vertex(this.x, this.y + this.height - 350 + movePatternDown);
    vertex(this.x - 100, this.y + this.height - 425 + movePatternDown);
    vertex(this.x + 100, this.y + this.height - 425 + movePatternDown);
    vertex(this.x, this.y + this.height - 350 + movePatternDown);
    endShape();
  }
}

class Player {
  constructor() {
	this.x = 200;
	this.y = 400;
    this.fire = 100;
    this.air = 100;
    this.water = 100;
    this.earth = 100;
  }
  display() {
    rectMode(CORNER);
    fill(255);
    rect(this.x, this.y, this.x, 300);
    fill("yellow");
    rect(this.x, this.y -125*2, 50, this.fire*2);
    fill("red");
    rect(this.x+50, this.y -125*2 , 50, this.air*2);
    fill("blue");
    rect(this.x+100, this.y -125*2, 50, this.water*2);
    fill("black");
    rect(this.x+150, this.y -125*2 , 50, this.earth*2);
  }
}

class Enemy {
	constructor() {
		this.x = 1100;
		this.y = 200;
		this.health = 100;
	  }
	  display() {
		rectMode(CORNER);
		fill(0);
		rect(this.x, this.y, 300, 500);
    fill(255)
    text('Enemy',this.x+35,this.y+100)
    text(enemyNum,this.x+125,this.y+200)
    fill(0)
		rect(this.x-200,50,500,50)
		fill('red')
		rect(this.x-200,50,this.health*5,50)
	  }
}


function selectCard(card)
{
	if (card.isHoveredOver == true && mouseIsPressed)
	{
		selectedCard = card;
	}
}

function submitCard()
{
  if (e1.health>0)
  {
    e1.health = e1.health - selectedCard.value;
    enemyAttack(p1)
  }
  if (e1.health<=0)
  {
    e1.health = 100;
    enemyNum++;
  }
}

function enemyAttack(player)
{
  this.randomRoll = int(random(4))
  if (this.randomRoll == 0)
  {
    player.fire -= int(random(20))
  }
  if (this.randomRoll == 1)
  {
    player.air -= int(random(20))
  }  
  if (this.randomRoll == 2)
  {
    player.water -= int(random(20))
  }
  if (this.randomRoll == 3)
  {
    player.earth -= int(random(20))
  }

}

function isgameOver(player)
{
  if (player.fire>player.air*2||player.fire>player.water*2||player.fire>player.earth*2)
  {
    return true;
  }
  else if (player.earth>player.air*2||player.earth>player.water*2||player.earth>player.fire*2)
  {
    return true;
  }
  else if (player.air>player.earth*2||player.air>player.water*2||player.air>player.fire*2)
  {
    return true;
  }
  else if (player.water>player.air*2||player.water>player.earth*2||player.water>player.fire*2)
  {
    return true;
  }
  else
  {
    return false;
  }

}

function mousePressed()
{
  gameStart = true;
}