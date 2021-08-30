var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"


function preload() {
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
}

function setup() {
  createCanvas(600, 600);
  tower = createSprite(300, 300);
  tower.addImage("tower", towerImg);
  tower.velocityY = 1;

  ghost = createSprite(200, 200, 50, 50);
  ghost.scale = 0.3;
  ghost.addImage("ghost", ghostImg);

  doorsGroup = new Group();
  climbersGroup = new Group();
  invisibleBlockGroup = new Group();

}

function spawnDoors() {
  if (frameCount % 240 === 0) {
    door = createSprite(200, -50);
    climber = createSprite(200, 10);
    invisibleBlock = createSprite(200, 15);
    invisibleBlock.width = climber.width;
    invisibleBlock.height = 2;
    door.x = Math.round(random(120, 400));
    climber.x = door.x;
    door.addImage(doorImg);
    climber.addImage(climberImg);
    door.velocityY = 1;
    climber.velocityY = 1;
    invisibleBlock.velocityY = 1;
    door.lifetime = 800;
    climber.lifetime = 800;
    invisibleBlock.lifetime = 800;
    climbersGroup.add(climber);
    doorsGroup.add(door);
    invisibleBlockGroup.add(invisibleBlock);

  }

}
function draw() {
  background(200);
  if (gameState === "play") {
    spawnDoors();
    if (keyDown("left_arrow")) {
      ghost.x -= 4;
    }

    if (keyDown("right_arrow")) {
      ghost.x += 4;
    }

    if (keyDown("space")) {
      ghost.velocityY = -4;
    }
    ghost.velocityY += 0.4;


    if (climbersGroup.isTouching(ghost)) {
      ghost.velocityY = 0
    }

    if (invisibleBlockGroup.isTouching(ghost)) {
      ghost.destroy();
      gameState = "end"
    }


    if (tower.y > 400) {
      tower.y = 300
    }
    drawSprites();
  }
if (gameState==="end"){
  fill ("yellow")
  text ("Gameover",230,250);
}
}
