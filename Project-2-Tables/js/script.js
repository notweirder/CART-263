//CSV TABLE
let table;

//DATAPOINTS ARRAY
let dataPoints = [];

//COUNTER
let counter = 0;

//GENRE ARRAYS
let actionTable = [];
let adventureTable = [];
let platformerTable = [];
let puzzleTable = [];
let rpgTable = [];
let shooterTable = [];
let simulationTable = [];
let sportsTable = [];
let strategyTable = [];
let racingTable = [];
let roguelikeTable = [];
let runningTable = [];
let currentTable = [];

//SORT ORDER ARRAY
let sortOrder = [
  "design",
  "documentation",
  "tools",
  "technical",
  "testing",
  "bugs",
  "prototyping",
  "scope",
  "feature-creep",
  "cutting-features",
  "delays",
  "crunch-time",
  "communication",
  "team",
  "budget",
  "multiple-projects",
  "planning",
  "security",
  "marketing",
  "monetization",
];

//loads the csv file
function preload() {
  table = loadTable("dataset.csv", "csv", "header");
}

function setup() {
  //creates a canvas that is the browser's width and height
  createCanvas(windowWidth, windowHeight);

  //fills the dataPoints array with data from the csv file
  // from class presentation
  for (let r = 0; r < table.getRowCount(); r++) {
    dataPoints[r] = new DataPoint(
      table.getString(r, 0),
      table.getString(r, 4),
      table.getString(r, 2),
      table.getString(r, 5),
      table.getString(r, 6),
      table.getString(r, 7),
      table.getString(r, 8),
      table.getString(r, 9),
      table.getString(r, 10)
    );
  }
  //populates the genre tables
  populateGenreTables();

  //default current genre table (set to adventure currently)
  currentTable = adventureTable;
}

function draw() {
  //draws background
  background(255);

  //updates the grid
  updateGrid();

  //displays the user guide
  userGuide();

  //draws grid that is the closest perfect square to the current array length, rounding up
  for (let i = 0; i < Math.ceil(Math.sqrt(currentTable.length)); i++) {
    for (let j = 0; j < Math.ceil(Math.sqrt(currentTable.length)); j++) {
      //does the following if the current number of squares drawn is less than the length of the array
      if (counter < currentTable.length) {
        //updates the square's x and y position
        currentTable[counter].x = i * size;
        currentTable[counter].y = j * size;
        //draws the squares
        currentTable[counter].drawSquares();
        //the hoverOver function
        hoverOver(currentTable[counter]);

        //displays text for each square if space is pressed
        if (keyIsPressed && keyCode === 32) {
          currentTable[counter].drawText();
        }
        //increases the counter as long as the counter is less than the length of the array
        counter++;
      }
    }
  }
  //resets counter
  counter = 0;
}

//displays a text guide to describe the features of the program
function userGuide() {
  //static text to describe what to do
  textAlign(CENTER);
  noStroke();
  fill(0);
  textSize(20);
  text("Hover mouse for desc.", width - 625, 25);
  text("Hold space for guide", width - 625, 50);
  fill(100);
  text("Press key for genre", width - 625, 150);

  //text that scales if the genre is currently displayed grid
  if (currentTable == actionTable) {
    textSize(30);
    fill(0);
  } else {
    textSize(20);
    fill(100);
  }
  text("Action: 1", width - 625, 200);
  if (currentTable == adventureTable) {
    textSize(30);
    fill(0);
  } else {
    textSize(20);
    fill(100);
  }
  text("Adventure: 2", width - 625, 250);
  if (currentTable == platformerTable) {
    textSize(30);
    fill(0);
  } else {
    fill(100);
    textSize(20);
  }
  text("Platformer: 3", width - 625, 300);
  if (currentTable == puzzleTable) {
    textSize(30);
    fill(0);
  } else {
    fill(100);
    textSize(20);
  }
  text("Puzzle: 4", width - 625, 350);
  if (currentTable == rpgTable) {
    textSize(30);
    fill(0);
  } else {
    fill(100);
    textSize(20);
  }
  text("RPG: 5", width - 625, 400);
  if (currentTable == shooterTable) {
    textSize(30);
    fill(0);
  } else {
    fill(100);
    textSize(20);
  }
  text("Shooter: 6", width - 625, 450);
  if (currentTable == simulationTable) {
    textSize(30);
    fill(0);
  } else {
    fill(100);
    textSize(20);
  }
  text("Simulation: 7", width - 625, 500);
  if (currentTable == sportsTable) {
    textSize(30);
    fill(0);
  } else {
    fill(100);
    textSize(20);
  }
  text("Sports: 8", width - 625, 550);
  if (currentTable == strategyTable) {
    textSize(30);
    fill(0);
  } else {
    fill(100);
    textSize(20);
  }
  text("Strategy: 9", width - 625, 600);
  if (currentTable == racingTable) {
    textSize(30);
    fill(0);
  } else {
    fill(100);
    textSize(20);
  }
  text("Racing: Q", width - 625, 650);
  if (currentTable == roguelikeTable) {
    textSize(30);
    fill(0);
  } else {
    fill(100);
    textSize(20);
  }
  text("Roguelike: W", width - 625, 700);
  if (currentTable == runningTable) {
    textSize(30);
    fill(0);
  } else {
    fill(100);
    textSize(20);
  }
  text("Runner: E", width - 625, 750);
}

