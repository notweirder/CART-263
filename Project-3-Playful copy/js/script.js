let selectedCard;
let handSize = 3;
let deck = [];
let cardsDealt = [];
let hand = [];

let a = [];



let player1;
let player2;
let enemy1;

let gameStart = false;
let isRoundOver = false;

let enemyNum = 1;
let floorNum = 1;
let table;

let enemyAttackAnimationStart = false;
let playerAttackAnimationStart = false;
let playerAttackAnimationStart2 = false;


let tutorialStage = 0;

let enemyAttackAnimationStartDelay;
let playerAttackAnimationStartDelay 
let playerAttackAnimationStartDelay2;

let endOfRoundDelay;

let submitCardButton;


let errorList = [1]


let didPlayer1Submit = false;
let didPlayer2Submit = false;;

function preload()
{
  table = loadTable("Cards .csv", "csv", "header");
}

function setup() {


  enemyAttackAnimationStartDelay = new Timer(6000);
  playerAttackAnimationStartDelay = new Timer(0);
  playerAttackAnimationStartDelay2 = new Timer(2000);
  let roundOverTimer = new Timer(6000);

  endOfRoundDelay = new Timer (3200)

  img = loadImage("assets/images/E1.png");
  img2 = loadImage("assets/images/P1.png");

  selectedCard = new Card(0, 0, 0, 0, 0);
  createCanvas(windowWidth, windowHeight);

  player1 = new Player(50,300,50,300, 'player1');
  player2 = new Player(350,300,350,300, 'player2');
  enemy1 = new Enemy();
  submitCardButton = new Button(width/2-50,400,100,submitCard)

  textAlign(CENTER);
  rectMode(CENTER);
  // Normal program setup goes here
  populateDeck();
  MQTTsetup();
}

function draw() {
  if (isConnected) {
    if (isgameOver(player1) == true) {
      displayGameOver();
    }
    else {
      background(50);
      
      player1.display();
      player2.display();
      enemy1.display();

      enemy1.playAnimation();
      player1.playAnimation();
      player2.playAnimation();
      for (let i = 0; i < 3; i++) {
        rectMode(CENTER);
        selectCard(hand[i]);

        hand[i].hoverOver();
  
        hand[i].display();
        hand[i].slideTo(200*i+500,700)
        noStroke();
        submitCardButton.display()
      }
      text(floorNum,width-250,height-10)
    }

      endOfRound();
      if (tutorialStage < 8)
      {
        tutorial();
      }
  }
}


function populateDeck() {
  for (let r = 0; r < table.getRowCount(); r++) {
    deck[r] = new Card(width, height-200, parseInt(table.getString(r, 3)),table.getString(r, 2),table.getString(r, 4),table.getString(r, 5),table.getString(r, 6));
    deck = shuffle(deck, true);

  }
      hand[0] = Object.create(deck[int(random(7))])
      hand[1] = Object.create(deck[int(random(7))])
      hand[2] = Object.create(deck[int(random(7))])

  updateHand();
}

function updateHand() {


      if (selectedCard == hand[0])
      {
        console.log('yes')
        hand[0] = Object.create(hand[1]);
        hand[1] = Object.create(hand[2]);
        hand[2] = Object.create(deck[int(random(7))])
      }
      if (selectedCard == hand[1])
      {
        console.log('yes')
        hand[0] = Object.create(hand[0])
        hand[1] = Object.create(hand[2])
        hand[2] = Object.create(deck[int(random(3))])

      }
       if (selectedCard == hand[2])
      {
        hand[2] = Object.create(deck[int(random(3))])
      }

      //  console.log(hand[0].value)
      //  console.log(hand[1].value)
      //  console.log(hand[2].value)

    // if (hand[i] == selectedCard)
    // {
    //   hand[i] = deck[int(random(deck.length))]
    //   for (let j = 0; j < deck.length; j++)
    //   {
    //     if (hand[i] == cardsDealt[j])
    //     hand[i] = deck[int(random(deck.length))]
    //   }
    // }
    // else {
    //   hand[i] = deck[i]
    // }
    // console.log(hand[i])
  }


class Card {
  constructor(xLocation, yLocation, value, type, target, playerOrEnemy, ID) {
    
    this.x = xLocation;
    this.y = yLocation;

    this.width = 200;
    this.height = 280;
    this.value = value;

    this.fontSize = 150 / this.value.toString().length / 1.2;

    this.isHoveredOver = false;

    this.type = type;

    this.target = target;

    this.playerOrEnemy = playerOrEnemy;

    this.ID = ID;

    this.colors = ["red", "yellow", "white", "black"];

  }
  //lerps from one x+y value to another
  slideTo(x1, y1) {
    this.x = Math.ceil(lerp(this.x, x1, 0.05));
    this.y = Math.ceil(lerp(this.y, y1, 0.05));
  }

