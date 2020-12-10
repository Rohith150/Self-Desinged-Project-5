const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var engine, world;

var playImg, pauseImg, backgroundImg, boardImg, bowImg, arrowImg, pauseScreenImg;

var playButton, pauseButton, pauseScreen, homeButton, retryButton, resumeButton, restartButton;

var bow, arrow, board, sling;

var arrowCollider;

var gameState = "menu";

var score = 0;

var timer = 3;

var timeState = 0;

var slingState = 0;

var launchState = "attached";

var arrowSpawn = "no";

var canvas;

function preload() {
  playImg = loadImage('Images/play.png');
  pauseImg = loadImage('Images/pause.png');
  backgroundImg = loadImage('Images/background.png');
  boardImg = loadImage('Images/board.png');
  bowImg = loadImage('Images/bow.png');
  arrowImg = loadImage('Images/arrow.png')
  pauseScreenImg = loadImage('Images/pauseScreen.png');
}
function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  engine = Engine.create();
  world = engine.world;

  playButton = createSprite(windowWidth / 2, windowHeight / 2 + 200);
  playButton.addImage(playImg);

  arrow = new Arrow(windowWidth / 7, windowHeight / 1.5, 250, 70, PI / 2);
  sling = new Sling(arrow.body, { x: windowWidth / 6.1, y: windowHeight / 1.9 });
}

function draw() {
  background(backgroundImg);

  Engine.update(engine);

  if (keyDown(UP_ARROW)) {
    score++;
  }

  switch (score) {
    case 79:
      board.x = random(602, 1436);
      board.y = random(364, 303);
      score++;
      break;

    case 79:
      board.x = random(602, 1436);
      board.y = random(364, 303);
      score++;
      break;
  }


  if (frameCount % 25 === 0 && gameState === "play") {
    timer--;
  }

  if (timer > 0 && gameState === "play") {
    textSize(600);
    text(timer, windowWidth / 2.8, windowHeight / 1.5);
  }

  if (timer <= 0) {
    timeState = 1;
  }

  if (gameState === "play") {
    arrowCollide();
  }

  allTheIfConditions();



  drawSprites();

  if (gameState === "menu") {
    fill("Brown");
    textSize(200);
    text("Archery", windowWidth / 3.5, windowHeight / 3.0);
  }

  if (gameState === "play") {
    textSize(30);
    text("score: " + score, windowWidth / 1.3, windowHeight / 9.5);
  }
}

function play() {
  gameState = "play";
  pauseButton = createSprite(windowWidth / 1.05, windowHeight / 9.5);
  pauseButton.addImage(pauseImg);
  pauseButton.scale = 1;
  bow = createSprite(windowWidth / 6, windowHeight / 1.5);
  bow.addImage(bowImg);
  bow.scale = 0.4;
  board = createSprite(windowWidth / 1.5, windowHeight / 2);
  board.addImage(boardImg);
}

function pause() {
  gameState = "pause";
  pauseButton.destroy();
  pauseScreen = createSprite(windowWidth / 2, windowHeight / 2);
  pauseScreen.addImage(pauseScreenImg);
  homeButton = createSprite(windowWidth / 1.81, windowHeight / 1.83, 50, 50);
  homeButton.setCollider("circle", 0, 0, 25);
  homeButton.visible = false;
  resumeButton = createSprite(windowWidth / 2, windowHeight / 1.86, 60, 60);
  resumeButton.setCollider("circle", 0, -3, 30);
  resumeButton.visible = false;
  restartButton = createSprite(windowWidth / 2.24, windowHeight / 1.83, 50, 50);
  restartButton.setCollider("circle", 0, 0, 25);
  restartButton.visible = false;
}

function mouseDragged() {
  if (timeState === 1 && launchState === "attached") {
    Matter.Body.setPosition(arrow.body, { x: mouseX, y: mouseY });
  }
}

function mouseReleased() {
  if (slingState === 1 && timeState === 1) {
    sling.fly();
    launchState = "launched";
  }
  slingState = 1;
}

function arrowCollide() {
  if (gameState === "play") {
    arrowCollider = createSprite(0, 0, 1, 1);
    arrowCollider.visible = false;
    arrowCollider.x = arrow.body.position.x + 106.8;
    arrowCollider.y = arrow.body.position.y + 0.8;
  }

  if(arrowCollider.isTouching(board) && gameState === "play" && launchState === "launched") {
    score = score + 50;
    arrowCollider.destroy();
    Matter.Body.setVelocity(arrow.body, {x: 0, y: 0});
    Matter.Body.setStatic(arrow.body, true);
    arrowSpawn = "yes"
  }

  if(arrow.body.position.x > 1 || arrow.body.position.y > windowWidth / 1){
    arrowSpawn = "yes";
  }

  canvas.mousePressed(()=>{
    if(arrowSpawn === "yes"){
    Matter.Body.setPosition(arrow.body, {x: windowWidth / 7, y: windowHeight / 1.5});
    sling.attach(arrow.body);
  }
  })
  
}