//replaces currentTable with the corresponding genre to the key pressed
function updateGrid() {
  if (keyIsPressed) {
    if (keyCode === 49) {
      currentTable = actionTable;
    }
    if (keyCode === 50) {
      currentTable = adventureTable;
    }
    if (keyCode === 51) {
      currentTable = platformerTable;
    }
    if (keyCode === 52) {
      currentTable = puzzleTable;
    }
    if (keyCode === 53) {
      currentTable = rpgTable;
    }
    if (keyCode === 54) {
      currentTable = shooterTable;
    }
    if (keyCode === 55) {
      currentTable = simulationTable;
    }
    if (keyCode === 56) {
      currentTable = sportsTable;
    }
    if (keyCode === 57) {
      currentTable = strategyTable;
    }
    if (keyCode === 81) {
      currentTable = racingTable;
    }
    if (keyCode === 87) {
      currentTable = roguelikeTable;
    }
    if (keyCode === 69) {
      currentTable = runningTable;
    }
  }
  //changes the scale of the squares depending on how large the array is
  size = map(currentTable.length, 0, 200, 100, 50);
}

//populates each resepctive genre table depending on the genre
function populateGenreTables() {
  for (let i = 1; i < table.getRowCount(); i++) {
    if (dataPoints[i].genre == "action") {
      actionTable.push(dataPoints[i]);
      actionTable = actionTable.sort(compare);
    } else if (dataPoints[i].genre == "adventure") {
      adventureTable.push(dataPoints[i]);
      adventureTable = adventureTable.sort(compare);
    } else if (dataPoints[i].genre == "rpg") {
      rpgTable.push(dataPoints[i]);
      rpgTable = rpgTable.sort(compare);
    } else if (dataPoints[i].genre == "simulation") {
      simulationTable.push(dataPoints[i]);
      simulationTable = simulationTable.sort(compare);
    } else if (dataPoints[i].genre == "strategy") {
      strategyTable.push(dataPoints[i]);
      strategyTable = strategyTable.sort(compare);
    } else if (dataPoints[i].genre == "puzzle") {
      puzzleTable.push(dataPoints[i]);
      puzzleTable = puzzleTable.sort(compare);
    } else if (dataPoints[i].genre == "sports") {
      sportsTable.push(dataPoints[i]);
      sportsTable = sportsTable.sort(compare);
    } else if (dataPoints[i].genre == "shooter") {
      shooterTable.push(dataPoints[i]);
      shooterTable = shooterTable.sort(compare);
    } else if (dataPoints[i].genre == "racing") {
      racingTable.push(dataPoints[i]);
      racingTable = racingTable.sort(compare);
    } else if (dataPoints[i].genre == "roguelike") {
      roguelikeTable.push(dataPoints[i]);
      roguelikeTable = roguelikeTable.sort(compare);
    } else if (dataPoints[i].genre == "running") {
      runningTable.push(dataPoints[i]);
      runningTable.sort(compare);
    } else if (dataPoints[i].genre == "platformer") {
      platformerTable.push(dataPoints[i]);
      platformerTable.sort(compare);
    }
  }
}

//sorts game issues based on the custom sort array
// from https://www.youtube.com/watch?v=MWD-iKzR2c8 and https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
function compare(a, b) {
  if (sortOrder.indexOf(a.type) > sortOrder.indexOf(b.type)) {
    return 1;
  }
}