  hoverOver() {
    if (
      mouseX > this.x - this.width / 2 &&
      mouseX <= this.x + this.width / 2 &&
      mouseY > this.y - this.height / 2 &&
      mouseY < this.y + this.height / 2
    ) {
      stroke(0);
      this.isHoveredOver = true;
      //this.y = lerp(this.y,this.target,0.10)
      //sendMQTTMessage("0" + "/" + this.pos + "/" + this.y);
    } else {
      this.isHoveredOver = false;
    }
  }

  //displays the card
  display() {
    rectMode(CENTER);
    textAlign(CENTER);
    stroke(0)
    // if (this.ID == selectedCard.ID)
    // {
    //  strokeWeight(5)
    // }

    
   fill('#ebdfab')
    if (this.isHoveredOver == true) {
      //larger if hovered over
      rect(this.x, this.y, this.width * 1.2, this.height * 1.2, 20);
    } else {
      //regular sized card
     rect(this.x, this.y, this.width, this.height, 20);
    }
    

    for (let i = 0; i < this.colors.length; i++)
    {
      if (this.target == i)
      {
        fill(this.colors[i])
        rect(this.x,this.y,this.width/1.2,100 ,10)
      }
   }
    textFont("Caveat")
    fill(0);
    textSize(this.fontSize / 1.5);
    if (this.playerOrEnemy == "player")
    {
      text("player", this.x, this.y - 100 + this.fontSize / 4);
    }
     if (this.playerOrEnemy == "enemy")
    {
      text("enemy", this.x, this.y - 100  + this.fontSize / 4);
    }
    if (this.target == 3)
    {
      fill(255)
    }
    if (this.type == "ATK")
    {
      text("↑", this.x+50, this.y-10 + this.fontSize / 4);
    }
    else if (this.type == "HL")
    {
      text("↓", this.x+50, this.y-10  + this.fontSize / 4);
    }

    textSize(this.fontSize);
    if (this.target == 3)
    {
      fill(255)
    }
    text(this.value, this.x-20, this.y + this.fontSize / 4 );
    textAlign(LEFT);
    noStroke();
  }

  //displays the "backside" of the card
  cardFlip() {}
}

class Player {
  constructor(x,y,xOriginal,yOriginal,playerNum) {
    this.x = x;
    this.y = y;
    this.xOriginal = xOriginal;
    this.yOriginal = yOriginal;
    this.playerNum = playerNum;
    this.colors = ["red", "yellow", "white", "black"];
    this.humors = [50, 50, 50, 50];

    this.state1 = false;
    this.moveSpeed = 1;
  }
  display() {
    
    rectMode(CORNER);
    fill(255);
    image(img2, this.x, this.y, 200 * 1.5, 300 * 1.5);
    if (myName == "p1")
    {
    for (let i = 0; i < this.humors.length; i++) {
      if (this.xOriginal == 50)
      {
      //outlined rectangles
      noFill();
      stroke(0);
      strokeWeight(1);
      //uses a quadtratic formula to make the arc shape
      rect((i + 1) * 100 - 25, 20 * Math.pow(i + 1 - 2.5, 2) + 25, 50, 100 * 2);
      
      //filled rectangles
      noStroke();
      //fills each rectangle a different color based on the colors array
      fill(this.colors[i]);
      //uses the sames quadtratic formula to make the arc shape
      rect(
        (i + 1) * 100 - 25,
        20 * Math.pow(i + 1 - 2.5, 2) + 25,
        50,
        this.humors[i] * 2
      );
    }
  }
  }
}
  playAnimation()
  {

    if ((playerAttackAnimationStart && playerAttackAnimationStartDelay.expired()) && this.playerNum == 'player1'|| (playerAttackAnimationStart2 && playerAttackAnimationStartDelay2.expired() && this.playerNum == 'player2'))
    {
      if (this.state1 == false)
      {
      this.moveSpeed+= 0.5
      this.x += this.moveSpeed;
      }
      if (this.x >= this.xOriginal+100)
      {
        this.state1 = true;
        this.moveSpeed = 1;
      }
      if (this.state1 == true)
      {
        this.moveSpeed+= 0.05
        this.x -= this.moveSpeed;
      }
      if (this.state1 == true && this.x <= this.xOriginal)
      {
        this.state1 = false;
        if (this.playerNum == 'player1')
        {
          playerAttackAnimationStart = false
        }
        else{
          playerAttackAnimationStart2 = false;
        }
        this.x = this.xOriginal;
        playerAttack(enemy1)
        enemyAttackAnimationStartDelay.start();
      }
      }
}
}

