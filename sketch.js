
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var ground;
var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var bananaGroup, obstacleGroup;
var score;
var time;
var jungle,jungleImage;
var bground,bgroundImage;

function preload(){
  
  
  monkey_running = loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  bgroundImage = loadImage("bgg.png");
  restartImage = loadImage("restart.png");
  gameOverImage = loadImage("gameover.png");
 
}



function setup() {
   background("white");
  
  createCanvas(1000,610);
   bground = createSprite(500,305);
   bground.addImage(bgroundImage);
   bground.scale = 1;
  
  monkey = createSprite(100,500,20,20);
  monkey.addAnimation("running", monkey_running);
  monkey.scale = 0.15;
  monkey.x = 50
  
  ground = createSprite(50,500,1000,5);
  ground.visible = false;
  var rand =  Math.round(random(1,100));
  
  
  obstacleGroup = new Group();
  bananaGroup = new Group();

  restart = createSprite(500,260);
  restart.addImage(restartImage);
  restart.scale = 0.5;

  gameOver = createSprite(500,400,50,50);
  gameOver.addImage(gameOverImage);
  gameOver.scale = 0.15;
  
  score = 0;
  time = 0;
}


function draw() {
   
  
  drawSprites();
   
   
  if( gameState === PLAY ){
    bground.addImage(bgroundImage); 
    bground.velocityX = -(3 + 3 * score/100);;
   if (bground.x < 190){
       bground.x = bground.width/2;
   }  
   restart.visible = false;
   gameOver.visible = false;
    
    if(keyDown("space") && monkey.y >= 240) {
      monkey.velocityY = -13;
 }
     monkey.velocityY = monkey.velocityY + 0.5;
     monkey.collide(ground);
    
     spawnObstacle();
     spawnbanana();
      
     for (var k = 0; k < bananaGroup.length; k++) {
        if (bananaGroup.contains(bananaGroup.get(k))) {
          if (monkey.isTouching(bananaGroup.get(k))) {
               bananaGroup.get(k).destroy(); 
                score=score+1;
                
      }
    }
  }
    
      
       switch(score){
    case 10: monkey.scale=0.12;
            break;
    case 20: monkey.scale=0.14;
            break;
    case 30: monkey.scale=0.16;
            break;
    case 40: monkey.scale=0.18;
            break;
    default: break;
  }
    if (obstacleGroup.isTouching(monkey))  {
     
    if (obstacleGroup.isTouching(monkey)&& monkey.scale === 0.18){
          monkey.scale = 0.16;
          
          
        }
    
     if (obstacleGroup.isTouching(monkey)&& monkey.scale ===0.16){
         monkey.scale = 0.14;
         
       }
      
    if (obstacleGroup.isTouching(monkey)&& monkey.scale ===0.14){
         monkey.scale = 0.12;
         
       }
    
    if (obstacleGroup.isTouching(monkey)&& monkey.scale ===0.12){
         monkey.scale = 0.1;
         
       }
       
    if (obstacleGroup.isTouching(monkey)  ){
         gameState = END;   
        }
       obstacleGroup.destroyEach();
       score = 0;
    }
     time = time + Math.round(getFrameRate()/60);
    //console.log(Math.round(getFrameRate()/60));
  
  }
   else if (gameState === END){
    restart.visible = true;
    gameOver.visible = true;
    monkey.visible = false;

    bananaGroup.setVelocityXEach(0);
    obstacleGroup.setVelocityXEach(0);
    monkey.velocityX = 0;
    
    bground.velocityX = 0;
    obstacleGroup.destroyEach();
    //monkey.destroy();
    bananaGroup.destroyEach();

    if(mousePressedOver(restart)) {
      reset();
    }
    
    /*stroke("red");
    strokeWeight(10)
    fill("orange");
    textSize(40);
    text("GAME OVER",300,250);*/
   }
     
     
       
    stroke("white");
    strokeWeight(5)
    fill("black");
    textSize(20);
    text("Score: "+ score, 670,50);

    stroke("white");
    strokeWeight(5)
    fill("black");
    textSize(20);
    text("Survival Time = " + time , 600,70);
     
   
    
  
  
  
  
  
}

function spawnObstacle(){
 
  
  if(frameCount%100===0){
    obstacle = createSprite(1000,500,40,10);
    obstacle.velocityX = -6;
    obstacle.addImage(obstacleImage);
    obstacle.scale = 0.5;
    obstacle.scale = 0.2;
    obstacleGroup.add(obstacle);
    obstacle.depth = monkey.depth;
    monkey.depth = monkey.depth + 1;
    //obstacle.depth = obstacle.depth+1;
  }
}
function spawnbanana(){
 
  
  if(frameCount%80===0){
    banana = createSprite(1000,115,40,10);
    banana.velocityX = -4;
    banana.addImage(bananaImage);
    banana.scale = 0.12;
    banana.y = Math.round(random(90,150));   
    bananaGroup.add(banana);
    
    
  }
}
function reset(){
  gameState = PLAY;
  monkey.x = 100
  monkey.y =500;
  monkey.visible = true;
  monkey.addAnimation("running", monkey_running);
  monkey.scale = 0.15;
  score = 0;
  time = 0;
 }


