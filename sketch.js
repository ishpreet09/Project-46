var board, bunny, coin, flower, ground, heart, stair, star, tree, gi, ji;
var bunny3;
var score=0;

var SERVE=0;
var PLAY=1;
var END=2;
var gameState=SERVE;

function preload(){
  board=loadImage("Images/board.png");
  thorn1=loadImage("Images/thorns.png");
  bunny=loadAnimation("Images/bunny1.png","Images/bunny2.png","Images/bunny3.png");
  bunny5=loadImage("Images/bunny1.png");
  bunny6=loadImage("Images/bunny2.png");
  coin=loadImage("Images/coin.png");
  flower=loadImage("Images/flower.png");
  ground=loadImage("Images/ground.png");
  ground2=loadImage("Images/groundflying.png");
  heart=loadImage("Images/heart.png");
  stair=loadImage("Images/stair.png");
  star=loadImage("Images/star.png");
  tree=loadImage("Images/tree.png");
 // ji=loadImage("Images/runningman.gif");
  //gi=createImg("Images/source.gif");
  but=loadImage("Images/play.png");
  trophie2=loadImage("Images/Trophie.jpg");
  button=loadImage("Images/cross.png");
  back2=loadImage("Images/white.png");
}

function setup() {
  createCanvas(800,400);
  //createSprite(400, 200, 50, 50);
  score = 0;

 tree0=new Group();
 flower0=new Group();
 ground3=new Group();
 invi=new Group();
 thornGroup=new Group();

 button=createSprite(400,200);
 button.addImage(but);
 button.scale=0.8;

 bunny4=createSprite(140,330);
 bunny4.scale=0.5;
 bunny4.addAnimation("running",bunny);
 //bunny4.debug=true;
 bunny4.setCollider("circle",0,15,80);

 board1=createSprite(50,330);
 board1.addImage(board);

 ground1=createSprite(400,400,400,20);
 ground1.addImage(ground);
 ground1.scale=2.8;
 ground1.x = ground1.width/2;
 // ground1.velocityX = -(6 + 3*score/100);

 // white=createSprite(400,200);
 // white.addImage(back2);
 // white.scale=0.5;
//
 // trophie=createSprite(400,70);
//  trophie.addImage(trophie2);
//  trophie.scale=0.1;

 // cross=createSprite(470,30);
 // cross.addImage(button);

  //cross.scale = 0.025;

 // white.visible=false;
  //trophie.visible=false;
 // cross.visible = false;
 // restart.visible = false;
  invisibleGround = createSprite(400,390,800,20);
  invisibleGround.visible = false;
  //invisibleGround.debug=true;

}

function draw() {
   background(198,241,255); 
   text("Score: "+ score, 700,25);
   
   //gi.position(100,100);
   

 if(gameState===SERVE){
 ground1.velocityX=0;
  button.visible=true;
  bunny4.visible=false;
  board1.visible=true;
  bunny4.visible=true;
 // bunny4.addImage(bunny5);
  if(mousePressedOver(button)){
     gameState=PLAY;
   }
 }
else if(gameState===PLAY){
 //bunny4.collide(invisibleGround);
  if(keyDown("UP_ARROW")){
   bunny4.velocityY=-10;
  }

  bunny4.velocityY = bunny4.velocityY +0.8;

 

 if (ground1.x < 0){
   ground1.x = ground1.width/2;
      //back.x=back.width/2;
  }
 
 if(bunny4.isTouching(ground3)){
  bunny4.velocityY = 0;
 }


  bunny4.collide(invisibleGround);
 // bunny4.collide(ground3);
 
 ground1.velocityX=-(6 + 3*score/100);
  
  button.visible=false;
  
  board1.visible=false;
  spawnground();
 spawntree();
 spawnFlower();
 spawnThorns();
 bunny4.visible=true; 
 
 if(thornGroup.isTouching(bunny4)){
      gameState=END;
  }

}

else if(gameState===END){
     ground1.velocityX=0;   
     bunny4.velocityY=0;
     bunny4.visible=false;
     thornGroup.setVisibleEach(false);
     //cloudsGroup.setVisibleEach(false);
     thornGroup.setVelocityXEach(0);
     tree0.setVelocityXEach(0);
     flower0.setVelocityXEach(0);
     ground3.setVelocityXEach(0);
     invi.setVelocityXEach(0);

    //change the trex animation
    bunny4.changeAnimation("collided",bunny5);
    
    //set lifetime of the game objects so that they are never destroyed
     thornGroup.setLifetimeEach(-1);
     tree0.setLifetimeEach(0);
     flower0.setLifetimeEach(0);
     ground3.setLifetimeEach(0);
     invi.setLifetimeEach(0);
   // cloudsGroup.setLifetimeEach(-1);
    
    
}
  
  drawSprites();
}

function spawnground() {
  //write code here to spawn the clouds
    if (frameCount % 150 === 0) {
    var ground0 = createSprite(800,150);
    var invisible=createSprite(800,150);
    ground0.y = Math.round(random(100,200));
    ground0.addImage(ground2);
    invisible.x=ground0.x;
    invisible.y=ground0.y;
    invisible.width=ground0.width-45;
    invisible.height=10;
    invisible.velocityX=-3;
    invisible.visible=false;
    //invisible.debug=true;
    invisible.setCollider("rectangle",0,10,ground0.width-50,65)
    ground0.scale = 0.75;
    ground0.velocityX = -3;
   // ground0.debug=true;
    ground0.setCollider("rectangle",0,-45,ground0.width,20)

     //assign lifetime to the variable
     ground0.lifetime = 800/3;
    
    //adjust the depth
    ground0.depth = bunny4.depth;
    bunny4.depth = bunny4.depth + 1;
    
    //add each cloud to the group
    ground3.add(ground0);
    invi.add(invisible);
  }
  
}

function spawntree() {
  
    if(frameCount % 120 === 0) {
    var tree1 = createSprite(800,280);
    //obstacle.debug = true;
    tree1.velocityX = -(6 + 3*score/100);
    tree1.addImage(tree);
    tree1.scale=0.85;

   tree1.depth=bunny4.depth;
   bunny4.depth=bunny4.depth+1;

    tree1.lifetime = 300;
    //add each obstacle to the group
    tree0.add(tree1);
  }
}

function spawnFlower() {
  
  if(frameCount % 100 === 0) {
  var flower1 = createSprite(800,350);
  //obstacle.debug = true;
  flower1.velocityX = -(6 + 3*score/100);
  flower1.addImage(flower);
  flower1.scale=0.1;

 flower1.depth=bunny4.depth;
 bunny4.depth=bunny4.depth+1;

  flower1.lifetime = 300;
  //add each obstacle to the group
  flower0.add(flower1);
}
}

function spawnThorns() {
  
    if(frameCount % 150 === 0) {
    var thorn = createSprite(800,320);
    //obstacle.debug = true;
    thorn.velocityX = -(6 + 3*score/100);
    thorn.addImage(thorn1);
    thorn.scale=0.85;

  // thorn.depth=bunny4.depth;
  // bunny4.depth=bunny4.depth+1;

    thorn.lifetime = 500;
    //add each obstacle to the group
    thornGroup.add(thorn);
  }}