class Enemy {
  constructor() {
    this.x = 1100;
    this.y = 275;
    this.xOriginal = 1100;
    this.yOriginal = 275;

    this.colors = ["red", "yellow", "white", "black"];
    this.humors = [50,50,50,50];
    this.state1 = false;
    this.moveSpeed = 1
  }
  display() {
    rectMode(CORNER);
    fill(0);
    image(img, this.x, this.y, 300 * 1.2, 400 * 1.2);
    for (let i = 0; i < this.humors.length; i++) {
      noFill();
      stroke(0);
      strokeWeight(1);
      rect(
        (i + 1) * 100 + 1000,
        20 * Math.pow(i + 1 - 2.5, 2) + 25,
        50,
        100 * 2
      );
      noStroke();
      fill(this.colors[i]);
      rect(
        (i + 1) * 100 + 1000,
        20 * Math.pow(i + 1 - 2.5, 2) + 25,
        50,
        this.humors[i] * 2
      );
    }
  }
  playAnimation()
  {
    if (enemyAttackAnimationStart && enemyAttackAnimationStartDelay.expired())
    {
      if (this.state1 == false)
      {
      this.moveSpeed+= 0.5
      this.x -= this.moveSpeed;
      }
      if (this.x <= this.xOriginal-100)
      {
        this.state1 = true;
        this.moveSpeed = 1;
      }
      if (this.state1 == true)
      {
        this.moveSpeed+= 0.05
        this.x += this.moveSpeed;
      }
      if (this.state1 == true && this.x > this.xOriginal)
      {
        this.state1 = false;
        enemyAttackAnimationStart = false
        this.x = this.xOriginal
        enemyAttack(player1)
      }
      }
}
}

class Button 
{
  constructor(x,y,size,funct)
  {
    this.x = x;
    this.y = y;
    this.size = size;
    this.function = funct;
  }
  display()
  {
    fill(0,100,400)
    rect(this.x+10,height-300,this.size*2,this.size,20)
    textSize(50)
      fill(255)
      textAlign(CENTER)
    text('SUBMIT',this.x,height-300)
  }
  runFunction()
  {
    this.function.call()
  }

}


function selectCard(card) {
  if (card.isHoveredOver && mouseIsPressed) {
    selectedCard = card; 
  }
}

// function updateDeck()
// {
//   function findSelectedCardIndex(value) 
//     {
//       return value === selectedCard
//     }
//   deck[deck.findIndex(findSelectedCardIndex)] = deck[int(random(deck.length-1))];
//   for (i = 0; i < deck.length-1; i++)
//   {
//     if (deck[i] == -1)
//     {
//       deck[i] = deck[random(deck.length-1)]
//     }
// }

//}

function submitCard() {
  //  constructor(xLocation, yLocation, value, type, target, playerOrEnemy, ID) {



  sendMQTTMessage('selectCard' + '/' + selectedCard.ID.toString())
  cardsDealt.push(selectedCard)
  enemyAttackAnimationStart = true;
  playerAttackAnimationStart = true;
  playerAttackAnimationStartDelay.start();
  endOfRoundDelay.start();
  didPlayer1Submit = false;
  didPlayer2Submit = false;


}

function playerAttack(enemy)
{
  if (selectedCard.playerOrEnemy == "enemy")
  {
if (enemy.humors[selectedCard.target] > 0 && selectedCard.type == "ATK" ) {
    enemy.humors[selectedCard.target] -= selectedCard.value;
  }
  if (enemy.humors[selectedCard.target] < 100 && selectedCard.type == "HL") {
    enemy.humors[selectedCard.target] += selectedCard.value;
  }
  else if (player1.humors[selectedCard.target] > 100)
  {
  }
  }

  if (selectedCard.playerOrEnemy == "player")
  {
if (player1.humors[selectedCard.target] > 0 && selectedCard.type == "ATK" ) {
  player1.humors[selectedCard.target] -= selectedCard.value;
  }
  if (player1.humors[selectedCard.target] < 100 && selectedCard.type == "HL") {
    player1.humors[selectedCard.target] += selectedCard.value;
  }
}

  if (isgameOver(enemy1)) {
 
      enemy1 = new Enemy();
      enemyNum++;
      floorNum++;  
    
  }
}

function enemyAttack() {
  let randomHumor = int(random(4));
    player1.humors[randomHumor] -= 10;
    enemyAttackAnimationStartDelay.reset();
}


function isgameOver(player) {
  for (let i = 0; i < player.humors.length - 1; i++) {
    for (let j = 0; j < player.humors.length - 1; j++) {
      if (
        player.humors[i] > player.humors[j + 1] * 2 ||
        player.humors[i] * 2 < player.humors[j + 1]
      ) {
        return true;
      } else {
      }
    }
  }
}

