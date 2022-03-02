var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"
var score;

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
}

function setup() {
  createCanvas(600, 600);
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;
  
  ghost = createSprite(300,300,20,25)
  ghost.addImage("ghost", ghostImg)
  ghost.scale = 0.4

  doorsGroup = new Group()
  climbersGroup = new Group()
  invisibleBlockGroup = new Group()
}



function draw() {
  background(200);

  text("Score: "+ score, 500,50);
  
if(gameState = "play") {
  score = score + Math.round(frameCount/60);
    if (score > 0 && score % 100 == 0) {
    checkPointSound.play()
  }

  if(tower.y > 400){
      tower.y = 300
    }

    if(keyDown("space")) {
      ghost.velocityY = -5;
  }
  if(keyDown("right_arrow")) {
    ghost.x = ghost.x +3;
}
if(keyDown("left_arrow")) {
  ghost.x = ghost.x -3;
}
  
  //add gravity
  ghost.velocityY = ghost.velocityY + 0.8

  if (climbersGroup.isTouching(ghost)) {
    ghost.velocityY = 0
  }
if(invisibleBlockGroup.isTouching(ghost) || ghost.y > 600) {
  ghost.destroy()
  gameState = "end"

  score.depth = ghost.depth + 1
  ghost.depth = ghost.depth
}

    spawnDoorsandclimbers()
  drawSprites()
}

if(gameState == "end") {
  
  fill("red")
  textSize(50)
  text("game over", 250,250)
  
  //  doorsGroup.setLifetimeEach(-1);
  //  climbersGroup.setLifetimeEach(-1);
  //  invisibleBlockGroup.setLifetimeEach(-1);
   
   
   
  //   doorsGroup.setVelocityYEach(0);
  //   climbersGroup.setVelocityYEach(0);
  //   invisibleBlockGroup.setVelocityYEach(0);

}
  
}

function spawnDoorsandclimbers() {
  //write code here to spawn the clouds
  if (frameCount % 200 === 0) {
     door = createSprite(600,-20,40,10);
    door.x = Math.round(random(190,450));
    door.addImage(doorImg);
    door.velocityY = 2;

    climber = createSprite(600,45,40,10);
    climber.x = door.x
    climber.addImage(climberImg);
    climber.velocityY = 2;

    invisibleBlock = createSprite(600,45,40,10);
    invisibleBlock.x = door.x
    invisibleBlock.velocityY = 2;
    invisibleBlock.visible = false

     //assign lifetime to the variable
    door.lifetime = 300;
    climber.lifetime = 300;
    invisibleBlock.lifetime = 300;
    // adjust the depth
    door.depth = ghost.depth;
    ghost.depth = ghost.depth + 1;
    
    //adding cloud to the group
   doorsGroup.add(door);
   climbersGroup.add(climber)
   invisibleBlockGroup.add(invisibleBlock)
    }
}