function jump() {
  //start the player jump
  if (!player.jumping && player.spacePush) {
    player.jumping = true;
    animalObject.vy = -10;

  }

  //make sure there is no double jump
  if (player.sprite.y >= player.lowestHeight) {
    player.jumping = false;
    player.spacePush = false;
    player.sprite.y = player.lowestHeight;
  }
}

//build the inside of a house
function enterHouse() {
  door.x = 800;
  door.y = 700;

  house.addChild(houseBackground1);
  house.addChild(door);
  house.addChild(player.sprite);
  stage = house;
}

//builds the outside game map
function buildOutside() {

  //TODO create function that generates unlimited background
  // with different background objects, or use tiling software
  // whichever is the easier of the two

  //create the object that represents the player
  player = {
    sprite : animalObject,
    jumping : false,
    jumpHeight : 350,
    spacePush : false,
    lowestHeight : 700
  };

  //set the objects starting velocities
  player.sprite.vx = 0;
  player.sprite.vy = 0;

  //set the objects starting point
  player.sprite.x = 300;
  player.sprite.y = 700;

  //position the example house
  houseOutside1.x = 500;
  houseOutside1.y = 400;

  //add both the background and the animal to the stage
  map.addChild(whiteFloor);
  spawnAnimalControl();
  map.addChild(player.sprite);
  //map.addChild(houseOutside1);

  stage = map;
}

//variables for animal control
// TODO these will be likely to change, Just are placeholders
var aCTexture, aCObject;

function spawnAnimalControl() {
  aCTexture = TextureCache['images/ACPH.png'];
  aCObject = new Sprite(aCTexture);

  aCObject.x = 900;
  aCObject.y = 700;

  aCObject.vx = 0;
  aCObject.vy = 0;

  map.addChild(aCObject);
}

//function to pick the correct animal object for player
// TODO add functionality to this function. Different character sprites
function pickAnimal(animal) {

}