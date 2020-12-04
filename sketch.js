//Create variables here
var dog, happyDog;
var database;
var foodS, foodStock, foodSt;

function preload()
{
  //load images here
  dogImg = loadImage("images/dogImg.png");
  happyDog = loadImage("images/dogImg1.png");
}

function setup() {
	createCanvas(500, 500);
  database = firebase.database();
  dog = createSprite(250, 250);
  dog.addImage(dogImg);
  dog.scale = 0.5;
  
  foodStock = database.ref("Food");
  foodStock.on("value", readStock);
}


function draw() {  
  background(46, 139, 87);
  

  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(happyDog);
  }

  drawSprites();

  textSize(20);
  fill("yellow");
  text("Use Up Arrow to feed dog", 130, 50);
  //add styles here
  textSize(20);
  text("Food Stock: "+ foodS, 170, 470);
}

function readStock(data){
  foodS = data.val();

}

function writeStock(x){

  if(x<=0){
    x=0;
  }
  else{
    x = x-1;
  }

  database.ref('/').update({
  Food : x
  })


}