function hoverOver(square) {
  //standardizes "management-people/management-feature into simply 'management' "
  square.group = square.group.replace("management-people", "management");
  square.group = square.group.replace("management-feature", "management");

  //checks to see if mouse is within the square
  if (
    mouseX > square.x &&
    mouseX <= square.x + size &&
    mouseY > square.y &&
    mouseY < square.y + size
  ) {
    noStroke();
    //fills rectangle to be the same color as the hovered quare
    fill(square.color);

    //displays a large rectangle on the right
    rect(1000, 0, 500, height);

    //checks to see if the text is legible
    checkForContrast(square.color);

    //updates the textSize depending on the length of the text
    textSize(map(square.game.length, 0, 50, 40, 15));
    //displays game name
    text("Game: " + square.game, 1250, 75);

    textSize(20);
    //displays game release year
    text("Release Year: " + square.year, 1250, 125);

    //updates the textSize depending on the length of the text
    textSize(map(square.group.length, 0, 50, 40, 10));
    //displays game issue category
    text("Issue Category: " + square.group.replace("-", " "), 1250, 200);

    //updates the textSize depending on the length of the text
    textSize(map(square.type.length, 0, 50, 35, 10));
    //displays game specific issue
    text("Specific Issue: " + square.type.replace("-", " "), 1250, 250);

    textSize(20);
    //displays the text: "Developer Quote"
    text("Developer Quote", 1250, 325);

    //displays the developer quote
    textAlign(LEFT);
    //updates the textSize depending on the length of the text
    textSize(map(square.quote.length, 0, 3000, 15, 10.5));
    text('"' + square.quote + '"', 1025, 350, 450, 450);
  }
}

//checks to see if the square is a certain color, changes color of fill for text if so
function checkForContrast(color) {
  if (
    color == "#0000a4" ||
    color == "#00004b" ||
    color == "#000031" ||
    color == "#1a1e76" ||
    color == "#1a3aa6" ||
    color == "#343785" ||
    color == "#01579b" ||
    color == "#a83432"
  ) {
    fill(255);
  } else {
    fill(0);
  }
}

//class for the datapoints
class DataPoint {
  constructor(ID, game, year, platform, genre, mode, group, type, quote) {
    this.ID = ID;
    this.game = game;
    this.year = year;
    this.platform = platform;
    this.genre = genre;
    this.mode = mode;
    this.group = group;
    this.type = type;
    this.quote = quote;

    this.x;
    this.y;
  }

  //draws square
  //colours from https://colorswall.com/
  drawSquares() {
    strokeWeight(3);
    stroke(0);
    //changes fill depending on game development issue
    if (this.type == "design") {
      this.color = "#a83432";
    } else if (this.type == "documentation") {
      this.color = "#ff2424";
    } else if (this.type == "tools") {
      this.color = "#ff4747";
    } else if (this.type == "technical") {
      this.color = "#ff6b6b";
    } else if (this.type == "testing") {
      this.color = "#ff8f8f";
    } else if (this.type == "bugs") {
      this.color = "#ffb3b3";
    } else if (this.type == "prototyping") {
      this.color = "#ffd6d6";
    } else if (this.type == "scope") {
      this.color = "#4fc3f7";
    } else if (this.type == "feature-creep") {
      this.color = "#03a9f4";
    } else if (this.type == "cutting-features") {
      this.color = "#0288d1";
    } else if (this.type == "delays") {
      this.color = "#01579b";
    } else if (this.type == "crunch-time") {
      this.color = "#3350b0";
    } else if (this.type == "communication") {
      this.color = "#1a3aa6";
    } else if (this.type == "team") {
      this.color = "#0000a4";
    } else if (this.type == "budget") {
      this.color = "#00004b";
    } else if (this.type == "multiple-projects") {
      this.color = "#000031";
    } else if (this.type == "planning") {
      this.color = "#343785";
    } else if (this.type == "security") {
      this.color = "#1a1e76";
    } else if (this.type == "marketing") {
      this.color = "#0eed46";
    } else if (this.type == "monetization") {
      this.color = "#469611";
    } else {
      this.color = "#000000";
    }
    //draws square with updated fill
    fill(this.color);
    square(this.x, this.y, size);
  }

  //draws text on each square
  drawText() {
    textSize(10);
    noStroke();
    //checks to see if the text is legible
    checkForContrast(this.color);
    //displays text
    text(this.type, this.x + size / 2, this.y + size / 2);
  }
}
