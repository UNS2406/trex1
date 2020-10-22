//TREX GAme by Sristi using JS



//Declare riables for game objects and behaviour indicators(FLAGS)
var PLAY, END, gameState;

var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;

var cloud, cloudsGroup, cloudImage;
var obstacle, obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;

var score, highScore;

var gameOver, gameOverImg, restartIcon, restartImg;


function preload(){
  //Create Media library and load to use it during the course of the software
  //executed only once at the start of the program
  
  trex_running  = loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided = loadAnimation("trex_collided.png");

  groundImage = loadImage("ground2.png");
  
  cloudImage = loadImage("cloud.png");
  
  obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");
  obstacle3 = loadImage("obstacle3.png");
  obstacle4 = loadImage("obstacle4.png");
  obstacle5 = loadImage("obstacle5.png");
  obstacle6 = loadImage("obstacle6.png");
  
  restartImg  = loadImage("restart.png");
  gameOverImg = loadImage("gameOver.png");
  

}

function setup() {
  //define the intial environment of the software(before it is used)
  //by defining the declared variables with default values
  //executed only once at the start of the program
  
  createCanvas(600, 200);
  
  trex = createSprite(50,180,20,50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("collided" ,trex_collided);
  trex.scale = 0.5;
  trex.setCollider("circle",0,0,40);
  trex.debug = false;
  
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  
  //create Obstacle and Cloud Groups
  obstaclesGroup = createGroup();
  cloudsGroup = createGroup();
  
  gameOver = createSprite(300,100);
  gameOver.addImage(gameOverImg);
  gameOver.scale = 0.5;
  
  restartIcon = createSprite(300,140);
  restartIcon.addImage(restartImg);
  restartIcon.scale = 0.5;
  
  score     = 0;
  highScore = 0;
  
  PLAY = 1;
  END  = 0;
  gameState = PLAY;
  
}

function draw() {
  //All modifications, changes, conditions, manipulations, actions during the course of the program are written inside function draw.
  //All commands that are supposed to be executed and checked continously or applied throughout the program are written inside function draw.
  //function draw is executed for every frame created since the start of the program.
  
  
  background(180);
  //displaying score
  text("Score: "+ score, 500,50);
  
  
  if(gameState === PLAY){
   
    gameOver.visible     = false;
    restartIcon.visible  = false;
  
    //scoring
    score = score + Math.round(frameCount/60);
    
    //movement of the ground and treadmill effect
    ground.velocityX = -4;
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
    
    //trex movement
    //jump when the space key is pressed
    if((keyDown("up") || keyDown("space")) && trex.y >= 100) {
        trex.velocityY = -12;
    }
    //add gravity
    trex.velocityY = trex.velocityY + 0.8;
  
    //function CAll to spawn the clouds
    spawnClouds();
  
    //function CAll to spawn obstacles on the ground
    spawnObstacles();
    
    if(obstaclesGroup.isTouching(trex)){
        gameState = END;
    }
  }
  else if (gameState == END) {
    
      gameOver.visible    = true;
      restartIcon.visible = true;
     
      ground.velocityX = 0;
      
      //change the trex behaviour
      trex.changeAnimation("collided", trex_collided);
      trex.velocityY   = 0;
     
      //set behaviour of game objects so that they are paused and not moving
      obstaclesGroup.setLifetimeEach(-1);
      obstaclesGroup.setVelocityXEach(0);
    
      cloudsGroup.setLifetimeEach(-1);
      cloudsGroup.setVelocityXEach(0);
   }
  
 
  //stop trex from falling down
  trex.collide(invisibleGround);
  drawSprites();
}

//function definition to spawn/create/make cactus on the ground
function spawnObstacles(){
 if (frameCount % 60 === 0){
   var obstacle = createSprite(600,165,10,40);
   obstacle.velocityX = -6;
   
    //generate random obstacles images
    var rand = Math.round(random(1,7));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
              break;
      case 2: obstacle.addImage(obstacle2);
              break;
      case 3: obstacle.addImage(obstacle3);
              break;
      case 4: obstacle.addImage(obstacle4);
              break;
      case 5: obstacle.addImage(obstacle5);
              break;
      case 6: obstacle.addImage(obstacle6);
              break;
      default:obstacle.addImage(obstacle6);
              break;
    }
   
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.5;
    obstacle.lifetime = 300;
   
   //add each obstacle to the group
   obstaclesGroup.add(obstacle);
 }
}


//function definition to create or spawn or make clouds as game objects
function spawnClouds() {
  if (frameCount % 60 == 0) {
     cloud = createSprite(600,100,40,10);
     cloud.y = random(10,60);
     cloud.addImage(cloudImage);
     cloud.scale = 0.5;
     cloud.velocityX = -3;
    
     //assign lifetime to the variable
     cloud.lifetime = 134;
    
     //adjust the depth
     cloud.depth = trex.depth;
     trex.depth = trex.depth + 1;
    
     //adding cloud to the group
     cloudsGroup.add(cloud);
  }
}