function mousePressed() {
  gameStart = true;
  if (
    mouseX > submitCardButton.x &&
    mouseX <= submitCardButton.x + submitCardButton.size &&
    mouseY > submitCardButton.y &&
    mouseY < submitCardButton.y + submitCardButton.size
  ) {
  submitCardButton.runFunction()
  isRoundOver = true;
}
tutorialStage++;

}

function keyPressed()
{
  if (keyCode == 32)
  tutorialStage = 1000;
}

function displayGameOver() {
  fill(255);
  rect(0,0,width,height)
  textAlign(CENTER);
  fill("red");
  textSize(75);
  text("game over!", width / 2, height / 2 - 100);
  textSize(30);
  text("refresh browser!", width / 2, 100);
}

function endOfRound()
{
   if (isRoundOver)
   {
    //updateDeck();
    updateHand();
    isRoundOver = false;
   }
}

function displayErrors ()
{

  if (errorHasMaxHealthAlready)
  {

  }
}

function tutorial ()
{
  textSize(60)
  rectMode(CORNER)
  if (tutorialStage == 0)
  {
    fill(0,95)
    rect(0,0,width,height)
    fill(255)
    textAlign(CENTER)
    text('Welcome to Balancing Act!',width/2,height/2-100)
    text('Click to continue',width/2,height/2+100)
    text('Or press space to skip the tutorial',width/2,height/2+200)

  }
  if (tutorialStage == 1)
  {
    fill(0,95)
    rect(0,0,width,height)
    fill(255)
    textAlign(CENTER)
    text('This game is a co-operative card based fighter!',width/2,height/2-100)
    text('Lets take you through the basics',width/2,height/2)
    text('Click to continue',width/2,height/2+200)

  }
  if (tutorialStage == 2)
  {
    fill(0,95)
    rect(0,0,width,height)
    fill(255,50)
    rect(0,0,500,300,20)
    rect(width-500,0,500,300,20)
    fill(50)
    rect(0,300,width,height-100)
    fill(255)
    textAlign(CENTER)
    text('You and the enemy each have four Humor bars',width/2,height/2)
    text('You can think of these as health bars',width/2,height/2+100)
    text('Click to continue',width/2,height/2+300)
  }
  if (tutorialStage == 3)
  {
    fill(0,95)
    rect(0,0,width,height)
    fill(255,50)
    rect(0,0,500,300,20)
    rect(width-500,0,500,300,20)
    fill(50)
    rect(0,300,width,height-100)
    fill(255)
    textAlign(CENTER)
    text('If one of your Humors is twice as large as anohter..',width/2,height/2)
    text('Its game over!',width/2,height/2+100)
    text('Click to continue',width/2,height/2+300)
  }
  if (tutorialStage == 4)
  {
    fill(0,95)
    rect(0,0,width,height)
    fill(255,50)
    rect(0,0,500,300,20)
    rect(width-500,0,500,300,20)
    fill(50)
    rect(0,300,width,height-100)
    fill(255)
    textAlign(CENTER)
    text('But same goes for your enemies!',width/2,height/2)
    textSize(45)
    text('If you manage to get one of their Humors to be twice as large as another, theyre defeated!',width/2,height/2+100)
    text('Click to continue',width/2,height/2+300)
  }
  if (tutorialStage == 5)
  {
    fill(0,95)
    rect(0,0,width,height)
    fill(255,50)
    rect(width/2-375,height-300,700,400,20)
    fill(50)
    rect(0,0,width,height-300)
    fill(255)
    textAlign(CENTER)
    text('Cards are the key to victory!',width/2,100)
    text('The top of the card indicates who its affecting',width/2,200)
    textSize(45)
    text('The middle color indicates which humor its targeting',width/2,300)
    text('The middle arrow and number indicates which way it swings the humor and how far',width/2,400)
    text('Click to continue',width/2,475)
  }
  if (tutorialStage == 6)
  {
    fill(0,95)
    rect(0,0,width,height)
    fill(255,50)
    rect(width/2-375,height-300,700,400,20)
    fill(50)
    rect(0,0,width,height-300)
    fill(255)
    textAlign(CENTER)
    text('Click on a card to select it',width/2,100)
    text('Hit Submit to use that card',width/2,200)
    text('The enemy will then attack',width/2,300)

    text('Click to continue',width/2,450)
  }
  if (tutorialStage == 7)
  {
    fill(0,95)
    rect(0,0,width,height)
    fill(255,50)
    rect(width/2-375,height-300,700,400,20)
    fill(50)
    rect(0,0,width,height-300)
    fill(255)
    textAlign(CENTER)
    text('Communicate and use your wits to succeed!',width/2,100)
    text('Make it past three enemies to win!',width/2,200)
    text('Good luck!',width/2,300)
    text('Click to finish the tutorial',width/2,450)
  }
}