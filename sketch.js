var backgroundimg;
var fighterplane,fighterplaneimg;
var START=0
var PLAY = 1;
var END = 2;
var gameState = START;
 var score=0;
 
function preload() { 
  backgroundimg=loadImage("background6.jpg");
  backgroundimg2=loadImage("backgound.jpg");
  backgroundimg3=loadImage("background5.jpeg");
  backgroundimg4=loadImage("background2.jpg");
  fighterplaneimg=loadImage("spaceship.png")
  asteroidsimg=loadImage("asteroid3.png")
  earthimg=loadImage("earth.png");
  bombimg=loadImage("bomb.png");
  shot=loadSound("blaster.mp3");
  startimg=loadImage("start.png");
  gameoverimg=loadImage("gameover.png");
  gameoversound=loadSound("game_over_words.mp3")
  restartimg=loadImage("restart.png");
  spaceSound=loadSound("space_sound.mp3");
}

function setup() {
createCanvas(displayWidth,displayHeight-200);
fighterplane=createSprite(displayWidth/2,displayHeight/2+100,50,50);
fighterplane.addImage("plane",fighterplaneimg);
fighterplane.scale=0.1

earth=createSprite(displayWidth/2-680,displayHeight/2-350,50,50);
earth.addImage("earth",earthimg);
earth.scale=0.1
start=createSprite(displayWidth/2,displayHeight/2-100,50,50);
start.addImage("START",startimg);
start.scale=0.1
restart=createSprite(displayWidth/2,displayHeight/2-250,50,50);
restart.addImage("RESTART",restartimg);
restart.scale=0.1
 
bg= new Group();
ag=new Group();
//fighterplane.debug=true;

}

function draw() {
  if(frameCount%5000<=1500){
    background(backgroundimg4);
  }
  else if( frameCount % 5000 > 1500 && frameCount % 5000 > 3200){
    background(backgroundimg);
  }
  else{
    background(backgroundimg3);
  }
  
  edges=createEdgeSprites();
 
  fighterplane.collide(edges)
  
 if(gameState===START){
   restart.visible=false;
   fighterplane.visible=false
   earth.visible=false
   if(mousePressedOver(start)){
     gameState=PLAY
   }
   background("yellow")
   textSize(30)
   strokeWeight(5)
   stroke("black")                                                                                  
   fill("white")
  text("In year 2099 there is a big explode in space",displayWidth/2-300,displayHeight/2-350)
  text("and beacuse of that small and big asteroids are travelling in space",displayWidth/2-300,displayHeight/2-320)
  text("and some big asteroids are coming towards our planet earth to destroy it",displayWidth/2-300,displayHeight/2-290)
  text("so lets save our planet with our powerfull fighter plane and destroy the asteroids",displayWidth/2-300,displayHeight/2-260)
  textSize(30)
   strokeWeight(5)
   stroke("white")
   fill("red")

  text("guide : -",displayWidth/2-700,displayHeight/2-50);
  text("move the fighter plane with mouse ",displayWidth/2-700,displayHeight/2-20)
  text("shoot the asteroids by pressing space bar",displayWidth/2-700,displayHeight/2+10);
  text("u will lose the game if any asteroids touches the fighter plane",displayWidth/2-700,displayHeight/2+40);
  //text("the game will be ended and you will win once the score is 40",displayWidth/2-700,displayHeight/2+70);
text("for each asteroids the score will be 2 ",displayWidth/2-700,displayHeight/2+70)
stroke("blue")
fill("yellow")
text("click on the start button to start the game",displayWidth/2-300,displayHeight/2-200)
 }
  if(gameState===PLAY){
    //spaceSound.loop();
   // spaceSound.play();
    restart.visible=false;
    fighterplane.x=mouseX
    earth.visible=true;
    fighterplane.visible=true
    textSize(30);
  fill("white")
  text("save me",displayWidth/2-740,displayHeight/2-250)
    start.visible=false;
      if(keyWentDown("SPACE")){
        Bombs();
      }
      if(bg.isTouching(ag)){
        shot.play();
        score=score+2
        
        bg.destroyEach();
        ag.destroyEach();
      }
      spwanAsteroids();
      if(fighterplane.isTouching(ag)){
        gameoversound.play();
        gameState=END
      }
    }
    if(gameState===END){
      spaceSound.stop();
      background(backgroundimg2)
     restart.visible=true;
      textSize(30);
      fill("white")
      text("OH NO!!!",displayWidth/2-740,displayHeight/2-240)
      image(gameoverimg,displayWidth/2-200,210)
      
      if(mousePressedOver(restart)) {
        reset();}
      ag.setVelocityYEach(0);
      bg.setVelocityYEach(0);
    }
    
  textSize(30);
  strokeWeight(5);
  stroke("red")
    fill("white")
    text("score : "+score,displayWidth/2,displayHeight/2-400)
  
 
  drawSprites();
}
function reset(){
  gameoverimg.visible=false;
restart.visible=false;
  gameState=PLAY;
  ag.destroyEach();
  bg.destroyEach();
score=0}
function spwanAsteroids(){
  if(frameCount%80 == 0){
  var asteroids=createSprite(displayWidth/2,displayHeight/2-400,20,20);
  asteroids.addImage("asteroid",asteroidsimg)
  asteroids.scale=0.07
  asteroids.velocityY=8;
  asteroids.x=Math.round(random(displayWidth-200,displayHeight/2-200));
 asteroids.lifetime=0.05;
 ag.add(asteroids);
  }
}
function Bombs(){
 
  var bomb=createSprite(200,400,20,20);
  bomb.addImage("bombs",bombimg)
  bomb.scale=0.07
  bomb.velocityY=-8;
 bomb.x=fighterplane.x
  bg.add(bomb);
}