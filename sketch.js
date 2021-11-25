var sword, bomb, bombGroup, score , coins, CoinsGroup , randomCoins, SwordsMan;
var swordImage , CoinsImage , bombImage, SwordsManImage, gameOverImage;
var ground, invisibleGround;

function preload(){
 
    swordImage = loadImage("../images/sword.png");
    bombImage = loadImage("../images/Dynamite tnt.png");
    CoinsImage = loadImage("../images/Coins.png");
    gameOverImage = loadImage("../images/Game Over.png");
    SwordsManImage = loadImage("../images/SwordMan.png");
    ground = loadImage = loadImage("../images/Ground.png");
  
  }

  function setup(){

    createCanvas(600, 500);
    
    //creating sword
     sword = createSprite(40,200,20,20);
     sword.addImage(swordImage);
     sword.scale=0.7;
    
     SwordsMan = createSprite(73,264,50,20);
     SwordsMan.addImage(SwordsManImage);

     //set collider for sword
  sword.setCollider("rectangle",0,0,40,40);

  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;

  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;

  //jump when the space key is pressed
  if(keyDown("space")&& SwordsMan.y >= 161) {
    SwordsMan.velocityY = -12;
}

//add gravity
SwordsMan.velocityY = SwordsMan.velocityY + 0.8;

trex.setCollider("rectangle",0,0,trex.width,trex.height);
  trex.debug = false;

 // Score variables and Groups
 score=0;
 bombGroup=createGroup();
 CoinsGroup=createGroup();
     
}

function draw(){

    background("lightblue");
    //displaying score
    text("Score: "+ score, 500,50);
  
      if (ground.x < 0){
        ground.x = ground.width/2;
      }
      
      //jump when the space key is pressed
      if(keyDown("space")&& SwordsMan.y >= 161) {
          SwordsMan.velocityY = -12;
      }
      
      //add gravity
        SwordsMan.velocityY = SwordsMan.velocityY + 0.8
       
      //Call Coins and Bomb function
      Coins();
      Bomb();

    
    //Increase score if sword touching fruit
    if(fruitGroup.isTouching(sword)){
      fruitGroup.destroyEach();
      score=score+2;
    }
    
     // Go to end state if sword touching enemy
     if(bombGroup.isTouching(sword)){
      gameState=END;
    
      
      CoinsGroup.destroyEach();
      bombGroup.destroyEach();
      CoinsGroup.setVelocityXEach(0);
      bombGroup.setVelocityXEach(0);
      
      // Change the animation of sword to gameover and reset its position
      sword.addImage(gameOverImage);
      sword.x=200;
      sword.y=200;
     }

    }

    function Bomb(){
        if(World.frameCount%200===0){
          bomb=createSprite(400,200,20,20);
          bomb.addAnimation("moving", bombImage);
          bomb.y=Math.round(random(100,300));
          bomb.velocityX=-8;
          bomb.setLifetime=50;
          
          bombGroup.add(bomb);
        }
      }
      
      function Coins(){
        if(World.frameCount%80===0){
          coins=createSprite(400,200,20,20);
          coins.scale=0.2;
           //coins.debug=true;
           coins.addImage(CoinsImage);
         
          coins.y=Math.round(random(50,340));
         
          coins.velocityX=-7;
          coins.setLifetime=100;
          
          CoinsGroup.add(coins);
        }
      }

